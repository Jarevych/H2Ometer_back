const nodemailer = require("nodemailer");
require("dotenv").config();

const { MAILGUN_SMTP_PASSWORD, MAILGUN_SMTP_USER } = process.env;

const nodemailerConfig = {
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: MAILGUN_SMTP_USER,
    pass: MAILGUN_SMTP_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "alexandr150983@meta.ua" };
  console.log(email);
  await transport
    .sendMail(email)
    .then(() => console.log("Email send success"))
    .catch((error) => console.log(error.message));
};

module.exports = sendEmail;
