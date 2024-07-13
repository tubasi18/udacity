const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use(cors()); 
app.use(express.static('public')); 

let projectData = {};

app.get('/all', (req, res) => {
    res.send(projectData); 
});


app.post('/add', (req, res) => {
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        userResponse: req.body.userResponse,
    };
    res.send(projectData); 
});


const server = app.listen(8000, () => {
    console.log(`Server running on localhost:${8000}`); 
});
