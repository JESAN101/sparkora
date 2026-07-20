import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false, // TLS on port 587
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Verify SMTP connection when the server starts
transporter.verify((error) => {
  if (error) {
    console.error("❌ Mail server connection failed:", error.message);
  } else {
    console.log("✅ Mail server is ready to send messages");
  }
});

export const sendOTPEmail = async (email, firstName, otp) => {
  await transporter.sendMail({
    from: `"Sparkora Jewelry" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Verify Your Sparkora Account",

    html: `
      <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;background:#ffffff;border:1px solid #eeeeee;border-radius:12px;padding:40px">

        <h1 style="color:#8f5a44;text-align:center;margin-bottom:8px">
          Sparkora
        </h1>

        <h2 style="text-align:center;color:#333333;margin-bottom:30px">
          Email Verification
        </h2>

        <p>Hello <strong>${firstName}</strong>,</p>

        <p>
          Thank you for creating your Sparkora account.
          Please use the verification code below to verify your email address.
        </p>

        <div
          style="
            font-size:34px;
            font-weight:bold;
            letter-spacing:8px;
            text-align:center;
            margin:35px 0;
            color:#b3735a;
          "
        >
          ${otp}
        </div>

        <p>
          This verification code is valid for
          <strong>${process.env.OTP_EXPIRE_MINUTES} minutes</strong>.
        </p>

        <p>
          If you did not create this account, you can safely ignore this email.
        </p>

        <hr style="margin:30px 0;border:none;border-top:1px solid #eeeeee;">

        <p style="font-size:13px;color:#777777;text-align:center">
          © ${new Date().getFullYear()} Sparkora Jewelry. All rights reserved.
        </p>

      </div>
    `,
  });
};