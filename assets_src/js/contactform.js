import isEmail from "validator/lib/isEmail";

const form = document.getElementById("formData");
const submitButton = document.getElementById("submit");
const messageBox = document.getElementById("messages");

const url = "https://contact.edencrow.info";

function processingButton() {
  submitButton.innerHTML =
    '<i class="fa fa-spinner" aria-hidden="true"></i> Processing';
  submitButton.style.cursor = "default";
  submitButton.disabled = true;
  return;
}

function processedButton() {
  submitButton.innerHTML =
    '<i class="fa fa-paper-plane-o" aria-hidden="true"></i> Submit';
  submitButton.style.cursor = "pointer";
  submitButton.disabled = false;
  return;
}

function showError(error) {
  processedButton();
  messageBox.innerHTML = error;
}

function showNullData(nullData) {
  let div;
  for (let key of nullData) {
    if (key !== "h-captcha") {
      div = document.getElementById(key);

      div.classList.add("blinkBorder");

      div.addEventListener(
        "blur",
        function () {
          if (this.value !== "") {
            this.classList.remove("blinkBorder");
            this.removeEventListener;
          }
        },
        { once: true }
      );
    } else if (key === "h-captcha") {
      // Somehow style hCaptcha?
    }
  }
}

function onSuccess() {
  processedButton();
  messageBox.innerHTML = "😊";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  processingButton();

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
    showNullData(dataNull);
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
    showNullData(["email"]);
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
