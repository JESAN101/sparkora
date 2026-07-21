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

/* ===========================================================
   RESPONSIVE EMAIL SHELL
   All three emails render through this so the responsive
   behaviour (fluid table + media query breakpoints) only has
   to be written once. Table-based layout is used instead of
   plain <div>s because that's what actually survives Outlook /
   Gmail app / Apple Mail's inconsistent CSS support — divs with
   fixed widths are what was making the previous version rigid
   on small screens.
=========================================================== */

const wrapEmail = ({ preheader = "", content }) => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light" />
  <title>Sparkora</title>
  <style>
    body, table, td { margin: 0; padding: 0; }
    table { border-collapse: collapse !important; }
    img { border: 0; line-height: 100%; outline: none; text-decoration: none; }
    body { height: 100% !important; width: 100% !important; background: #f3ede6; }
    a { text-decoration: none; }

    /* Mobile breakpoint — anything under 600px (basically every phone) */
    @media screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
        border-radius: 0 !important;
      }
      .email-padding {
        padding: 28px 22px !important;
      }
      .heading {
        font-size: 24px !important;
      }
      .otp-box {
        width: auto !important;
        display: block !important;
        font-size: 28px !important;
        letter-spacing: 6px !important;
        padding: 16px !important;
      }
      .cta-table {
        width: 100% !important;
      }
      .cta-button {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
        text-align: center !important;
      }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f3ede6;">
  <!-- Preheader: the short preview text shown next to the subject line in the inbox -->
  <span style="display:none;font-size:1px;color:#f3ede6;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${preheader}
  </span>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3ede6;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table
          role="presentation"
          class="email-container"
          width="600"
          cellpadding="0"
          cellspacing="0"
          style="width:600px;max-width:600px;background:#fbf7f2;border-radius:12px;border:1px solid #e6d9cd;"
        >
          <tr>
            <td class="email-padding" style="padding:40px;font-family:Arial,Helvetica,sans-serif;">
              ${content}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

/* ===========================================================
   OTP EMAIL
=========================================================== */

