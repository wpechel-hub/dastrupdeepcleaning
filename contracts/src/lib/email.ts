import nodemailer from "nodemailer";

function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendContractEmail(opts: {
  to: string;
  clientName: string;
  signUrl: string;
  docNumber: string;
}) {
  const transport = getTransport();
  if (!transport) {
    console.warn(
      "[email] GMAIL_USER / GMAIL_APP_PASSWORD not configured — skipping send. Share this link manually:",
      opts.signUrl
    );
    return { sent: false as const };
  }

  const from = process.env.GMAIL_USER!;

  await transport.sendMail({
    from: `"Dastrup Deep Cleaning" <${from}>`,
    to: opts.to,
    subject: `Your Cleaning Service Agreement (${opts.docNumber}) — Dastrup Deep Cleaning`,
    text: `Hi ${opts.clientName},\n\nPlease review and sign your cleaning service agreement using the secure link below:\n\n${opts.signUrl}\n\nThank you for choosing Dastrup Deep Cleaning!\n\n— Dastrup Deep Cleaning\n(801) 207-9056 · dastrupdeepcleaning@gmail.com`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; color:#1b1f27;">
        <h2 style="color:#1B4B7A; margin-bottom:4px;">Dastrup Deep Cleaning</h2>
        <p style="color:#666; font-style:italic; margin-top:0;">Utah's Trusted Cleaning Experts</p>
        <p>Hi ${opts.clientName},</p>
        <p>Please review and sign your cleaning service agreement using the secure link below:</p>
        <p style="text-align:center; margin: 28px 0;">
          <a href="${opts.signUrl}" style="background:#1B4B7A; color:#fff; padding:12px 22px; border-radius:8px; text-decoration:none; font-weight:600;">
            Review &amp; Sign Agreement
          </a>
        </p>
        <p style="font-size:13px; color:#666;">If the button doesn't work, copy and paste this link into your browser:<br>${opts.signUrl}</p>
        <p>Thank you for choosing Dastrup Deep Cleaning!</p>
        <p style="color:#666; font-size:13px; margin-top:32px; border-top:1px solid #e2e6ec; padding-top:12px;">
          Dastrup Deep Cleaning · (801) 207-9056 · dastrupdeepcleaning@gmail.com
        </p>
      </div>
    `,
  });

  return { sent: true as const };
}

export async function sendSignedCopyEmail(opts: {
  to: string;
  recipientLabel: string; // e.g. the client's name, or "Dastrup Deep Cleaning"
  clientName: string;
  docNumber: string;
  signerName: string;
  signedAt: Date;
  viewUrl: string;
}) {
  const transport = getTransport();
  if (!transport) {
    console.warn("[email] GMAIL_USER / GMAIL_APP_PASSWORD not configured — skipping signed-copy send to", opts.to);
    return { sent: false as const };
  }

  const from = process.env.GMAIL_USER!;
  const signedDate = opts.signedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  await transport.sendMail({
    from: `"Dastrup Deep Cleaning" <${from}>`,
    to: opts.to,
    subject: `Signed: Service Agreement ${opts.docNumber} — ${opts.clientName}`,
    text: `Hi ${opts.recipientLabel},\n\nThe Service Agreement ${opts.docNumber} for ${opts.clientName} was signed by ${opts.signerName} on ${signedDate}.\n\nYou can view the signed agreement here:\n${opts.viewUrl}\n\n— Dastrup Deep Cleaning\n(801) 207-9056 · dastrupdeepcleaning@gmail.com`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; color:#1b1f27;">
        <h2 style="color:#1B4B7A; margin-bottom:4px;">Dastrup Deep Cleaning</h2>
        <p style="color:#666; font-style:italic; margin-top:0;">Utah's Trusted Cleaning Experts</p>
        <p>Hi ${opts.recipientLabel},</p>
        <p>✅ The Service Agreement <strong>${opts.docNumber}</strong> for <strong>${opts.clientName}</strong> has been signed by <strong>${opts.signerName}</strong> on ${signedDate}.</p>
        <p style="text-align:center; margin: 28px 0;">
          <a href="${opts.viewUrl}" style="background:#1B4B7A; color:#fff; padding:12px 22px; border-radius:8px; text-decoration:none; font-weight:600;">
            View Signed Agreement
          </a>
        </p>
        <p style="font-size:13px; color:#666;">If the button doesn't work, copy and paste this link into your browser:<br>${opts.viewUrl}</p>
        <p style="color:#666; font-size:13px; margin-top:32px; border-top:1px solid #e2e6ec; padding-top:12px;">
          Dastrup Deep Cleaning · 5975 Monaco Cir, Murray UT 84121 · (801) 207-9056 · dastrupdeepcleaning@gmail.com
        </p>
      </div>
    `,
  });

  return { sent: true as const };
}
