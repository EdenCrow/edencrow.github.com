import isEmail from "validator/lib/isEmail";

// Set div IDs
const formID = "formData";
const submitID = "submit";
const captchaID = "captcha";

// Set if checking email and email field id
const checkEmail = true;
const emailID = "email";

// Set CSS classes
const textErrorClass = "errorText";
const inputErrorClass = "blinkBorder";
const captchaInputErrorClass = "captchaBlinkBorder";

// Set changeable vars
const processingMessage =
  '<i class="fa fa-spinner" aria-hidden="true"></i> Processing';

// Setup captcha array for checking against
const captchaArray = ["h-captcha-response", "g-recaptcha-response", captchaID];

// Setup classes for form elements
class Button {
  constructor(id, processingText) {
    this.element = document.getElementById(id);
    this.processingText = processingText;
    this.processedText = this.element.innerHTML;
  }
  processing() {
    this.element.innerHTML = this.processingText;
    this.element.style.cursor = "default";
    this.element.disabled = true;
  }
  processed() {
    this.element.innerHTML = this.processedText;
    this.element.style.cursor = "pointer";
    this.element.disabled = false;
  }
}

class Input {
  constructor(id) {
    this.element = document.getElementById(id);
    this.isError = false;
    if (captchaArray.includes(id)) {
      this.isCaptcha = true;
      this.errorClass = captchaInputErrorClass;
    } else {
      this.isCaptcha = false;
      this.errorClass = inputErrorClass;
    }

    // Setup error message text
    this.errorTextID = "errorText" + id;
    this.textErrorClass = textErrorClass;
    if (this.isCaptcha) {
      this.textErrorClass += "--captcha";
    }
    this.errorMessageDefault = "<br/>";
    this.element.insertAdjacentHTML(
      "afterend",
      `<div id="${this.errorTextID}" class="${this.textErrorClass}">${this.errorMessageDefault}</div>`
    );
    this.errorMessageDiv = document.getElementById(this.errorTextID);

    this.removeError = function () {
      this.element.classList.remove(this.errorClass);
      this.errorMessageDiv.innerHTML = this.errorMessageDefault;
      this.isError = false;
    };

    // Removes error message on blur if not empty
    this.removeListener = function (e) {
      if (!this.isCaptcha) {
        let currentValue = this.element.value.trim();
        if (currentValue.length > 0) {
          this.removeError();
        }
      }
    };
    this.removeHandler = this.removeListener.bind(this);
  }

  // Shows relevant error message
  error(errorType) {
    this.isError = true;
    this.element.classList.add(this.errorClass);
    this.element.addEventListener("blur", this.removeHandler);
    let errorMessage = "";
    switch (errorType) {
      case 0:
        if (!this.isCaptcha) {
          this.element.value = "";
        }
        errorMessage = `Missing ${this.element.id}!`;
        break;
      case 1:
        errorMessage = `Invalid ${this.element.id}!`;
        break;
      default:
        errorMessage = "Undefined Error";
    }
    this.errorMessageDiv.innerHTML = errorMessage;
  }

  // Remove error messages
  reset() {
    this.element.blur();
    if (this.isError) {
      this.element.removeEventListener("blur", this.removeHandler);
      this.removeError();
    }
  }
}

// Get form and submit
const form = document.getElementById(formID);
const submitButton = new Button(submitID, processingMessage);

// Setup captcha
const captcha = new Input(captchaID);
window.captchaCallback = function () {
  if (captcha.isError) {
    captcha.removeError();
  }
};

// Setup input classes
const formFields = new FormData(form);
let fieldClasses = [];
for (let pair of formFields.entries()) {
  let field = pair[0];
  if (!captchaArray.includes(field)) {
    let textClassName = field + "Input";
    window[textClassName] = new Input(field);
    fieldClasses.push(window[textClassName]);
  }
}

// Validation functions
function checkEmpty(formData) {
  let emptyValues = [];
  for (let pair of formData.entries()) {
    let inputKey = pair[0];
    let inputClassName = pair[0] + "Input";
    let inputValue = pair[1].trim();

    if (inputValue.length === 0) {
      emptyValues.push(inputKey);
      if (!captchaArray.includes(inputKey)) {
        window[inputClassName].error(0);
      } else {
        captcha.error(0);
      }
    }
  }
  return emptyValues;
}

function validateEmail(email) {
  let isValid = isEmail(email, {
    require_tld: false,
    ignore_max_length: true,
    allow_ip_domain: true,
  });
  if (!isValid) {
    emailInput.error(1);
  }
  return isValid;
}

// Main function
form.addEventListener(submitID, (event) => {
  event.preventDefault();

  // Reset error messages
  fieldClasses.forEach((item) => {
    item.reset();
  });
  captcha.reset();

  // Change button
  submitButton.processing();

  // Get form data
  let formData = new FormData(form);

  // Check if data is empty
  let emptyValues = checkEmpty(formData);

  // Check if email is valid if email field present
  let validEmail = false;
  if (!checkEmail) {
    validEmail = true;
  } else if (!emptyValues.includes(emailID)) {
    validEmail = validateEmail(formData.get(emailID));
  }

  // Espace function if any values empty or email is not valid
  if (emptyValues.length > 0 || !validEmail) {
    submitButton.processed();
    return;
  }

  // Input is valid
  console.log("valid");
});
