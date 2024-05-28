const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: "./../config.env" });

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.sendEmail = async (req, res) => {
  const { toEmail, fromEmail, subject, message } = req.body;

  var mailOptions = {
    from: fromEmail,
    to: toEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
  });
};
