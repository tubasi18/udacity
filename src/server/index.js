const dotenv = require('dotenv');
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const cors = require('cors');
const app = express()


app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('dist'))
dotenv.config();



const baseURL =  process.env.BASE_URL
const apiKey = process.env.API_KEY || "7288231e615d0702e476bd46764ecef2";
let userInput = [] 

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})


app.post('/api', async function(req, res) {
    userInput = req.body.url;
    const apiURL = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`
    const response = await fetch(apiURL)
    const Data = await response.json()
    res.send(Data)
})

app.listen(process.env.PORT, function () {
    console.log(`Example app listening on port ${process.env.PORT} !`)
})