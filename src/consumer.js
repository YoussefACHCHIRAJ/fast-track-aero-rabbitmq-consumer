const { connectRabbitMQ } = require("../config/rabbitmq.js");
const sendPushNotification = require("./notification.js");
const dotenv = require("dotenv");

dotenv.config();

const queueName = process.env.QUEUE_NAME;

async function startConsumer() {
  try {
    console.log("🚀 Connecting to RabbitMQ...");
    const { connection, channel } = await connectRabbitMQ();

    console.log(`📥 Listening for messages on queue: ${queueName}`);

    channel.consume(queueName, async (msg) => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString());
        console.log("📢 Received Message:", message);

        try {
          await sendPushNotification(message);
          channel.ack(msg);
        } catch (error) {
          console.error("❌ Failed to send push notification:", error);
          channel.nack(msg, false, true);
        }
      }
    });
  } catch (error) {
    console.error("❌ RabbitMQ Consumer Error:", error);
    process.exit(1);
  }
}

// Start Consumer
startConsumer();
