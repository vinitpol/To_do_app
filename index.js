var todoList = [];
var comdoList = [];
var remList = [];
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");

//event listners for add and delete
addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteS);

// Below code added for cokies and local storage
function saveToLocalStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function loadFromLocalStorage() {
  const savedTodos = localStorage.getItem("todoList");
  if (savedTodos) {
    todoList = JSON.parse(savedTodos);
    update();
    addinmain(todoList);
  }
}

//event listeners for filtersk
document.addEventListener("click", (e) => {
  if (
    e.target.className.split(" ")[0] == "complete" ||
    e.target.className.split(" ")[0] == "ci"
  ) {
    completeTodo(e);
  }
  if (
    e.target.className.split(" ")[0] == "delete" ||
    e.target.className.split(" ")[0] == "di"
  ) {
    deleteTodo(e);
  }
  if (e.target.id == "all") {
    viewAll();
  }
  if (e.target.id == "rem") {
    viewRemaining();
  }
  if (e.target.id == "com") {
    viewCompleted();
  }
});

// Initial size settings
const initialHeight = todoInput.scrollHeight; // Get the initial height

//event listner for enter key
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.shiftKey) {
    return;
  } else if (e.key === "Enter") {
    e.preventDefault();
    add();
  }
});

// Adjust the rows of the textarea dynamically
todoInput.addEventListener("input", function () {
  this.style.height = "auto"; // Reset the height to auto so it shrinks back when necessary

  // Set height to fit content or reset to the initial height if content is short
  if (this.value.trim() === "") {
    this.style.height = initialHeight + "px"; // Reset to initial height when empty
  } else {
    this.style.height = this.scrollHeight + "px"; // Adjust height based on the scrollHeight
  }
});

//updates the all the remaining, completed and main list
function update() {
  comdoList = todoList.filter((ele) => {
    return ele.complete;
  });
  remList = todoList.filter((ele) => {
    return !ele.complete;
  });
  document.getElementById("r-count").innerText = todoList.length.toString();
  document.getElementById("c-count").innerText = comdoList.length.toString();
}

//adds the task in main list

// function add() {
//     var value = todoInput.value;
//     if (value === '') {
//         alert("😮 Task cannot be empty")
//         return;
//     }
//     todoList.push({
//         task: value,
//         id: Date.now().toString(),
//         complete: false,
//     });

//     todoInput.value = "";
//     update();
//     addinmain(todoList);
// }

// Modify your add() function

function add() {
  // Get the value from the input
  var value = todoInput.value.trim(); // Trim whitespace
  var dueDate = document.getElementById("dueDate").value; // Get due date input

  // Check if the input is empty or due date is not selected
  if (value === "" || dueDate === "") {
    alert("😮 Task and due date cannot be empty");
    return; // Exit the function if empty
  }

  // Create a new task object with the due date
  const newTask = {
    task: value,
    id: Date.now().toString(),
    complete: false,
    dueDate: new Date(dueDate).getTime(), // Store due date as timestamp
  };

  // Push the new task to the todoList
  todoList.push(newTask);

  // Clear the input field
  todoInput.value = "";
  document.getElementById("dueDate").value = ""; // Clear date input
  todoInput.style.height = initialHeight + "px"; // Reset height after adding

  // Update the UI
  update();
  addinmain(todoList);

  // Save the updated task list to local storage
  saveToLocalStorage();
}

//renders the main list and views on the main content

// function addinmain(todoList) {
//     allTodos.innerHTML = ""
//     todoList.forEach(element => {
//         var x = `<li id=${element.id} class="todo-item">
//     <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
//     <div class="todo-actions">
//                 <button class="complete btn btn-success">
//                     <i class=" ci bx bx-check bx-sm"></i>
//                 </button>

//                 <button class="delete btn btn-error" >
//                     <i class="di bx bx-trash bx-sm"></i>
//                 </button>
//             </div>
//         </li>`
//         allTodos.innerHTML += x
//     });
// }

function addinmain(todoList) {
  allTodos.innerHTML = "";
  todoList.forEach((element) => {
    var x = `<li id=${element.id} class="todo-item">
            <div>
                <p id="task"> ${
                  element.complete
                    ? `<strike>${element.task}</strike>`
                    : element.task
                } </p>
                <small class="text-gray-500">
                    Due on ${new Date(element.dueDate).toLocaleString()}
                </small>
            </div>
            <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class="ci bx bx-check bx-sm"></i>
                </button>

                <button class="delete btn btn-error" >
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`;
    allTodos.innerHTML += x;
  });
}

