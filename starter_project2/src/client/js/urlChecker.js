// Function to check if the url is valid
function isValid(url) {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    // Check if the textarea is not empty
    if (url.trim() != '') {
        return regex.test(url);
    } else {
        return false;
    }  
}

export { isValid };

// Export isValid function for testing
module.exports = isValid;