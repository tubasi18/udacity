import { addTrip } from './api';
import { updateUI } from './view';

/**
 * Handles the form submission by validating inputs, adding a trip, and updating the UI.
 */
const handleFormSubmission = () => {

  const submitButton = document.querySelector('#submit');

  submitButton.addEventListener('click', async e => {
    e.preventDefault();
    const place = document.querySelector('#place').value.trim();
    const date = document.querySelector('#date').value;

    if (!place.length > 0) {
      alert("Please enter a Place Name");
      return;
    }

    if (date.length === 0) {
      alert("Please enter a Date");
      return;
    }

    try {
      // Add the trip and update the UI
      await addTrip('http://localhost:1000', { place, date });
      await updateUI();
      clearText();

    } catch (e) {
      document.querySelector('#results').innerText = "Error , please try again.";
      console.log(e);
    }
  })
}
/**
 * Clears the form input fields.
 */
function clearText() {
  document.querySelector('#place').value = "";
  document.querySelector('#date').value = "";
}


export { handleFormSubmission, clearText };
