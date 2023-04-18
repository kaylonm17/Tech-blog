async function newFormHandler(event) {
    event.preventDefault();
   
    const date_created = document.querySelector('input[name="date_created"]').value;
    const places_visited = document.querySelector('input[name="places_visited"]').value;
    const daily_notes = document.querySelector('input[name="daily_notes"]').value;
    const tech_id = document.querySelector('#tech-id').getAttribute('value');

    console.log(tech_id);
   
    const response = await fetch(`/api/add-daily-log`, {
      method: 'POST',
      body: JSON.stringify({date_created,places_visited,daily_notes, tech_id}),
      headers: {'Content-Type': 'application/json'}
    });
   
    if (response.ok) {
      document.location.replace(`/api/tech-details/${tech_id}`);
    } else {
      alert(response.statusText);
    }
  }
   
  document.querySelector('.add-daily-form').addEventListener('submit', newFormHandler);
 
//  const cancelBtnEl = document.getElementById('cancel');
 
//  const cancel = (event) => {
//      event.preventDefault()
 
//      document.location.replace('/api/tech-details');
//  } 
 
//  cancelBtnEl.addEventListener('click', cancel);