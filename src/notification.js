const admin = require("../config/firebase");

async function sendPushNotification(notification) {
  if (!notification.target || !notification.notification) {
    throw new Error("Invalid notification structure");
  }

  const message = {
    notification: {
      title: notification.notification.title,
      body: notification.notification.body,
    },
    topic: notification.target.value,
  };

  console.log("🚀 Sending push notification:", message);

  await admin.messaging().send(message);
  console.log("✅ Push notification sent successfully!");
}

module.exports = sendPushNotification;
