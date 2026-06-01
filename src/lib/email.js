import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendResetPasswordEmail({ email, token }) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl}/reset-password?token=${encodeURIComponent(token)}`;

  await transport.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Reset your MTSA password",
    html: `
      <div style="font-family: Arial, sans-serif; color: #142d46;">
        <h2>Password reset request</h2>
        <p>You requested a password reset for your MTSA account.</p>
        <p>
          <a href="${resetUrl}" style="display:inline-block;padding:12px 18px;background:#133b66;color:#ffffff;border-radius:8px;text-decoration:none;">Reset password</a>
        </p>
        <p>If you did not request this, no further action is required.</p>
      </div>
    `,
  });
}
