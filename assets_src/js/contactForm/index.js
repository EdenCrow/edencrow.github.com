import { Button, Input, MessageBox } from "./modules/elementClasses.js";
import { checkEmpty, validateEmail } from "./modules/clientValidation";
import {
  handleResponseError,
  handleResponseSuccess,
} from "./modules/handleResponse.js";

// Set Variables //
// div IDs (note IDs must match name attribute for form and submit)
const messageID = "messageBox";
const formID = "formData";
const submitID = "submit";
const captchaID = "captcha";
const emailID = "email";
// CSS classes
const messageErrorClass = "messageError";
const messageSuccessClass = "messageSuccess";
const messageEmptyClass = "messageEmpty";
const inputErrorClass = "blinkBorder";
const captchaErrorClass = "captchaBlinkBorder";
// Loading icon
const spinner = '<i class="fa fa-spinner" aria-hidden="true"></i>';
// Request URL
const URL = "http://localhost:9876"; // Debug, real URL: https://contact.edencrow.info

// Setup captcha array for checking against
const captchaArray = ["h-captcha-response", "g-recaptcha-response", captchaID];

// Setup form and submit
const messageBox = new MessageBox(
  messageID,
  messageErrorClass,
  messageSuccessClass,
  messageEmptyClass
);
const form = document.getElementById(formID);
const submitButton = new Button(submitID, spinner);

// Setup captcha
window.captchaInput = new Input(captchaID, captchaErrorClass, true);
window.captchaCallback = function () {
  if (captchaInput.isError) {
    captchaInput.removeError();
  }
};

// Setup input classes
const formFields = new FormData(form);
let fieldClasses = [window.captchaInput];
for (let pair of formFields.entries()) {
  let field = pair[0];
  if (!captchaArray.includes(field)) {
    let textClassName = field + "Input";
    window[textClassName] = new Input(field, inputErrorClass);
    fieldClasses.push(window[textClassName]);
  }
}

// Main function
form.addEventListener(submitID, (event) => {
  event.preventDefault();

  // Update visual feedback
  fieldClasses.forEach((item) => {
    item.reset();
  });

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

  // Client-side validation
  let emptyValues = checkEmpty(formData);

  let validEmail = false;
  if (!emptyValues.includes(emailID)) {
    validEmail = validateEmail(formData.get(emailID));
  }

  if (emptyValues.length > 0 || !validEmail) {
    submitButton.processed();
    return;
  }

  // Input is valid => send form
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  }).then((result) =>
    result.json().then((jsonResult) => {
      submitButton.processed();
      jsonResult.error
        ? handleResponseError(jsonResult.errors)
        : handleResponseSuccess(form, messageBox);
    })
  );
});
