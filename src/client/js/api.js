import { updateUI } from './view'



const addTrip = async (apiUrl, { place, date }) => {

  try {
    let response = await fetch(apiUrl + "/trip",
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ place, date })
      }
    );

  } catch (e) {
    console.log(e);
  }
}


const deleteTrip = async (apiUrl, index) => {
  let alert = confirm(`Are you sure do you want Delete this trip?`);

  if (alert === false) return;

  try {
    await fetch(apiUrl + "/trip",
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: index })
      }
    );
    await updateUI();
  } catch (e) {
    console.log(e);
  }
}

export { addTrip, deleteTrip };