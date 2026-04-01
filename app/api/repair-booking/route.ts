import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, contact, device, issue, preferredDate, preferredTime, notes } = body;

  if (!name || !contact || !device || !issue || !preferredDate || !preferredTime) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const fromEmail = process.env.FROM_EMAIL ?? "onboarding@resend.dev";
  const ownerEmail = process.env.CONTACT_EMAIL;

  if (!ownerEmail) {
    console.error("[repair-booking] CONTACT_EMAIL env var is not set.");
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[repair-booking] RESEND_API_KEY env var is not set.");
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  // ── Owner notification email ──
  const ownerEmail_html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <style>
    a { color: inherit !important; text-decoration: none !important; }
    a:visited { color: inherit !important; }
  </style>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:48px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- Brand bar -->
        <tr><td style="padding-bottom:20px;" align="center">
          <p style="margin:0;font-size:13px;font-weight:700;color:#94a3b8;letter-spacing:0.06em;text-transform:uppercase;">HatPhones &middot; Repair System</p>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

          <!-- Top accent strip -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#4f46e5;padding:28px 36px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <p style="margin:0 0 2px;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.6);">Incoming request</p>
                      <p style="margin:0;font-size:20px;font-weight:800;color:#ffffff;">New Repair Booking</p>
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

          <!-- Customer info -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:28px 36px 0;">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width:44px;height:44px;background:#eef2ff;border-radius:50%;text-align:center;vertical-align:middle;">
                            <p style="margin:0;font-size:18px;font-weight:800;color:#4f46e5;line-height:44px;">${name.charAt(0).toUpperCase()}</p>
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

          <!-- Divider -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:20px 36px 0;">
              <div style="height:1px;background:#f1f5f9;"></div>
            </td></tr>
          </table>

          <!-- Booking details -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:24px 36px;">
              <p style="margin:0 0 18px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">Booking Details</p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 16px;background:#f8fafc;border-radius:10px 10px 0 0;border-bottom:1px solid #f1f5f9;width:38%;vertical-align:middle;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;">Device</p>
                  </td>
                  <td style="padding:10px 16px;background:#f8fafc;border-radius:10px 10px 0 0;border-bottom:1px solid #f1f5f9;vertical-align:middle;">
                    <p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;">${device}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #f1f5f9;vertical-align:middle;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;">Issue</p>
                  </td>
                  <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #f1f5f9;vertical-align:middle;">
                    <p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;">${issue}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #f1f5f9;vertical-align:middle;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;">Date</p>
                  </td>
                  <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #f1f5f9;vertical-align:middle;">
                    <p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;">${preferredDate}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background:#f8fafc;border-bottom:${notes ? "1px solid #f1f5f9" : "none"};border-radius:${notes ? "0" : "0 0 10px 10px"};vertical-align:middle;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;">Time</p>
                  </td>
                  <td style="padding:10px 16px;background:#f8fafc;border-bottom:${notes ? "1px solid #f1f5f9" : "none"};border-radius:${notes ? "0" : "0 0 10px 10px"};vertical-align:middle;">
                    <p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;">${preferredTime}</p>
                  </td>
                </tr>
                ${notes ? `
                <tr>
                  <td style="padding:10px 16px;background:#f8fafc;border-radius:0 0 0 10px;vertical-align:top;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;">Notes</p>
                  </td>
                  <td style="padding:10px 16px;background:#f8fafc;border-radius:0 0 10px 0;vertical-align:top;">
                    <p style="margin:0;font-size:14px;color:#334155;line-height:1.6;">${notes}</p>
                  </td>
                </tr>` : ""}
              </table>
            </td></tr>
          </table>

          <!-- CTA -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:0 36px 36px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#4f46e5;border-radius:12px;padding:0;">
                    <a href="mailto:${contact}" style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:700;color:#ffffff !important;text-decoration:none !important;">
                      <span style="color:#ffffff;">Reply to ${name.split(" ")[0]} &rarr;</span>
                    </a>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 0;" align="center">
          <p style="margin:0;font-size:12px;color:#94a3b8;">HatPhones &middot; hatphones.ca</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `;

  // ── Customer confirmation email ──
  const customerEmail_html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <style>
    a { color: inherit !important; text-decoration: none !important; }
    a:visited { color: inherit !important; }
  </style>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:48px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- Brand bar -->
        <tr><td style="padding-bottom:20px;" align="center">
          <p style="margin:0;font-size:13px;font-weight:700;color:#94a3b8;letter-spacing:0.06em;text-transform:uppercase;">HatPhones &middot; Repair Booking</p>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

          <!-- Header -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#4f46e5;padding:40px 36px;text-align:center;">
                <p style="margin:0 0 14px;font-size:40px;line-height:1;">&#9989;</p>
                <p style="margin:0 0 8px;font-size:22px;font-weight:800;color:#ffffff;">You&apos;re booked in, ${name.split(" ")[0]}!</p>
                <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.75);line-height:1.6;max-width:340px;margin-left:auto;margin-right:auto;">We&apos;ve received your repair request and will be in touch shortly to confirm.</p>
              </td>
            </tr>
          </table>

          <!-- Summary -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:32px 36px 8px;">
              <p style="margin:0 0 18px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">Your Booking Summary</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 16px;background:#f8fafc;border-radius:10px 10px 0 0;border-bottom:1px solid #f1f5f9;width:38%;vertical-align:middle;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;">Device</p>
                  </td>
                  <td style="padding:10px 16px;background:#f8fafc;border-radius:10px 10px 0 0;border-bottom:1px solid #f1f5f9;vertical-align:middle;">
                    <p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;">${device}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #f1f5f9;vertical-align:middle;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;">Issue</p>
                  </td>
                  <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #f1f5f9;vertical-align:middle;">
                    <p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;">${issue}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #f1f5f9;vertical-align:middle;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;">Date</p>
                  </td>
                  <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #f1f5f9;vertical-align:middle;">
                    <p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;">${preferredDate}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background:#f8fafc;border-radius:0 0 0 10px;vertical-align:middle;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;">Time</p>
                  </td>
                  <td style="padding:10px 16px;background:#f8fafc;border-radius:0 0 10px 0;vertical-align:middle;">
                    <p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;">${preferredTime}</p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>

          <!-- What's next -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:24px 36px;">
              <p style="margin:0 0 14px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">What happens next</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding:7px 0;">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td style="width:22px;height:22px;background:#eef2ff;border-radius:50%;text-align:center;vertical-align:middle;"><p style="margin:0;font-size:11px;font-weight:800;color:#4f46e5;line-height:22px;">1</p></td>
                    <td style="padding-left:12px;font-size:14px;color:#334155;">We&apos;ll email you to confirm your appointment</td>
                  </tr></table>
                </td></tr>
                <tr><td style="padding:7px 0;">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td style="width:22px;height:22px;background:#eef2ff;border-radius:50%;text-align:center;vertical-align:middle;"><p style="margin:0;font-size:11px;font-weight:800;color:#4f46e5;line-height:22px;">2</p></td>
                    <td style="padding-left:12px;font-size:14px;color:#334155;">Drop off your device at the agreed time</td>
                  </tr></table>
                </td></tr>
                <tr><td style="padding:7px 0;">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td style="width:22px;height:22px;background:#eef2ff;border-radius:50%;text-align:center;vertical-align:middle;"><p style="margin:0;font-size:11px;font-weight:800;color:#4f46e5;line-height:22px;">3</p></td>
                    <td style="padding-left:12px;font-size:14px;color:#334155;">We notify you when the repair is ready</td>
                  </tr></table>
                </td></tr>
              </table>
            </td></tr>
          </table>

          <!-- Footer note -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:20px 36px 36px;">
              <div style="background:#f8fafc;border-radius:12px;padding:16px 20px;">
                <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">Questions? Just reply to this email — we&apos;re happy to help.</p>
              </div>
            </td></tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 0;" align="center">
          <p style="margin:0;font-size:12px;color:#94a3b8;">HatPhones &middot; hatphones.ca</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `;

  // Send both emails independently — one failure won't block the other
  const [ownerResult, customerResult] = await Promise.allSettled([
    resend.emails.send({
      from: `HatPhones Repairs <${fromEmail}>`,
      to: ownerEmail,
      subject: `New Booking — ${name} · ${device} · ${preferredDate}`,
      html: ownerEmail_html,
    }),
    resend.emails.send({
      from: `HatPhones <${fromEmail}>`,
      to: contact,
      subject: "Your repair booking is confirmed — HatPhones",
      html: customerEmail_html,
    }),
  ]);

  if (ownerResult.status === "rejected") {
    console.error("[repair-booking] Owner email failed:", ownerResult.reason);
  }
  if (customerResult.status === "rejected") {
    console.error("[repair-booking] Customer email failed:", customerResult.reason);
  }

  if (ownerResult.status === "rejected") {
    return NextResponse.json({ error: "Failed to send booking notification." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
