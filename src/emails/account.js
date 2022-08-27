const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "khachvanis@gmail.com",
    subject: "thanks for joining in",
    text: `Welcome to the app, ${name}. Let me know how you get along with an app`,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "khachvanis@gmail.com",
    subject: "too bad you canceled it biach",
    text: `shite ${name} mate! what's wrong with ya?`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
