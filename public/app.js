const apiKey = '49a78f0e48491919127f480cf9e77b6a'; 

let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear(); 
const generateBtn = document.getElementById('generate'); 

generateBtn.addEventListener('click', async () => {
    const zip = document.getElementById('zip').value; 
    const feelings = document.getElementById('feelings').value; 

    console.log(zip); 

    const weatherData = await getWeather(zip);

    await postData('http://localhost:8000/add', {
        temp: weatherData.main.temp,
        date: newDate, 
        userResponse: feelings 
    });

    retrieveData();
});

const getWeather = async (zip) => {

    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`);
    try {

        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();

        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

const retrieveData  = async () => {

    const req = await fetch('http://localhost:8000/all'); 
    try {
        const allData = await req.json(); 
        console.log(allData); 
        
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature : ${Math.round(allData.temp) + ' degrees'}`;
        document.getElementById('content').innerHTML = `Feeling : ${allData.userResponse}`;
    } catch (error) {
        console.log("error", error);
    }
};
