const dotenv = require("dotenv");
const amqp = require("amqplib");

dotenv.config();

const rabbitMqConnectUrl = process.env.RABBIT_MQ_CONNECT_URL;
const queueName = process.env.QUEUE_NAME;

async function connectRabbitMQ() {
  const connection = await amqp.connect(rabbitMqConnectUrl);
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName);
  return { connection, channel };
}

module.exports = {
  connectRabbitMQ,
};
