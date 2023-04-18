const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

   if (email && password) {
  // this will call:
  //    controllers/api/user-routes.js
  // then, find the post route: "router.post('/login', async (req, res) => {"
  console.log("Gathering email and password to send to server.");
   const response = await fetch('/api/users/login', {
     method: 'POST',
     body: JSON.stringify({ email, password }),
     headers: { 'Content-Type': 'application/json' },
   });
   console.log("Response sent: ");
   console.log(response.body);

  // if successfully logged-in, send to: localhost:3001/dashboard
  if (response.ok) {
    console.log('Log in successful.');
    document.location.replace("/dashboard");
  } else {
    alert("Failed to log in.");
  }
  
console.log("Email: ", email, "Password: ", password);

 }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);