import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONDITION_LABELS: Record<string, string> = {
  like_new: "Like New",
  excellent: "Excellent",
  good: "Good",
  poor: "Poor",
};

const BATTERY_LABELS: Record<string, string> = {
  "90_plus": "90%+ Health",
  "80_89": "80–89% Health",
  "under_80": "Under 80% Health",
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, contact, brand, model, storage, condition, batteryHealth, estimatedLow, estimatedHigh, photos } = body;
  const photoAttachments: Array<{ filename: string; content: string }> = Array.isArray(photos) ? photos.slice(0, 5) : [];

  if (!name || !contact || !brand || !model || !storage || !condition) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const fromEmail = process.env.FROM_EMAIL ?? "onboarding@resend.dev";
  const ownerEmail = process.env.CONTACT_EMAIL;

  if (!ownerEmail) {
    console.error("[sell-inquiry] CONTACT_EMAIL env var is not set.");
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[sell-inquiry] RESEND_API_KEY env var is not set.");
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  const conditionLabel = CONDITION_LABELS[condition] ?? condition;
  const batteryLabel = batteryHealth ? (BATTERY_LABELS[batteryHealth] ?? batteryHealth) : null;
  const isEmail = contact.includes("@");

  const deviceRows = [
    ["Brand", brand],
    ["Model", model],
    ["Storage", storage],
    ["Condition", conditionLabel],
    ...(batteryLabel ? [["Battery", batteryLabel]] : []),
    ["Estimate", `$${estimatedLow} – $${estimatedHigh} CAD`],
  ];

  const ownerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <style>a { color: inherit !important; text-decoration: none !important; } a:visited { color: inherit !important; }</style>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:48px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <tr><td style="padding-bottom:20px;" align="center">
          <p style="margin:0;font-size:13px;font-weight:700;color:#94a3b8;letter-spacing:0.06em;text-transform:uppercase;">HatPhones &middot; Sell Inquiry</p>
        </td></tr>

        <tr><td style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#059669;padding:28px 36px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <p style="margin:0 0 2px;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.65);">New sell inquiry</p>
                      <p style="margin:0;font-size:20px;font-weight:800;color:#ffffff;">${brand} ${model}</p>
                    </td>
                    <td align="right" valign="middle">
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="background:rgba(255,255,255,0.18);border-radius:20px;padding:5px 14px;">
                            <p style="margin:0;font-size:12px;font-weight:700;color:#ffffff;">&#9679;&nbsp; Action needed</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:28px 36px 0;">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width:44px;height:44px;background:#ecfdf5;border-radius:50%;text-align:center;vertical-align:middle;">
                            <p style="margin:0;font-size:18px;font-weight:800;color:#059669;line-height:44px;">${name.charAt(0).toUpperCase()}</p>
                          </td>
                          <td style="padding-left:14px;vertical-align:middle;">
                            <p style="margin:0;font-size:17px;font-weight:800;color:#0f172a;">${name}</p>
                            <p style="margin:3px 0 0;font-size:13px;color:#64748b;">${contact}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:20px 36px 0;"><div style="height:1px;background:#f1f5f9;"></div></td></tr>
          </table>

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:24px 36px;">
              <p style="margin:0 0 18px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">Device Details</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${deviceRows.map(([label, value], i) => `
                <tr>
                  <td style="padding:10px 16px;background:#f8fafc;${i === 0 ? "border-radius:10px 10px 0 0;" : ""}${i === deviceRows.length - 1 ? "border-radius:0 0 0 10px;" : "border-bottom:1px solid #f1f5f9;"}width:38%;vertical-align:middle;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;">${label}</p>
                  </td>
                  <td style="padding:10px 16px;background:#f8fafc;${i === 0 ? "border-radius:10px 10px 0 0;" : ""}${i === deviceRows.length - 1 ? "border-radius:0 0 10px 0;font-weight:800;color:#059669;" : "border-bottom:1px solid #f1f5f9;"}vertical-align:middle;">
                    <p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;">${value}</p>
                  </td>
                </tr>`).join("")}
              </table>
            </td></tr>
          </table>

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:0 36px 36px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#059669;border-radius:12px;padding:0;">
                    <a href="${isEmail ? `mailto:${contact}` : `tel:${contact.replace(/\s/g, "")}`}" style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:700;color:#ffffff !important;text-decoration:none !important;">
                      <span style="color:#ffffff;">${isEmail ? `Reply to ${name.split(" ")[0]}` : `Call ${name.split(" ")[0]}`} &rarr;</span>
                    </a>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>

        </td></tr>

        <tr><td style="padding:24px 0;" align="center">
          <p style="margin:0;font-size:12px;color:#94a3b8;">HatPhones &middot; hatphones.ca</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `;

  try {
    await resend.emails.send({
      from: `HatPhones <${fromEmail}>`,
      to: ownerEmail,
      ...(isEmail ? { replyTo: contact } : {}),
      subject: `Sell Inquiry — ${name} · ${brand} ${model} · $${estimatedLow}–$${estimatedHigh}`,
      html: ownerHtml,
      ...(photoAttachments.length > 0 ? {
        attachments: photoAttachments.map((p) => ({
          filename: p.filename,
          content: Buffer.from(p.content, "base64"),
        })),
      } : {}),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[sell-inquiry]", err);
    return NextResponse.json({ error: "Failed to send inquiry." }, { status: 500 });
  }
}
