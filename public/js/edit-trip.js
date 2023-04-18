async function editFormHandler(event) {
   event.preventDefault();
  
   const title = document.querySelector('input[name="tech-title"]').value;
   const location = document.querySelector('input[name="location"]').value;
   const starting_date = document.querySelector('input[name="starting-date"]').value;
   const ending_date = document.querySelector('input[name="ending-date"]').value;
   const tech_description = document.querySelector('input[name="tech-description"]').value;
   const id = window.location.toString().split('/')[
     window.location.toString().split('/').length - 1
   ];
  

   const response = await fetch(`/api/tech/${id}`, {
     method: 'PUT',
     body: JSON.stringify({title,location,starting_date,ending_date,tech_description}),
     headers: {'Content-Type': 'application/json'}
   });
      
   if (response.ok) {
     document.location.replace('/dashboard');
   } else {
     alert(response.statusText);
   }
 }
  
 document.querySelector('.edit-tech-form').addEventListener('submit', editFormHandler);