//retrieving primary key from local storage
const loggedEmailId = localStorage.getItem("primaryKey");
const emailKey = JSON.parse(loggedEmailId).emailKey;
if (!loggedEmailId) {
  window.location.href = "login.html";
}

//retreiving users object from local storage
let users = JSON.parse(localStorage.getItem("users"));

//finding the userobject corresponding to loggedEmailIn provided
const user = users.find((u) => u.email === emailKey);

//displaying welcome username
document.getElementById("username").textContent = user.name;

const form = document.querySelector("#form"); //form
const message = document.querySelector("#message"); //task input in text box
const table = document.querySelector("#table-display");

//finding index of userobject
for (let i = 0; i < users.length; i++) {
  if (emailKey == users[i].email) {
    indexOfUserObject = i;
  }
}

//displaying tasks in dynamic serial number and tabular format
function displayTasksInTable() {
  table.innerHTML = `
    <tr>
      <th>S.No.</th>
      <th>Task</th>
      <th>Status</th>
    </tr>
  `;
  user.tasks.forEach((task, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${task}</td>
      <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;
    table.appendChild(row);
  });
}
displayTasksInTable();

function addTask(event, preMessage = message) {
  event.preventDefault();
  const task = preMessage.value.trim();
  if (task !== "") {
    user.tasks.push(task);
    displayTasksInTable();
    message.value = ""; //initialised empty again for the new entry
  }
}


form.addEventListener("submit", addTask);

function deleteTask(event) {
  if (event.target.classList.contains("delete-btn")) {
    const index = event.target.dataset.index;
    user.tasks.splice(index, 1);
    displayTasksInTable();
  }
}
table.addEventListener("click", deleteTask);

// Logout button
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {

  localStorage.setItem("users", JSON.stringify(users));
  alert("tasks added in local storage");
  localStorage.removeItem("primaryKey");
  window.location.href = "login.html";
});
