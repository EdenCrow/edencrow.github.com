const config = { // Config options for index.js
  id: {
    message: "messageBox",
    form: "formData",
    submit: "submit",
    captcha: "captcha",
    email: "email",
  },
  url: "http://localhost:9876",
};

const buttonConfig = { // Config options for submit button
  spinner: '<i class="fa fa-spinner fa-pulse fa-fw"></i>',
  text: {
    processing: "Processing",
  },
};

const inputConfig = { // Config options for form fields
  class: {
    input: "blinkBorder",
    captcha: "captchaBlinkBorder",
    empty: "messageEmpty"
  },
};

const messageConfig = { // Config options for message box
  headers: {
    error:
      "<h3><i class='fa fa-exclamation-triangle' aria-hidden='true'></i> Error(s)!</h3>",
    success:
      "<h3><i class='fa fa-thumbs-up' aria-hidden='true'></i> Success!</h3>",
  },
  title: {
    error:
      "<p>Please try again later or Tweet me so I can try and fix the issue.</p>",
    success:
      "<p>Your message has been sent. I'll try to get back to you ASAP <i class='fa fa-smile-o' aria-hidden='true'></i></p>",
  },
  class: {
    error: "messageError",
    success: "messageSuccess",
    empty: "messageEmpty",
  },
};

export { config, buttonConfig, inputConfig, messageConfig };
