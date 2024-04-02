// Function to show the form container and hide the "Create" button
function showFormContainer() {
    document.getElementById("createFormContainer").style.display = "block"
    document.getElementById("createButton").style.display = "none";
}

// Function to hide the form container and show the "Create" button
function hideFormContainer() {
    document.getElementById("createFormContainer").style.display = "none";
    document.getElementById("createButton").style.display = "block";
}

// Attach event listener to the create button
document.getElementById("createButton").addEventListener("click", function(event) {
    showFormContainer(); // Show the form container and hide the "Create" button
    document.getElementById("messageBox").style.display = "none"; // Hide the message box if it's visible
});

// Add event liistener to the form submission
document.getElementById("submitForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the form data
    const formData = new FormData(event.target);

    // Convert form data to JSON object
    const jsonData = {}
    formData.forEach((value, key) => {
        jsonData[key] = value;
    })

    // Send the form data to the backend server
    fetch('http://localhost:3000/submit-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (response.ok) {
            // Show the message box with the success message
            document.getElementById("messageText").innerText = 'Text and password submitted and saved to the database';
            document.getElementById("messageBox").style.display = "block";

            // Clear the form fields
            document.getElementById("textInput").value = '';
            document.getElementById("passwordInput").value = '';

            // Hide the form container and show the "Create" button
            hideFormContainer();
        } else {
            // Show the message box with the error message
            document.getElementById("messageText").innerText = 'Error submitting text and password';
            document.getElementById("messageBox").style.display = "block";
        }
    })
    .catch(error => {
        console.error('Error:', error)
        // Show the message box with the error message
        document.getElementById("messageText").innerText = 'Error submitting text and password';
        document.getElementById("messageBox").style.display = "block";
    })
})

// Add event listener to the cancel button
document.getElementById("cancelButton").addEventListener("click", function(event) {
    // Hide the form container and show the "Create" button
    hideFormContainer()
})