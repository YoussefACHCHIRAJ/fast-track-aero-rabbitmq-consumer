const admin = require("../config/firebase");

function toUnixTimestamp(ttlInSeconds) {
  return Math.floor(Date.now() / 1000) + ttlInSeconds;
}

async function sendPushNotification(payload) {
  if (!payload.target || !payload.notification) {
    throw new Error("Invalid notification structure");
  }

  const message = {
    notification: {
      title: payload.notification.title,
      body: payload.notification.body,
    },
    topic: payload.target.value,
  };

  if (payload.notification.ttl) {
    androidTtl = payload.notification.ttl;
    iosTtl = toUnixTimestamp(payload.notification.ttl).toString();

    message.android.ttl = androidTtl;
    message.apns.headers["apns-expiration"] = iosTtl;
  }
  await admin.messaging().send(message);
  console.log("✅ Push notification sent successfully!");
}

module.exports = sendPushNotification;
