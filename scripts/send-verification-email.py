#!/usr/bin/env python3
"""Send OceanData4AI verification email (demo). Requires SMTP_* env vars."""

import os
import sys
import uuid
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

SITE_BASE = "https://oceandata4ai.github.io/oceandata4ai-hub"
LOGO_URL = f"{SITE_BASE}/assets/oceandata4ai-logo.svg"


def build_email(email: str, token: str) -> tuple[str, str, str]:
    verify_url = f"{SITE_BASE}/qa/verify.html?token={token}&email={email}"
    subject = "OceanData4AI email confirmation"
    html = f"""<!DOCTYPE html>
<html lang="en"><body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6;padding:32px 16px;"><tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
<tr><td style="background:#0d1117;padding:28px 32px;text-align:center;">
<span style="font-size:22px;font-weight:700;color:#fff;">OceanData4AI</span>
</td></tr>
<tr><td style="padding:40px 36px 28px;">
<p style="margin:0 0 20px;font-size:18px;">Hi there,</p>
<p style="margin:0 0 28px;font-size:18px;line-height:1.6;color:#374151;">Thanks for registering an account with the OceanData4AI Community. To complete your sign up, please verify your email.</p>
<p style="margin:0 0 28px;"><a href="{verify_url}" style="display:inline-block;padding:14px 28px;background:#111827;color:#fff;text-decoration:none;border-radius:10px;font-weight:600;">Verify email</a></p>
<p style="margin:0 0 28px;font-size:16px;color:#374151;">This link will expire after 24 hours.</p>
<p style="margin:0;font-size:16px;color:#374151;">Regards,<br><strong>The OceanData4AI Community</strong></p>
</td></tr></table>
<p style="margin:20px 0 0;font-size:12px;color:#9ca3af;max-width:640px;">If the button does not work: <a href="{verify_url}">{verify_url}</a></p>
</td></tr></table></body></html>"""
    text = f"""Hi there,

Thanks for registering an account with the OceanData4AI Community. To complete your sign up, please verify your email.

Verify email: {verify_url}

This link will expire after 24 hours.

Regards,
The OceanData4AI Community"""
    return subject, html, text


def send_email(to_email: str, subject: str, html: str, text: str) -> None:
    host = os.environ.get("SMTP_HOST")
    port = int(os.environ.get("SMTP_PORT", "587"))
    user = os.environ.get("SMTP_USER")
    password = os.environ.get("SMTP_PASSWORD")
    from_email = os.environ.get("SMTP_FROM", user or "noreply@oceandata4ai.community")

    if not all([host, user, password]):
        raise SystemExit(
            "Missing SMTP credentials. Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD "
            "(optional: SMTP_PORT, SMTP_FROM)."
        )

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"The OceanData4AI Community <{from_email}>"
    msg["To"] = to_email
    msg.attach(MIMEText(text, "plain", "utf-8"))
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP(host, port, timeout=30) as server:
        server.starttls()
        server.login(user, password)
        server.sendmail(from_email, [to_email], msg.as_string())


def main() -> None:
    to_email = sys.argv[1] if len(sys.argv) > 1 else "gongbo.wgb@oceanbase.com"
    token = sys.argv[2] if len(sys.argv) > 2 else uuid.uuid4().hex
    subject, html, text = build_email(to_email, token)

    out = Path(__file__).resolve().parents[1] / "emails" / "last-verification.html"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding="utf-8")

    send_email(to_email, subject, html, text)
    print(f"Sent verification email to {to_email}")
    print(f"Verify URL token: {token}")
    print(f"Preview saved: {out}")


if __name__ == "__main__":
    main()
