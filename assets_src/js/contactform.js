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
  displayError(inner) {
    this.element.classList.add(errorClass);
    this.element.innerHTML = inner;
  }
  displaySuccess(inner) {
    this.element.classList.add(successClass);
    this.element.innerHTML = inner;
  }
  empty() {
    this.element.classList.remove(errorClass, successClass);
    this.element.innerHTML = "";
  }
}

class TextInput {
  constructor(id) {
    this.element = document.getElementById(id);
  }
  error() {
    this.element.classList.add(textErrorClass);
    this.element.addEventListener(
      "blur",
      function () {
        if (this.value !== "") {
          this.classList.remove(textErrorClass);
        }
      },
      { once: true }
    );
  }
}

// Set instances of element classes
const submitButton = new Button(submitID, processedMessage);
const messageBox = new InfoBox(infoID);
const form = document.getElementById(formID); // TODO?
const nameInput = new TextInput(nameID);
const emailInput = new TextInput(emailID);
const messageInput = new TextInput(messageID);

// Create object of inputs
const inputObject = {
  [nameID]: nameInput,
  [emailID]: emailInput,
  [messageID]: messageInput,
};

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
  submitButton.processing();
  messageBox.empty();

  let data = new FormData(form);
  data.delete("g-recaptcha-response"); // Why is this added?

  // Verify info entered
  let dataNull = [];
  for (var pair of data.entries()) {
    if (pair[1] === undefined || pair[1] === null || pair[1] === "") {
      dataNull.push(pair[0]);
    }
  }
  if (dataNull.length > 0) {
    // Get hCaptcha friendly name if present in dataNull
    let hcaptchaIndex = dataNull.findIndex((x) => x === "h-captcha-response");
    if (hcaptchaIndex !== -1) {
      dataNull[hcaptchaIndex] = "h-captcha";
    }
    showError("Missing:<br>" + dataNull.join("<br>"));
    for (let key of dataNull) {
      if (key !== "h-captcha") {
        inputObject[key].error();
      } else if (key === "h-captcha") {
        // Somehow style hCaptcha?
      }
    }
    return;
  }

  // Process data from form into JSON
  let dataObj = {};
  data.forEach((value, key) => (dataObj[key] = value));

  // Verify email
  let isValid = isEmail(dataObj.email, {
    require_tld: false,
    ignore_max_length: true,
    allow_ip_domain: true,
  });
  if (!isValid) {
    showError("Invalid E-mail");
    emailInput.error();
    return;
  }

  // Convert JSON to JSON string
  let dataJSON = JSON.stringify(dataObj);

  // Open request
  let request = new XMLHttpRequest();
  request.open("POST", url);

  // How to deal with response
  request.onload = function () {
    console.log(this.status + this.response); // debug
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