export const sendEmail = async ({ to, subject, otp }) => {
  const content = `
    <h1 class="heading" style="color:#8f5a44;text-align:center;margin:0 0 10px;font-size:28px;">
      Sparkora
    </h1>

    <p style="text-align:center;font-size:18px;color:#251d20;margin:0 0 8px;">
      Verify your email address
    </p>

    <p style="text-align:center;color:#6f6058;margin:0 0 30px;font-size:15px;">
      Use the verification code below to complete your registration.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td
                class="otp-box"
                style="
                  background:#ffffff;
                  border:2px dashed #b3735a;
                  padding:18px 24px;
                  font-size:34px;
                  letter-spacing:8px;
                  font-weight:bold;
                  color:#6d1b34;
                  border-radius:12px;
                  text-align:center;
                "
              >
                ${otp}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="text-align:center;color:#6f6058;margin:30px 0 0;font-size:15px;">
      This OTP will expire in <strong>5 minutes</strong>.
    </p>

    <hr style="margin:35px 0;border:none;border-top:1px solid #e6d9cd" />

    <p style="text-align:center;font-size:13px;color:#999;margin:0;">
      If you didn't create a Sparkora account, you can safely ignore this email.
    </p>
  `;

  const html = wrapEmail({
    preheader: `Your Sparkora verification code is ${otp}`,
    content,
  });

  const info = await transporter.sendMail({
    from: `"Sparkora" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });

  console.log("OTP Email sent:", info.response);
};

/* ===========================================================
   SELLER APPROVAL EMAIL
=========================================================== */

export const sendSellerApprovalEmail = async ({ to, name, businessName }) => {
  const content = `
    <h1 class="heading" style="color:#16a34a;text-align:center;margin:0 0 8px;font-size:28px;">
      🎉 Congratulations!
    </h1>

    <h2 style="text-align:center;color:#251d20;margin:0 0 24px;font-size:20px;">
      Welcome to Sparkora Seller Program
    </h2>

    <p style="font-size:16px;color:#555;margin:0 0 14px;">
      Hi <strong>${name}</strong>,
    </p>

    <p style="font-size:16px;color:#555;line-height:28px;margin:0 0 24px;">
      Your seller application for <strong>${businessName}</strong> has been
      <span style="color:#16a34a;font-weight:bold;">APPROVED</span>.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 30px;">
      <tr>
        <td style="background:#ffffff;border-left:5px solid #16a34a;padding:20px;border-radius:8px;">
          <h3 style="margin:0 0 12px;font-size:16px;color:#251d20;">
            Your seller account is now active.
          </h3>
          <table role="presentation" cellpadding="0" cellspacing="0" style="color:#555;font-size:15px;">
            <tr><td style="padding:4px 0;">✅ Seller Dashboard Access</td></tr>
            <tr><td style="padding:4px 0;">✅ Upload Products</td></tr>
            <tr><td style="padding:4px 0;">✅ Manage Orders</td></tr>
            <tr><td style="padding:4px 0;">✅ Track Sales</td></tr>
            <tr><td style="padding:4px 0;">✅ Grow Your Business</td></tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="font-size:16px;color:#555;margin:0 0 30px;">
      Login to Sparkora and start selling today.
    </p>

    <table role="presentation" class="cta-table" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="border-radius:8px;background:#8f5a44;">
                <a
                  href="http://localhost:5173/seller"
                  class="cta-button"
                  style="
                    display:inline-block;
                    padding:14px 30px;
                    color:#ffffff;
                    font-weight:bold;
                    font-size:15px;
                    font-family:Arial,Helvetica,sans-serif;
                  "
                >
                  Open Seller Dashboard
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <hr style="margin:40px 0;border:none;border-top:1px solid #e6d9cd" />

    <p style="text-align:center;color:#888;font-size:13px;margin:0;">
      Thank you for choosing Sparkora.
    </p>
  `;

  const html = wrapEmail({
    preheader: `Your seller application for ${businessName} was approved`,
    content,
  });

  const info = await transporter.sendMail({
    from: `"Sparkora" <${process.env.MAIL_USER}>`,
    to,
    subject: "🎉 Your Seller Application Has Been Approved",
    html,
  });

  console.log("Seller Approval Email sent:", info.response);
};

/* ===========================================================
   SELLER REJECTION EMAIL
=========================================================== */

export const sendSellerRejectionEmail = async ({ to, name, reason }) => {
  const content = `
    <h1 class="heading" style="color:#dc2626;text-align:center;margin:0 0 24px;font-size:26px;">
      Seller Application Update
    </h1>

    <p style="font-size:16px;color:#555;margin:0 0 14px;">
      Hi <strong>${name}</strong>,
    </p>

    <p style="font-size:16px;color:#555;line-height:28px;margin:0 0 24px;">
      Thank you for applying to become a Sparkora Seller. After reviewing
      your application, we are unable to approve it at this time.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="background:#ffffff;border-left:5px solid #dc2626;padding:20px;border-radius:8px;">
          <h3 style="margin:0 0 10px;font-size:16px;color:#dc2626;">
            Rejection Reason
          </h3>
          <p style="color:#555;margin:0;font-size:15px;line-height:24px;">
            ${reason}
          </p>
        </td>
      </tr>
    </table>

    <p style="font-size:16px;color:#555;margin:0;">
      You can review the feedback, update your information, and apply again
      whenever you're ready.
    </p>

    <hr style="margin:40px 0;border:none;border-top:1px solid #e6d9cd" />

    <p style="text-align:center;color:#888;font-size:13px;margin:0;">
      Thank you for choosing Sparkora.
    </p>
  `;

  const html = wrapEmail({
    preheader: "An update on your Sparkora seller application",
    content,
  });

  const info = await transporter.sendMail({
    from: `"Sparkora" <${process.env.MAIL_USER}>`,
    to,
    subject: "Seller Application Status",
    html,
  });

  console.log("Seller Rejection Email sent:", info.response);
};

export default sendEmail;