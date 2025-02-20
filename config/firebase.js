const dotenv = require("dotenv");
const fs = require("fs");
const admin = require("firebase-admin");

dotenv.config();

const fireBaseAdminSdkKeyPath = process.env.FIREBASE_ADMIN_SDK_KEY_PATH;

const serviceAccount = JSON.parse(
  fs.readFileSync(fireBaseAdminSdkKeyPath, "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
