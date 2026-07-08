// Email verification delivery — configure EmailJS for production send
// https://www.emailjs.com/docs/tutorial/overview/
window.O4AI_QA_EMAIL_CONFIG = {
  // EmailJS: create a service + template with variables:
  //   {{to_email}} {{verify_url}} {{subject}} {{message}} {{from_name}}
  // Set template "To email" field to {{to_email}}
  emailjs: {
    publicKey: '',
    serviceId: '',
    templateId: '',
  },
  fromName: 'The OceanData4AI Community',
};
