const dotenv = require("dotenv");
const fs = require("fs");
const admin = require("firebase-admin");

dotenv.config();

const fireBaseAdminSdkKeyBase64 = process.env.FIREBASE_ADMIN_SDK_KEY_BASE64;

const firebaseCredentials = JSON.parse(
  Buffer.from(fireBaseAdminSdkKeyBase64, "base64").toString("utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
});

module.exports = admin;
