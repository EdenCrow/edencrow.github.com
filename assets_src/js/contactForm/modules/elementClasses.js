export class Button {
  constructor(id, spinner) {
    this.element = document.getElementById(id);
    this.spinner = spinner;
    this.processedText = this.element.innerHTML;
  }
  processing() {
    this.element.innerHTML = [this.spinner, "Processing"].join(" ");
    this.element.style.cursor = "default";
    this.element.disabled = true;
  }
  processed() {
    this.element.innerHTML = this.processedText;
    this.element.style.cursor = "pointer";
    this.element.disabled = false;
  }
}

export class Input {
  constructor(id, errorClass, isCaptcha = false) {
    this.element = document.getElementById(id);
    this.isError = false;
    this.isCaptcha = isCaptcha;
    this.errorClass = errorClass;

    // Setup error message text
    this.errorTextID = "errorText" + id;
    this.errorMessageDefault = "<br>";
    this.element.insertAdjacentHTML(
      "afterend",
      `<div id="${this.errorTextID}">${this.errorMessageDefault}</div>`
    );
    this.errorMessageDiv = document.getElementById(this.errorTextID);

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

export class MessageBox {
  constructor(id, errorStyle, successStyle, emptyStyle) {
    this.messageBox = document.getElementById(id);
    this.errorStyle = errorStyle;
    this.successStyle = successStyle;
    this.emptyStyle, (this.style = emptyStyle);
  }
  setMessage(errorType, message = "Email Sent") {
    if (errorType) {
      this.messageBox.classList.add(this.errorStyle);
      this.messageBox.innerHTML = "Error " + message;
    } else {
      this.messageBox.classList.add(this.successStyle);
      this.messageBox.innerHTML = "Success  " + message;
    }
  }
  reset() {
    if (this.style != this.emptyStyle) {
      this.messageBox.classList.remove(this.style);
      this.messageBox.innerHTML = "";
      this.style = this.emptyStyle;
    }
  }
}
