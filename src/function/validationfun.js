function validateEmail(email) {
    // Regular expression pattern for validating email addresses
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // Test the email address against the pattern
    return emailPattern.test(email);
}

function validatePassword(password) {
    // Regular expression pattern for validating passwords
    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{4,}$/;
    
    // Test the password against the pattern
    return passwordPattern.test(password);
}


module.exports={validateEmail,validatePassword};