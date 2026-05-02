import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // IMPORTANT for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
   tls: {
    rejectUnauthorized: false,
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP READY ✔");
  }
});
export default transporter;

// import axios from "axios";

// await axios.post(
//   "https://api.brevo.com/v3/smtp/email",
//   {
//     sender: { email: process.env.SMTP_USER },
//     to: [{ email }],
//     subject: "Welcome",
//     htmlContent: "<h1>Account created</h1>",
//   },
//   {
//     headers: {
//       "api-key": process.env.BREVO_API_KEY,
//       "Content-Type": "application/json",
//     },
//   }
// );