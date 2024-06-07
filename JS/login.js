function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

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
  let users = JSON.parse(localStorage.getItem("users"));
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      location.href = "dashboard.html";

      let primaryKey = { emailKey: email };
      localStorage.setItem("primaryKey", JSON.stringify(primaryKey));

      alert("Login successful");
    }
  }

  return true;
}
