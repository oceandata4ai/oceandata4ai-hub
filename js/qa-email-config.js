// Email verification delivery — configure EmailJS for production send
// https://www.emailjs.com/docs/tutorial/overview/
window.O4AI_QA_EMAIL_CONFIG = {
  // EmailJS dashboard checklist:
  // 1. Account → Security → Allowed Origins: add https://oceandata4ai.github.io
  // 2. Template "To email": {{to_email}}
  // 3. Body/button link: {{verify_url}} or {{link}} (Password Reset preset uses {{link}})
  // Variables sent: to_email, verify_url, link, subject, message, from_name
  emailjs: {
    publicKey: 'Z86bh9pBsZJ-ZC6iN',
    serviceId: 'service_wrt6g74',
    templateId: 'template_xtjk0zm',
  },
  fromName: 'The OceanData4AI Community',
};
