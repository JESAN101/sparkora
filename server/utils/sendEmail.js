import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, otp }) => {
  const html = `
  <div style="max-width:600px;margin:auto;padding:40px;background:#fbf7f2;font-family:Arial,sans-serif;border-radius:12px;border:1px solid #e6d9cd">

      <h1 style="color:#8f5a44;text-align:center;margin-bottom:10px;">
        Sparkora
      </h1>

      <p style="text-align:center;font-size:18px;color:#251d20;">
        Verify your email address
      </p>

      <p style="text-align:center;color:#6f6058;">
        Use the verification code below to complete your registration.
      </p>

      <div
      style="
      margin:35px auto;
      width:220px;
      text-align:center;
      background:#ffffff;
      border:2px dashed #b3735a;
      padding:18px;
      font-size:34px;
      letter-spacing:8px;
      font-weight:bold;
      color:#6d1b34;
      border-radius:12px;
      ">
        ${otp}
      </div>

      <p style="text-align:center;color:#6f6058;">
        This OTP will expire in <strong>5 minutes</strong>.
      </p>

      <hr style="margin:35px 0;border:none;border-top:1px solid #e6d9cd"/>

      <p style="text-align:center;font-size:13px;color:#999;">
        If you didn't create a Sparkora account, you can safely ignore this email.
      </p>

  </div>
  `;

  await transporter.sendMail({
    from: `"Sparkora" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;