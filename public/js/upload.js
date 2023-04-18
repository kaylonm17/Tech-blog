const imageFormHandler = async (event) => {
    event.preventDefault();

const inputEL = document.querySelector('input[name="image"]').value


const response = await fetch(`/api/tech-details/5`, {
    method: 'POST',
    body: JSON.stringify({inputEL}),
    headers: {'Content-Type': 'application/json'}
  });

  response.render()
}