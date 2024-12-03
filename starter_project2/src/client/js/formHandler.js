// Replace checkForName with a function that checks the URL
import { isValid } from './urlChecker'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = '/api'

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const articleUrl = document.getElementById('name');
    
    // Check if the URL is valid
    if(isValid(articleUrl.value)){
        // If the URL is valid, send it to the server using the serverURL constant above
        analyzeData(serverURL, articleUrl.value);
    } else {
        alert('Please enter a valid URL!');
        articleUrl.value= '';
    }
}

// Function to get the polarity
function getPolarity(polarity){
    if(polarity == 'AGREEMENT'){
        return 'Positive';
    } else {
        return 'Negative';
    }
}

// Function to send data to the server
const analyzeData = async (url, data)=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'text/plain',
        },
        // Body data type must match "Content-Type" header        
        body: data
    });
    
    try {
        const newData = await response.json();
        const result= document.getElementById('results');
        const polarity= getPolarity(newData.agreement);

        if(newData.status.code == '0'){
            const results= `Polarity: ${polarity}
            Subjectivity: ${newData.subjectivity}
            Snippet from the article: ${newData.sentence_list[0].text}`
            result.innerHTML= JSON.stringify(results, null, 2);
        } else {
            result.innerHTML= JSON.stringify(newData.status.msg);
        }
        //return result;
    }catch(error) {
        console.log("error", error);
    }
}

// Export the handleSubmit function
export { handleSubmit };

// Export handleSubimt function for testing
module.exports = getPolarity;
module.exports = {
    testEnvironment: 'jsdom', // Ensures jsdom is used as the test environment
};