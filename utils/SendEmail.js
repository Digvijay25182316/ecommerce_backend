import { createTransport } from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  var transporter = createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "10cd1b782a1bb3",
      pass: "f2884c542b153b",
    },
  });
  await transporter.sendMail({
    to,
    subject,
    text,
    from: "digvijays.edake2002@gmail.com",
  });
};