//deletes and indiviual task and update all the list
// function deleteTodo(e) {
//     var deleted = e.target.parentElement.parentElement.getAttribute('id');
//     todoList = todoList.filter((ele) => {
//         return ele.id != deleted
//     })

//     update();
//     addinmain(todoList);

// }

// Modify deleteTodo function
function deleteTodo(e) {
  var deleted = e.target.parentElement.parentElement.getAttribute("id");
  todoList = todoList.filter((ele) => {
    return ele.id != deleted;
  });

  update();
  addinmain(todoList);
  saveToLocalStorage(); // Save after deleting
}

//completes indiviaula task and updates all the list
// function completeTodo(e) {
//     var completed = e.target.parentElement.parentElement.getAttribute('id');
//     todoList.forEach((obj) => {
//         if (obj.id == completed) {
//             if (obj.complete == false) {
//                 obj.complete = true
//                 e.target.parentElement.parentElement.querySelector("#task").classList.add("line");
//             } else {
//                 obj.complete = false

//                 e.target.parentElement.parentElement.querySelector("#task").classList.remove("line");
//             }
//         }
//     })

//     update();
//     addinmain(todoList);
// }

// Modify completeTodo function
function completeTodo(e) {
  var completed = e.target.parentElement.parentElement.getAttribute("id");
  todoList.forEach((obj) => {
    if (obj.id == completed) {
      if (obj.complete == false) {
        obj.complete = true;
        e.target.parentElement.parentElement
          .querySelector("#task")
          .classList.add("line");
      } else {
        obj.complete = false;
        e.target.parentElement.parentElement
          .querySelector("#task")
          .classList.remove("line");
      }
    }
  });

  update();
  addinmain(todoList);
  saveToLocalStorage(); // Save after completing
}

//deletes all the tasks
// function deleteAll(todo) {

//     todoList = []

//     update();
//     addinmain(todoList);

// }

// Modify deleteAll function
function deleteAll(todo) {
  todoList = [];
  update();
  addinmain(todoList);
  saveToLocalStorage(); // Save after deleting all
}
//deletes only completed task
// function deleteS(todo) {

//     todoList = todoList.filter((ele) => {
//         return !ele.complete;
//     })

//     update();
//     addinmain(todoList);

// }

// Check every minute for tasks that are due
setInterval(() => {
  const now = Date.now();
  todoList.forEach((task) => {
    if (!task.complete && task.dueDate <= now) {
      notifyUser(task);
      task.complete = true; // Mark task as complete after notification
      update();
      addinmain(todoList);
      saveToLocalStorage();
    }
  });
}, 10000); // Check every 10 seconds instead of 60 seconds

// Function to notify user with sound and notification
function notifyUser(task) {
  // Play alarm sound
  var audio = new Audio("alarm.mp3");
  audio.play();

  // Check if the browser supports notifications
  if (Notification.permission === "granted") {
    // Show the notification
    new Notification(`Task Reminder: ${task.task}`, {
      body: `Your task is due!`,
      icon: "notification-icon.png", // Update the icon path if needed
    });
  } else if (Notification.permission !== "denied") {
    // Request permission for notifications
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(`Task Reminder: ${task.task}`, {
          body: `Your task is due!`,
          icon: "notification-icon.png",
        });
      }
    });
  }
}

// Modify deleteS function
function deleteS(todo) {
  todoList = todoList.filter((ele) => {
    return !ele.complete;
  });
  update();
  addinmain(todoList);
  saveToLocalStorage(); // Save after deleting selected
}

// functions for filters
function viewCompleted() {
  addinmain(comdoList);
}

function viewRemaining() {
  addinmain(remList);
}
function viewAll() {
  addinmain(todoList);
}

// code script to load saved todos when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  checkDueTasksImmediately(); // Run an immediate check for due tasks
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
});

function checkDueTasksImmediately() {
  const now = Date.now();
  todoList.forEach((task) => {
    if (!task.complete && task.dueDate <= now) {
      notifyUser(task);
      task.complete = true;
      update();
      addinmain(todoList);
      saveToLocalStorage();
    }
  });
}

// mobile media_query to set vh unit
function setMobileHeight() {
  // First we get the viewport height and multiply it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// We listen to the resize event
window.addEventListener("resize", setMobileHeight);
window.addEventListener("orientationchange", setMobileHeight);
// Initial call
setMobileHeight();
