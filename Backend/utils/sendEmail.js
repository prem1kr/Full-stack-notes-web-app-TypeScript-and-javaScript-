import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: `"MyApp" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  });
};
