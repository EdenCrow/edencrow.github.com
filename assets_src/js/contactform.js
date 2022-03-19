window.addEventListener("load", function() {

    const form = document.getElementById('formData');
    const submitButton = document.getElementById('submit');
    const messageBox = document.getElementById('messages');

    const url = "https://contact.edencrow.info";

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        submitButton.innerHTML = '<i class="fa fa-spinner" aria-hidden="true"></i> Processing';
        submitButton.style.cursor = "default";
        submitButton.disabled = true;

        let data = new FormData(form);

        // TODO: Add client-side verification

        // Process data from form into JSON
        let dataObj = {};
        data.forEach((value, key) => dataObj[key] = value);
        let dataJSON = JSON.stringify(dataObj);

        // Open request
        let request = new XMLHttpRequest();
        request.open("POST", url);

        // How to deal with response
        request.onload = function() {
            submitButton.innerHTML = '<i class="fa fa-paper-plane-o" aria-hidden="true"></i> Submit';
            submitButton.style.cursor = "pointer";
            submitButton.disabled = false;
            console.log(this.status + this.response); // debug
            let statusCode = this.status;
            let response = JSON.parse(this.response);

            switch(statusCode) {
                case 200: // Success
                    messageBox.innerHTML = "Success: " + response.success;
                    break;
                case 400: // Bad info
                    messageBox.innerHTML = "Bad info: " + response.error;
                    break;
                case 500: // Server error
                    messageBox.innerHTML = "Server error: " + response.error;
                    break;
                default: // Other
                    messageBox.innerHTML = "Other error: " + response;
            }
        };

        // How to deal with error
        request.onerror = function() {
            messageBox.innerHTML = "XMLHttp Error";
        };

        request

        // Send request
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(dataJSON);
    });

});