import { sendLocationUpdate } from '../models/kafka.model.js';
import { updateUserLocation, getNearbyUsers } from '../models/redis.model.js';

exports.updateLocation = async (req, res) => {
    const { userId, latitude, longitude } = req.body;

    try {
        // Update location in Redis
        await updateUserLocation(userId, longitude, latitude);

        // Send update to Kafka for processing
        await sendLocationUpdate(userId, { latitude, longitude });

        res.status(200).json({ message: 'Location updated successfully' });
    } catch (error) {
        console.error('Error updating location:', error);
        res.status(500).json({ message: 'Error updating location' });
    }
};

exports.getNearbyUsers = async (req, res) => {
    const { longitude, latitude } = req.query;

    try {
        const users = await getNearbyUsers(longitude, latitude);
        res.status(200).json({ nearbyUsers: users });
    } catch (error) {
        console.error('Error fetching nearby users:', error);
        res.status(500).json({ message: 'Error fetching nearby users' });
    }
};
