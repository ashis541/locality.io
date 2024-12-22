import { getNearbyUsers } from '../models/redis.model.js';

exports.handleConnection = (socket) => {
    console.log('User connected:', socket.id);

    socket.on('locationUpdate', async (data) => {
        const { userId, latitude, longitude } = data;
        
        try {
            // Get and broadcast nearby users
            const nearbyUsers = await getNearbyUsers(longitude, latitude);
            socket.emit('nearbyUsers', { nearbyUsers });
        } catch (error) {
            console.error('Error getting nearby users:', error);
            socket.emit('error', { message: 'Error getting nearby users' });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
};
