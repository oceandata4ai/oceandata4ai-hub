/** Build OceanData4AI verification email (ClickHouse-style) */
(function () {
  const SITE_BASE = 'https://oceandata4ai.github.io/oceandata4ai-hub';
  const VERIFY_PATH = '/qa/verify.html';
  const LOGO_URL = `${SITE_BASE}/assets/oceandata4ai-logo.svg`;

  function buildVerifyUrl(token, email) {
    const params = new URLSearchParams({ token, email });
    return `${SITE_BASE}${VERIFY_PATH}?${params.toString()}`;
  }

  function buildVerificationEmail({ email, token }) {
    const verifyUrl = buildVerifyUrl(token, email);
    const subject = 'OceanData4AI email confirmation';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
          <tr>
            <td style="background:#0d1117;padding:28px 32px;text-align:center;">
              <table role="presentation" cellspacing="0" cellpadding="0" align="center">
                <tr>
                  <td style="padding-right:12px;vertical-align:middle;">
                    <img src="${LOGO_URL}" alt="" width="36" height="36" style="display:block;border-radius:8px;" />
                  </td>
                  <td style="vertical-align:middle;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">OceanData4AI</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 36px 28px;">
              <p style="margin:0 0 20px;font-size:18px;line-height:1.5;">Hi there,</p>
              <p style="margin:0 0 28px;font-size:18px;line-height:1.6;color:#374151;">
                Thanks for registering an account with the OceanData4AI Community. To complete your sign up, please verify your email.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 28px;">
                <tr>
                  <td style="border-radius:10px;background:#111827;">
                    <a href="${verifyUrl}" style="display:inline-block;padding:14px 28px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;">Verify email</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 28px;font-size:16px;line-height:1.6;color:#374151;">This link will expire after 24 hours.</p>
              <p style="margin:0;font-size:16px;line-height:1.6;color:#374151;">
                Regards,<br />
                <strong>The OceanData4AI Community</strong>
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-size:12px;line-height:1.5;color:#9ca3af;max-width:640px;">
          If the button does not work, copy and paste this link into your browser:<br />
          <a href="${verifyUrl}" style="color:#2563eb;word-break:break-all;">${verifyUrl}</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const text = `Hi there,

Thanks for registering an account with the OceanData4AI Community. To complete your sign up, please verify your email.

Verify email: ${verifyUrl}

This link will expire after 24 hours.

Regards,
The OceanData4AI Community`;

    return { subject, html, text, verifyUrl };
  }

  window.O4AI_QA_EMAIL = {
    buildVerifyUrl,
    buildVerificationEmail,
  };
})();
