const nodemailer = require("nodemailer");

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_UKRNET,
    pass: process.env.UKRNET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "h2ometer@ukr.net" };
  console.log(email);
  await transport
    .sendMail(email)
    .then(() => console.log("Email send success"))
    .catch((error) => console.log(error.message));
};

module.exports = sendEmail;
