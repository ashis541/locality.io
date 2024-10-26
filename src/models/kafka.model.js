import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'location-service',
    brokers: ['kafka-broker-1:9092', 'kafka-broker-2:9092'],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'location-group' });

async function sendLocationUpdate(userId, location) {
    await producer.connect();
    await producer.send({
        topic: 'user_location_updates',
        messages: [{ key: userId, value: JSON.stringify(location) }],
    });
    await producer.disconnect();
}

async function consumeLocationUpdates(callback) {
    await consumer.connect();
    await consumer.subscribe({ topic: 'user_location_updates', fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ message }) => {
            const locationData = JSON.parse(message.value.toString());
            callback(locationData);
        },
    });
}

module.exports = { sendLocationUpdate, consumeLocationUpdates };
