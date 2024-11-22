// Function to collect form data and save it to local storage
function saveFormData() {
    var formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        contactMethod: document.querySelector('input[name="contact-method"]:checked').value
    };

    // Convert formData object to JSON string
    var formDataJSON = JSON.stringify(formData);

    // Store JSON string in local storage
    localStorage.setItem('contactFormData', formDataJSON);

    // Display a success message (can be customized)
    alert('Form submitted successfully!');
}

// Clear form data from local storage
function clearFormData() {
    localStorage.removeItem('contactFormData');
}

// Function to validate form
function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    if (name === "" || email === "" || phone === "" || subject === "" || message === "") {
        document.getElementById('error-message').style.display = "block";
        return false;
    }
    // Save form data to local storage if validation is successful
    saveFormData();
    return true;
}