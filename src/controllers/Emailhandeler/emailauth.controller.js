import { google } from 'googleapis';
import { Organization } from '../../models/organization.model.js';
import { ApiError } from '../../utils/apiError.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

export const initiateEmailConnection = asyncHandler(async (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/userinfo.email'
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });

  return res.status(200).json(new ApiResponse(200, url, "connect your mail"));
});

export const completeEmailConnection = asyncHandler(async (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    throw new ApiError(400, 'Authorization code required');
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();

    await Organization.findByIdAndUpdate(req.user._id, {
      emailConnection: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        connectedEmail: data.email,
        tokenExpiry: tokens.expiry_date
      }
    });

    return res.status(200)
  .json(new ApiResponse(200, data.email, "email connect successfully"));
  } catch (error) {
    throw new ApiError(500, `Email connection failed: ${error.message}`);
  }
});