function error(data, emailID) { // Takes errors from backend and puts into frontend readable format
  let inputErrors = { empty: [], invalid: [] };
  let boxErrors = [];

  for (let [key, value] of Object.entries(data)) {
    switch (key) {
      case "missing":
        value.forEach((missingEntry) => {
          if (missingEntry === "token") {
            missingEntry = "captcha";
          }
          inputErrors.empty.push(missingEntry);
        });
        break;
      case "validEmail":
        inputErrors.invalid.push(emailID);
        break;
      case "captcha":
        if (value === -1) {
          inputErrors.invalid.push("captcha");
        } else if (value === 0) {
          boxErrors.push("Captcha server failed");
        }
        break;
      default:
        boxErrors.push(key + value);
        break;
    }
  }

  return [inputErrors, boxErrors];
}

async function sendForm(form, emailID, url) { // Attempts to send email and returns given output
  let response = {
    success: false,
    errors: [/* inputErrors */ { empty: [], invalid: [] }, /*boxErrors*/ []],
  };

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(form)),
  })
    .then((result) =>
      result.json().then((jsonResult) => {
        if (jsonResult.error) {
          response.errors = error(jsonResult.errors, emailID);
        } else {
          response.success = true;
        }
      })
    )
    .catch(() => {
      response.errors[1] = ["Failed to send data"];
    });

  return response;
}

export { sendForm };
