/* Global Variables */

// const { url } = require("inspector");

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&appid=9fcb4c6787fe8d00ea843e0341091c98';


// Event listener to add function to existing HTML DOM element
const genBtn = document.getElementById('generate');
genBtn.addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    e.preventDefault();
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zipCode, apiKey)
        .then((data) => {
            console.log(data);
            postData('/add', {
                date: newDate,
                temp: data.main.temp,
                content: feelings,
            })

        }).
    then(
        updateUi()
    )
};

/* Function to GET Web API Data*/
const getWeather = async(baseURL, code, key) => {
    const response = await fetch(baseURL + code + key);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('Error', error);
    }
}

/* Function to POST data */
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('Error', error);
    }
}

// Update user interface
const updateUi = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date : ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature : ${allData.temp}`;
        document.getElementById('content').innerHTML = `Feelings : ${allData.content}`;
    } catch (error) {
        console.log('Error ', error);
    }
}

/* Function to GET Project Data */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();