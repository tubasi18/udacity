import { deleteTrip } from './api';
/**
 * Updates the UI with the current list of trips.
 * Fetches trip data from the server and dynamically updates the HTML.
 */
const updateUI = async () => {
  try {
    let response = await fetch('http://localhost:1000/trip');
    let data = await response.json();

    document.querySelector('#results').innerHTML = ""; // Clear previous results

    data.forEach((trip, index) => {
      // Create a new div for each trip and add it to the results container
      document.querySelector('#results').innerHTML += `
        <div class="trip">
          <button class="delete-btn" title="Delete this trip">X</button>
          <div class="photo">
            <img src="${trip.image}" alt="Trip photo"/>
          </div>

          <div class="info">
            <p><strong>Destination:</strong> ${trip.name}</p>
            <p><strong>Departing:</strong> ${trip.date}</p>
            <p><strong>Typical weather for then is:</strong></p>
            <p><strong>High:</strong> <span class="high">${trip.high}</span></p>
            <p><strong>Low:</strong> <span class="low">${trip.low}</span></p>
          </div>
        </div>
      `;
    });

    document.querySelectorAll('.delete-btn').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        deleteTrip('http://localhost:1000', index);
      });
    });

  } catch (e) {
    console.error('Error updating UI:', e);
  }
};

export { updateUI };
