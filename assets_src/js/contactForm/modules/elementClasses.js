import { buttonConfig, inputConfig, messageConfig } from "../config";

class Button {
  // Class for submit button
  constructor(id) {
    this.element = document.getElementById(id);
    this.processedText = this.element.innerHTML;
  }
  processing() {
    // Text and styles to display when form is processing
    this.element.innerHTML = [
      buttonConfig.spinner,
      buttonConfig.text.processing,
    ].join(" ");
    this.element.style.cursor = "default";
    this.element.disabled = true;
  }
  processed() {
    // Return to default style when form has finished processing
    this.element.innerHTML = this.processedText;
    this.element.style.cursor = "pointer";
    this.element.disabled = false;
  }
}

class Input {
  // Class for input fields
  constructor(id, isCaptcha = false) {
    this.element = document.getElementById(id);
    this.isError = false;
    this.isCaptcha = isCaptcha;
    this.errorClass = isCaptcha
      ? inputConfig.class.captcha
      : inputConfig.class.input;

    // Setup error message text
    this.errorTextID = "errorText" + id;
    this.errorMessageDefault = "<br>";
    this.element.insertAdjacentHTML(
      "afterend",
      `<div id="${this.errorTextID}">${this.errorMessageDefault}</div>`
    );
    this.errorMessageDiv = document.getElementById(this.errorTextID);
    this.errorMessageDiv.classList.add(inputConfig.class.empty);

    // Function to remove errors
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
    this.errorMessageDiv.classList.remove(inputConfig.class.empty);
    this.element.classList.add(this.errorClass);
    this.element.addEventListener("blur", this.removeHandler);
    let errorMessage = "";
    switch (errorType) {
      case 0: // Missing error
        if (!this.isCaptcha) {
          this.element.value = "";
        }
        errorMessage = `Missing ${this.element.id}!`;
        break;
      case 1: // Invalid error
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
    this.errorMessageDiv.classList.add(inputConfig.class.empty);
    if (this.isError) {
      this.element.removeEventListener("blur", this.removeHandler);
      this.removeError();
    }
  }
}

class MessageBox {
  // Class for error/success box
  constructor(id) {
    this.emptyStyle, (this.style = messageConfig.class.empty);

    this.messageBox = document.getElementById(id);
    this.messageBox.classList.add(this.emptyStyle);
  }

  // Set message box
  setMessage(errors = []) {
    this.messageBox.classList.remove(this.emptyStyle);

    if (errors.length > 0) {
      // Display error box
      this.style = messageConfig.class.error;
      this.messageBox.classList.add(this.style);
      let errorsList = "";
      errors.forEach((value) => {
        errorsList += "<li>" + value + "</li>";
      });
      errorsList = "<ul>" + errorsList + "</ul>";
      this.messageBox.innerHTML =
        messageConfig.headers.error + errorsList + messageConfig.title.error;
    } else {
      // Display success box
      this.style = messageConfig.class.success;
      this.messageBox.classList.add(this.style);
      this.messageBox.innerHTML =
        messageConfig.headers.success + messageConfig.title.success;
    }
  }

  // Remove message box
  reset() {
    if (this.style != this.emptyStyle) {
      this.messageBox.classList.remove(this.style);
      this.messageBox.innerHTML = "";
      this.messageBox.classList.add(this.emptyStyle);
      this.style = this.emptyStyle;
    }
  }
}

export { Button, Input, MessageBox };
