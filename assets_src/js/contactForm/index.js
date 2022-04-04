import * as elements from "./modules/elementClasses";
import * as showOutput from "./modules/showOutput";
import { clientValid } from "./modules/clientValidation";
import { sendForm } from "./modules/sendForm";
import { config } from "./config";

// Setup captcha array for checking against
const captchaArray = [
  "h-captcha-response",
  "g-recaptcha-response",
  config.id.captcha,
];

// Setup form and submit
const messageBox = new elements.MessageBox(config.id.message);
const form = document.getElementById(config.id.form);
const submitButton = new elements.Button(config.id.submit);

// Object to store inputs
const inputsObject = {};

// Create captcha input
inputsObject["captcha"] = new elements.Input(config.id.captcha, true);
window.captchaCallback = function () { // Function called by captcha on success
  if (inputsObject["captcha"].isError) {
    inputsObject["captcha"].removeError();
  }
};

// Create fields inputs
const formFields = new FormData(form);
for (let pair of formFields.entries()) {
  let field = pair[0];
  if (!captchaArray.includes(field)) {
    inputsObject[field] = new elements.Input(field);
  }
}

// Main function
form.addEventListener(config.id.submit, async (event) => {
  event.preventDefault();

  // Reset output
  for (let [, value] of Object.entries(inputsObject)) {
    value.reset();
  }
  messageBox.reset();
  submitButton.processing();

  // Get form data
  let formData = new FormData(form);
  formData.delete("g-recaptcha-response");
  for (let pair of formData.entries()) {
    if (captchaArray.includes(pair[0])) {
      formData.delete(pair[0]);
      formData.append("captcha", pair[1]);
    }
  }

  // Check form is valid => output errors
  let validationInfo = clientValid(formData, config.id.email);
  if (validationInfo.errors) {
    showOutput.input(validationInfo, inputsObject);
    submitButton.processed();
    return;
  }

  // Input is valid => send form => output response
  let response = await sendForm(formData, config.id.email, config.url);
  if (response.success) {
    showOutput.successBox(form, messageBox);
  } else {
    showOutput.input(response.errors[0], inputsObject);
    showOutput.errorBox(response.errors[1], messageBox);
    submitButton.processed();
  }
});
