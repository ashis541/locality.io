import { Organization } from '../models/organization.model.js';
import { ApiError } from '../utils/apiError.js';

export const requireEmailConnection = async (req, res, next) => {
  try {
    const organization = await Organization.findById(req.user._id);

    if (!organization.emailConnection) {
      return res.status(403).json({
        success: false,
        message: 'Email connection required',
        action: 'Connect your organization email'
      });
    }

    const currentTime = Date.now();
    if (organization.emailConnection.tokenExpiry < currentTime) {
      return res.status(401).json({
        success: false,
        message: 'Email connection expired',
        action: 'Reconnect your email'
      });
    }

    next();
  } catch (error) {
    next(new ApiError(500, 'Email connection verification failed'));
  }
};