// Function to handle form submission
function submitForm() {
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked').value;
    const topics = Array.from(document.querySelectorAll('input[name="topics"]:checked')).map(topic => topic.value);
    const phone = document.getElementById("phone").value;

    // Create an object to store the data
    const formData = {
        name,
        email,
        message,
        contactMethod,
        topics,
        phone
    };

    // Save data to local storage
    localStorage.setItem("contactFormData", JSON.stringify(formData));
    alert("Form submitted successfully!");
}

// Function to clear the form
function clearForm() {
    document.getElementById("contactForm").reset();
    localStorage.removeItem("contactFormData");
    alert("Form has been cleared!");
}