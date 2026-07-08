/** Send verification email to the registering user's inbox */
(function () {
  let emailjsReady = null;

  function getConfig() {
    return window.O4AI_QA_EMAIL_CONFIG || {};
  }

  function isConfigured() {
    const { emailjs } = getConfig();
    return Boolean(emailjs?.publicKey && emailjs?.serviceId && emailjs?.templateId);
  }

  function loadEmailJs() {
    if (window.emailjs) return Promise.resolve(window.emailjs);
    if (emailjsReady) return emailjsReady;

    emailjsReady = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.async = true;
      script.onload = () => resolve(window.emailjs);
      script.onerror = () => reject(new Error('Failed to load EmailJS SDK.'));
      document.head.appendChild(script);
    });

    return emailjsReady;
  }

  async function sendVerificationEmail({ email, token }) {
    const template = window.O4AI_QA_EMAIL?.buildVerificationEmail({ email, token });
    if (!template) throw new Error('Email template unavailable.');

    if (!isConfigured()) {
      return {
        ok: false,
        demo: true,
        reason: 'Email delivery is not configured yet. Ask an admin to set EmailJS keys in js/qa-email-config.js.',
        ...template,
      };
    }

    const { emailjs: cfg, fromName } = getConfig();
    const client = await loadEmailJs();
    client.init(cfg.publicKey);

    const displayName = (email.split('@')[0] || 'there').replace(/[._]/g, ' ');
    const params = {
      to_email: email,
      email,
      user_email: email,
      to_name: displayName,
      verify_url: template.verifyUrl,
      link: template.verifyUrl,
      reset_link: template.verifyUrl,
      subject: template.subject,
      message: template.text,
      html_message: template.html,
      from_name: fromName || 'The OceanData4AI Community',
      reply_to: email,
    };

    try {
      await client.send(cfg.serviceId, cfg.templateId, params);
    } catch (err) {
      const reason = err?.text || err?.message || 'Email delivery failed.';
      return { ok: false, reason, ...template };
    }

    return { ok: true, ...template };
  }

  window.O4AI_QA_EMAIL_SEND = {
    isConfigured,
    sendVerificationEmail,
  };
})();
