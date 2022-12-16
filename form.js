import {
  DEFAULT_PAGE_COUNT,
  API_URL,
  showToast,
  clearInputs,
  gatherFormData,
} from "./utility.js";
const formButton = document.getElementById("btn-add-product");
const todoForm = document.getElementById("create-todo");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

if (id !== null) {
  //   console.log(id);
  formButton.innerText = "save";
  readProduct(id);
  todoForm.addEventListener("submit", function () {
    editTodo(id);
  });
} else {
  //   console.log("null");
  formButton.innerText = "add";
  todoForm.addEventListener("submit", createNewTodo);
}

async function createNewTodo() {
  event.preventDefault();
  let newTodo = gatherFormData();
  try {
    const res = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...newTodo,
        createdAt: new Date(),
        updatedAt: new Date(),
        checked: false,
      }),
    });
    showToast("Successfully create a new todo", "green");
    clearInputs();
  } catch (error) {
    showToast("Problem occured while creating new todo");
    console.log(error.message);
  }
}

export async function readProduct(id) {
  try {
    const res = await fetch(`${API_URL}/todos/${id}`);
    const data = await res.json();
    document.getElementById("Title").value = data.title;
    document.getElementById("Description").value = data.description;
    document.getElementById("DueDate").value = data.dueDate;
  } catch (error) {
    showToast("Problem occured while reading todo");
    console.log(error.message);
  }
}

async function editTodo(id) {
  event.preventDefault();
  console.log(id);
  let editedTodo = gatherFormData();
  try {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...editedTodo,
        updatedAt: new Date(),
      }),
    });
    showToast("Successfully edit todo", "green");
    clearInputs();
  } catch (error) {
    showToast("Problem occured while editing todo");
    console.log(error.message);
  }
}
