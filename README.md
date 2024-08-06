# Travel App

## Overview
The Travel Planner App is a web application that allows users to plan their trips by entering a destination and departure date. The app fetches information about the destination, including images and weather details, and displays it to the user. Users can also delete trips from the list.

## Features
- Add a trip with a destination and departure date.
- Fetch and display destination images from Pixabay.
- Fetch and display weather data from Weatherbit.
- Display a list of planned trips with options to delete them.

## Technologies Used
- HTML
- CSS
- JavaScript
- Node.js
- Express
- Axios
- Webpack

## API Dependencies
- GeoNames API
- Pixabay API
- Weatherbit API

## Installation
1. **Clone the Repository**
    ```bash
    git clone https://github.com/tubasi18/udacity.git
    ```
    
2. **Navigate to the Project Directory**
    ```bash
    cd udacity
    ```

3. **Switch to the `FEND-Capstone---Travel-App` Branch**
    ```bash
    git checkout FEND-Capstone---Travel-App
    ```

4. **Install Dependencies**
    Install all the required dependencies using npm:
    ```bash
    npm install
    ```
## Running the Application

1. **Start the Development Server**
    Run the following command to start the development server:
    ```bash
    npm run build-dev
    ```
    This should compile your application and start the Webpack development server.

2. **Building for Production**
    To build the project for production, use:
    ```bash
    npm run build-prod
    ```
    This will create a `dist` folder with your production ready application.
3. **Start the server**
    ```bash
    npm run start
    ```
4. **Open your browser and go to**
    ```bash
    http://localhost:1000/
    ```
## Contributing
- If you would like to contribute to this project, please fork the repository and create a pull request with your changes.
