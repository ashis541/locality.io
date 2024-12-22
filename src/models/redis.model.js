import {Redis} from 'ioredis';
const client = new Redis('redis://redis-cluster-node-1:6379');

client.on('error', (err) => console.error('Redis error:', err));

async function updateUserLocation(userId, longitude, latitude) {
    await client.geoadd('user_locations', longitude, latitude, userId);
}

async function getNearbyUsers(longitude, latitude, radius = 500) {
    return await client.georadius('user_locations', longitude, latitude, radius, 'm', 'WITHCOORD', 'WITHDIST');
}

module.exports = { updateUserLocation, getNearbyUsers };
