function handleSubmit(event) {
  event.preventDefault()

  let formText = document.getElementById('url').value

  if(Client.urlChecker(formText)) {

  postData('http://localhost:5000/api', {url: formText})

  .then(function(res) {
      document.getElementById('polarity').innerHTML = 'Polarity: '+polarityChecker(res.score_tag);
      document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
      document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
  })
  } else {
      alert('Enter a valid URL.');
  }
}

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'cors',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  });
  try {
      const Data = await response.json();
      return Data;
  } catch (error) {
      console.log('error', error);
  }
};

function polarityChecker(score) {
  let result;
  switch (score) {
      case 'P': result = 'positive'; break;
      case 'N': result = 'negative'; break;
      default: result = 'unknown'; break;
  }
  return result.toUpperCase();  
}

export { handleSubmit }
export { polarityChecker }