import isEmail from "validator/lib/isEmail";

// Set div IDs
// NOTE: name and ID must match on form inputs HTML
const submitID = "submit";
const infoID = "infoBox";
const formID = "formData";
const nameID = "name";
const emailID = "email";
const messageID = "message";
const errorClass = "errorMessage";
const textErrorClass = "blinkBorder";
const successClass = "successMessage";

// Set changeable vars
const url = "https://contact.edencrow.info";
const processedMessage =
  '<i class="fa fa-spinner" aria-hidden="true"></i> Processing';

// Setup classes for elements
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

class InfoBox {
  constructor(id) {
    this.element = document.getElementById(id);
  }
  displaySuccess(inner) {
    this.element.classList.add(successClass);
    this.element.innerHTML = inner;
  }
  displayError(errors) {
    this.element.classList.add(errorClass);

    let missingValues = [];
    for (const [key, value] of Object.entries(errors.entered)) {
      if (value === false) {
        missingValues.push(key);
      }
    }

    let displayMessage = "Error";
    if (missingValues.length > 0) {
      displayMessage = displayMessage.concat(
        "<br>Missing:<br>" + missingValues.join("<br>")
      );
    }
    if (errors.entered.email === true && errors.validemail === false) {
      displayMessage = displayMessage.concat("<br/>Invalid Email");
    }
    this.element.innerHTML = displayMessage;
  }
  empty() {
    this.element.classList.remove(errorClass, successClass);
    this.element.innerHTML = "";
  }
}

class TextInput {
  constructor(id) {
    this.element = document.getElementById(id);
    this.removeClass = function (e) {
      if (this.value !== "") {
        e.target.classList.remove(textErrorClass);
      }
    };
    this.removeHandler = this.removeClass.bind(this);
  }
  error() {
    this.element.classList.add(textErrorClass);
    this.element.addEventListener("blur", this.removeHandler);
  }
  reset() {
    this.element.classList.remove(textErrorClass);
    this.element.removeEventListener("blur", this.removeHandler);
  }
}

// Set instances of element classes
const submitButton = new Button(submitID, processedMessage);
const messageBox = new InfoBox(infoID);
const nameInput = new TextInput(nameID);
const emailInput = new TextInput(emailID);
const messageInput = new TextInput(messageID);

// Create object of inputs
const inputObject = {
  [nameID]: nameInput,
  [emailID]: emailInput,
  [messageID]: messageInput,
};

// Get Form
const form = document.getElementById(formID);

// Handling form errors/success
function showError(error) {
  submitButton.processed();
  messageBox.displayError(error);
}
function onSuccess() {
  submitButton.processed();
  form.remove();
  messageBox.displaySuccess("😊");
}

// Main function to deal with form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Reset visuals
  for (let [, value] of Object.entries(inputObject)) {
    value.reset();
  }
  submitButton.processing();
  messageBox.empty();

  // Get form data
  let data = new FormData(form);
  data.delete("g-recaptcha-response"); // Why is this added?

  // Error checking vars
  let formErrors = false;
  let errors = {
    entered: {
      [nameID]: false,
      [emailID]: false,
      [messageID]: false,
      captcha: false,
    },
    validemail: false,
  };

  // Verify info entered
  let dataNull = [];
  for (var pair of data.entries()) {
    if (pair[1] === undefined || pair[1] === null || pair[1] === "") {
      dataNull.push(pair[0]);
    } else if (pair[1] !== undefined || pair[1] !== null || pair[1] !== "") {
      if (pair[0] === "h-captcha-response") {
        errors.entered.captcha = true;
      } else {
        errors.entered[pair[0]] = true;
      }
    }
  }

  // Not all info entered
  if (dataNull.length > 0) {
    formErrors = true;

    // Get hCaptcha friendly name if present in dataNull
    let hcaptchaIndex = dataNull.findIndex((x) => x === "h-captcha-response");
    if (hcaptchaIndex !== -1) {
      dataNull[hcaptchaIndex] = "h-captcha";
    }

    // Give input error box if in dataNull
    for (let key of dataNull) {
      if (key !== "h-captcha") {
        inputObject[key].error();
      } else if (key === "h-captcha") {
        // Somehow style hCaptcha?
      }
    }
  }

  // Verify email if entered
  if (errors.entered.email) {
    let isValid = isEmail(data.get("email"), {
      require_tld: false,
      ignore_max_length: true,
      allow_ip_domain: true,
    });
    if (!isValid) {
      formErrors = true;
      emailInput.error();
      inputObject.email.error();
    } else {
      errors.validemail = true;
    }
  }

  // Exit and show errors if any errors present
  if (formErrors) {
    showError(errors);
    return;
  }

  // Convert JSON to JSON string
  let dataObj = {};
  data.forEach((value, key) => (dataObj[key] = value));
  let dataJSON = JSON.stringify(dataObj);

  // Open request
  let request = new XMLHttpRequest();
  request.open("POST", url);

  // How to deal with response
  request.onload = function () {
    let statusCode = this.status;
    let response = JSON.parse(this.response);

    let returnError = true;
    let errorMessage = "";
    switch (statusCode) {
      case 200: // Success
        onSuccess();
        break;
      case 400: // Bad info
        errorMessage = "Bad info: " + response.error;
        break;
      case 500: // Server error
        errorMessage = "Server error: " + response.error;
        break;
      default:
        // Other
        errorMessage = "Other error: " + statusCode;
    }
    if (returnError) {
      showError(errorMessage);
    }
  };

  // How to deal with error
  request.onerror = function () {
    showError("XMLHttp Error");
  };

  // Send request
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(dataJSON);
});
