// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const sendWhatsapp = async (code, to) => {
  client.messages
    .create({
      from: "whatsapp:+14155238886",
      body: `Hello there! Thanks for registring on maktabati, your code verification is ${code} enjoy!`,
      to: `whatsapp:${to}`,
    })
    .then((message) => console.log(message))
    .catch((err) => console.log(err));
};
exports.sendWhatsapp = sendWhatsapp;
