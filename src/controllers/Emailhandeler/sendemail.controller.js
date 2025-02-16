import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { Organization } from '../../models/organization.model.js';
import { Branch } from '../../models/branches.model.js';
import { ApiError } from '../../utils/apiError.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { createEmailTemplate } from '../../utils/emailtemplate.js';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

export const sendOrganizationEmail = asyncHandler(async (req, res) => {
  const { 
    subject, 
    body, 
    sendToAll = false, 
    specificRecipients = [] 
  } = req.body;

  const organization = await Organization.findById(req.user._id)
    .populate('branches');

  if (!organization.emailConnection) {
    throw new ApiError(401, 'Email not connected');
  }

  oauth2Client.setCredentials({
    access_token: organization.emailConnection.accessToken,
    refresh_token: organization.emailConnection.refreshToken
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: organization.emailConnection.connectedEmail,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: organization.emailConnection.refreshToken,
      accessToken: organization.emailConnection.accessToken
    }
  });

  const recipients = new Set(specificRecipients);

  if (sendToAll) {
    const branches = await Branch.find({ organization: organization._id })
      .populate('employees');

    branches.forEach(branch => {
      branch.employees.forEach(emp => {
        if (emp.email) recipients.add(emp.email);
      });
    });
  }

  const emailTemplate = createEmailTemplate({
    subject,
    body,
    sender: req.user.fullName,
    organizationName: organization.fullName
  });

  const mailOptions = {
    from: organization.emailConnection.connectedEmail,
    to: [...recipients].join(','),
    subject,
    html: emailTemplate
  };

  await transporter.sendMail(mailOptions);

  return res.status(200).json(new ApiResponse(200, recipients.size, "User registered Successfully"));
});