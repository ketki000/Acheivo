function signup() {
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  //Validating name
  if (!/^[a-zA-Z]+[^@#]*$/.test(name)) {
    alert(
      "Name should only contain alphabets!Should not contain special characters @ or #"
    );
  } else if (name === "") {
    alert("Name field cannot be empty!");
  }

  //Validating age
  if (/\D/.test(age)) {
    alert("Age should only contain digits!");
  } else if (parseInt(age) <= 18) {
    alert("Age should be greater than 18!");
  }

  // Validating email
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email address");
    return false;
  }

  // Validating password
  let passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,}).+$/;
  if (!passwordRegex.test(password)) {
    alert("Invalid password");
    return false;
  }

  // Check if user already exists in local storage
  let users = JSON.parse(localStorage.getItem("users")) || [];
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      alert("Email address already in use");
      return false;
    }
  }
  window.location.href = "login.html";

  // Create user object and store in local storage
  let user = {
    name: name,
    age: age,
    email: email,
    password: password,
    tasks: [],
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful");
  
  return true;
}
