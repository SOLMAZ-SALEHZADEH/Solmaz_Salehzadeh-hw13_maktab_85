import {
  DEFAULT_PAGE_COUNT,
  API_URL,
  showToast,
} from "./utility.js";
let currentPage = 1;
const todosTable = document.querySelector("#todosTable");
export const todoDeletModal = document.querySelector("#deleteModal");
let todosList = [];
export async function readProducts() {
  todosTable.innerHTML = "";
  try {
    const res = await fetch(`${API_URL}/todos`);
    const data = await res.json();
    todosList = data;
    createPagination(data.length);
    console.log(data);
  } catch (error) {
    showToast("Problem occured while reading products!");
    console.log(error.message);
  }
}
document.addEventListener("DOMContentLoaded", async() => {
  await readProducts();
  const todos = todosList.slice(currentPage * 10 - 10, currentPage * 10);
  todos.map((todo) => addToDOM(todo));
});

function addToDOM(todo) {
  const todoContainer = document.createElement("div");
  todoContainer.dataset.id = todo.id;
  todosTable.appendChild(generateTodoCard(todo));
}

function generateTodoCard(todo) {
  const todoCard = document.createElement("div");
  todoCard.className =
    "py-3 px-3 col-md-6 col-12 rounded border-1 d-block m-auto border border-secondary mb-3 todoWrapper";

  const todoHeader = document.createElement("div");
  todoHeader.className = "d-flex justify-content-between";

  const todoHeaderFirstPart = document.createElement("div");
  todoHeaderFirstPart.className = "d-flex align-items-baseline gap-3";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const todoHeaderInfoContainer = document.createElement("div");
  todoHeaderInfoContainer.className =
    "d-flex flex-row gap-2 flex-wrap align-items-baseline";

  const todoTitle = document.createElement("p");
  todoTitle.innerText = todo.title;

  const todoDueDate = document.createElement("span");
  todoDueDate.innerText = todo.dueDate;

  todoHeaderInfoContainer.append(todoTitle);
  todoHeaderInfoContainer.append(todoDueDate);

  todoHeaderFirstPart.append(checkbox);
  todoHeaderFirstPart.append(todoHeaderInfoContainer);

  const todoHeaderSecondPart = document.createElement("div");

  const editButton = document.createElement("a");
  editButton.dataset.id = todo.id;
  editButton.innerHTML = '<i class="bi bi-pencil-fill text-primary"></i>';
  editButton.title = "UPDATE";
  editButton.className = "btn btn-sm m-1 text-white";
  editButton.href = `./form.html?id=${todo.id}`;

  const deleteButton = document.createElement("button");
  deleteButton.dataset.id = todo.id;
  deleteButton.innerHTML = '<i class="bi bi-trash-fill text-danger"></i>';
  deleteButton.title = "DELETE";
  deleteButton.className = "btn btn-sm m-1 text-white";
  deleteButton.dataset.bsToggle = "modal";
  deleteButton.dataset.bsTarget = "#deleteModal";
  deleteButton.addEventListener("click", () => deleteTodo(todo));

  todoHeaderSecondPart.append(editButton);
  todoHeaderSecondPart.append(deleteButton);

  todoHeader.append(todoHeaderFirstPart);
  todoHeader.append(todoHeaderSecondPart);

  const todoDescription = document.createElement("p");
  todoDescription.innerText = todo.description;

  todoCard.append(todoHeader);
  todoCard.append(todoDescription);
  return todoCard;
}

function deleteTodo(todo) {
  todoDeletModal.querySelector("#deleteModalTodoTitle").innerText = todo.title;
  todoDeletModal.querySelector("#deleteModalDueDate").innerText = todo.dueDate;
  document.getElementById("confirm-delete-btn").dataset.id = todo.id;
}

document
  .querySelector("#confirm-delete-btn")
  .addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    deleteSelectedTodo(id);
  });

  export async function deleteSelectedTodo(todoId) {
    try {
      const res = await fetch(`${API_URL}/todos/${todoId}`, {
        method: "DELETE",
      });
      // const data = await res.json();
      showToast("Successfully Deleted");
      await readProducts();
      const todos = todosList.slice(currentPage * 10 - 10, currentPage * 10);
      todos.map((todo) => addToDOM(todo));
    } catch (error) {
      showToast("Problem occured deleting the product!");
      console.log(error.message);
    }
  }

    document.querySelector("ul.pagination").addEventListener("click", (event) => {
      const lis = document.querySelectorAll(".page-item");
      lis.forEach((li) => li.classList.remove("active"));
      event.target.parentElement.classList.add("active");
      currentPage = Number(event.target.innerText);
      document.getElementById("todosTable").innerHTML=""
      const todos = todosList.slice(currentPage * 10 - 10, currentPage * 10);
      todos.map((todo) => addToDOM(todo));
    });

  export function createPagination(todosCount) {
    const pageCount = Math.ceil(todosCount / DEFAULT_PAGE_COUNT);
    let lis = "";
    for (let i = 1; i <= pageCount; i++) {
      lis += `<li class="page-item ${
        i === currentPage ? "active" : ""
      }"><a href="#" class="page-link">${i}</a></li>`;
    }
    document.querySelector("ul.pagination").innerHTML = lis;
  }
