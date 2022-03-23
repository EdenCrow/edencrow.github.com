import isEmail from "validator/lib/isEmail";

// Set div IDs
const formID = "formData";
const emailID = "email";
const submitID = "submit";

// Set CSS classes
const textErrorClass = "errorText";
const inputErrorClass = "blinkBorder";

// Set changeable vars
const processedMessage =
  '<i class="fa fa-spinner" aria-hidden="true"></i> Processing';

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

class TextInput {
  constructor(id) {
    this.element = document.getElementById(id);
    this.isError = false;
    this.removeClass = function (e) {
      if (this.value !== "") {
        e.target.classList.remove(inputErrorClass);
      }
    };
    this.removeHandler = this.removeClass.bind(this);
  }
  error(errorType) {
    this.isError = true;
    this.element.classList.add(inputErrorClass);
    this.element.addEventListener("blur", this.removeHandler);
    let errorMessage = "";
    switch (errorType) {
      case 0:
        errorMessage = `Missing ${this.element.id}!`;
        break;
      case 1:
        errorMessage = `Invalid ${this.element.id}!`;
        break;
      default:
        errorMessage = "Undefined Error";
    }
    this.element.insertAdjacentHTML(
      "afterend",
      `<div id="errorText${this.element.id}" class="${textErrorClass}">${errorMessage}</div>`
    );
  }
  reset() {
    if (this.isError) {
      this.element.classList.remove(inputErrorClass);
      this.element.removeEventListener("blur", this.removeHandler);
      let removeID = "errorText" + this.element.id;
      document.getElementById(removeID).remove();
    }
  }

  noError() {
    this.isError = false;
  }
}

// Get form and submit
const form = document.getElementById(formID);
const submitButton = new Button(submitID, processedMessage);

// Setup input classes
const formFields = new FormData(form);
let fieldClasses = [];
for (let pair of formFields.entries()) {
  let field = pair[0];
  let textClassName = field + "Input";
  window[textClassName] = new TextInput(field);
  fieldClasses.push(window[textClassName]);
}

// Validation functions
function checkEmpty(formData) {
  let emptyValues = [];
  for (let pair of formData.entries()) {
    let inputKey = pair[0];
    let inputClassName = pair[0] + "Input";
    let inputValue = pair[1];

    if (inputValue === undefined || inputValue === null || inputValue === "") {
      emptyValues.push(inputKey);
      if (inputKey != "h-captcha-response") {
        window[inputClassName].error(0);
      } else {
        // Give hCaptcha error
        console.log("hcaptcha error");
      }
    } else {
      if (inputKey != "h-captcha-response") {
        window[inputClassName].noError();
      } else {
        // hCaptcha no error
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
  } else {
    emailInput.noError();
    return isValid;
  }
}

// Main function
form.addEventListener(submitID, (event) => {
  event.preventDefault();

  fieldClasses.forEach((item) => {
    item.reset();
  });
  submitButton.processing();

  // Get form data
  let formData = new FormData(form);
  formData.delete("g-recaptcha-response"); // Why is this included?

  // Check if data is empty
  let emptyValues = checkEmpty(formData);

  // Check if email is valid if email field present
  let validEmail = false;
  if (formData.get(emailID) === null) {
    validEmail = true;
  } else if ((!emptyValues.includes(emailID))) {
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
