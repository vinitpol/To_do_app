var todoList = []
var comdoList = [];
var remList = [];
var addButton = document.getElementById("add-button")
var todoInput = document.getElementById("todo-input")
var deleteAllButton = document.getElementById("delete-all")
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected")


//event listners for add and delete
addButton.addEventListener("click", add)
deleteAllButton.addEventListener("click", deleteAll)
deleteSButton.addEventListener("click", deleteS)

// Below code added for cokies and local storage 
function saveToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function loadFromLocalStorage() {
    const savedTodos = localStorage.getItem('todoList');
    if (savedTodos) {
        todoList = JSON.parse(savedTodos);
        update();
        addinmain(todoList);
    }
}


//event listeners for filtersk
document.addEventListener('click', (e) => {
    if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
        completeTodo(e);
    }
    if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
        deleteTodo(e)
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

})
//event listner for enter key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});


//updates the all the remaining, completed and main list
function update() {
    comdoList = todoList.filter((ele) => {
        return ele.complete

    })
    remList = todoList.filter((ele) => {
        return !ele.complete
    })
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
    var value = todoInput.value;
    if (value === '') {
        alert("😮 Task cannot be empty")
        return;
    }

    const now = new Date();
    // Format date as "DD Month YYYY"
    const dateString = now.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    todoList.push({
        task: value,
        id: Date.now().toString(),
        complete: false,
        date: dateString,
        time: timeString
    });

    todoInput.value = "";
    update();
    addinmain(todoList);
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
    allTodos.innerHTML = ""
    todoList.forEach(element => {
        var x = `<li id=${element.id} class="todo-item">
            <div>
                <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
                <small class="text-gray-500">
                    Added on ${element.date} at ${element.time}
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
        </li>`
        allTodos.innerHTML += x
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
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    todoList = todoList.filter((ele) => {
        return ele.id != deleted
    })

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
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    todoList.forEach((obj) => {
        if (obj.id == completed) {
            if (obj.complete == false) {
                obj.complete = true
                e.target.parentElement.parentElement.querySelector("#task").classList.add("line");
            } else {
                obj.complete = false
                e.target.parentElement.parentElement.querySelector("#task").classList.remove("line");
            }
        }
    })

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
    todoList = []
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

// Modify deleteS function
function deleteS(todo) {
    todoList = todoList.filter((ele) => {
        return !ele.complete;
    })
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
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);



// mobile media_query to set vh unit
function setMobileHeight() {
    // First we get the viewport height and multiply it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// We listen to the resize event
window.addEventListener('resize', setMobileHeight);
window.addEventListener('orientationchange', setMobileHeight);
// Initial call
setMobileHeight();

