const admin = require("../config/firebase");

async function sendPushNotification(payload) {
  if (!payload.target || !payload.notification) {
    throw new Error("Invalid notification structure");
  }

  const message = {
    notification: {
      title: payload.notification.title,
      body: payload.notification.body,
    },
    data: {
      title: payload.notification.title,
      body: payload.notification.body,
    },
    topic: payload.target.value,
  };

  await admin.messaging().send(message);
  console.log("✅ Push notification sent successfully!");
}

module.exports = sendPushNotification;
