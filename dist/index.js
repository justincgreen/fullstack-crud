"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Fetch Todos
const fetchTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("http://localhost:5001/todos");
        if (!response.ok)
            throw new Error("Failed to fetch todos");
        const todos = yield response.json();
        displayTodos(todos);
        hideLoader();
    }
    catch (error) {
        console.error("Error fetching todos:", error);
    }
});
const displayTodos = (todos) => {
    const todoList = document.querySelector('.todo-list');
    todoList.innerHTML = "";
    if (todos.length === 0) {
        todoList.innerHTML = "<p>No todos available. Add a new one!</p>";
        return;
    }
    todos.forEach((todo) => {
        const todoItem = document.createElement("div");
        todoItem.innerHTML = `
      <ul>
        <li>${todo.todo_item}</li>
        <li>${todo.created_at}</li>
        <li>${!!todo.is_complete}</li>
      </ul>
    `;
        todoList.appendChild(todoItem);
    });
};
const hideLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = "none";
    }
};
const addTodo = () => __awaiter(void 0, void 0, void 0, function* () {
    const todoInput = document.querySelector('.add-todo-input');
    const todoValue = todoInput.value.trim();
    if (!todoValue) {
        alert("Please enter a todo item.");
        return;
    }
    try {
        const response = yield fetch("/add-todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ todo_item: todoValue }),
        });
        const data = yield response.json();
        if (response.ok) {
            alert(`✅ Todo added: ${data.todo.todo_item}`);
            todoInput.value = ""; // Clear input field
            fetchTodos(); // Reload todos to display the updated list
        }
        else {
            alert(`❌ Error: ${data.error}`);
        }
    }
    catch (error) {
        console.error("Error adding todo:", error);
        alert("An error occurred while adding the todo.");
    }
});
const deleteTodo = () => __awaiter(void 0, void 0, void 0, function* () {
    const deleteInput = document.querySelector(".delete-todo-input");
    const deleteValue = deleteInput.value.trim();
    if (!deleteValue) {
        alert("Please enter a todo id");
        return;
    }
    try {
        const response = yield fetch(`http://localhost:5001/delete-todo/${deleteValue}`, {
            method: "DELETE"
        });
        const data = yield response.json();
        if (response.ok) {
            alert(data.message || "Todo deleted successfully!");
            deleteInput.value = ""; // Clear the input after successful deletion
            fetchTodos();
        }
        else {
            alert(data.error || "Failed to delete todo. Please try again.");
        }
    }
    catch (error) {
        console.error("Error deleting todo:", error);
        alert("An error occurred while deleting the todo.");
    }
});
const deleteAllTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    const btnDeleteAll = document.querySelector(".btn-delete-all");
    if (confirm("Delete all todo items?") === true) {
        try {
            const response = yield fetch("http://localhost:5001/delete-all-todos", {
                method: "DELETE",
            });
            const data = yield response.json();
            if (response.ok) {
                alert(data.message || "All todos deleted successfully!");
                console.log("All todos deleted successfully.");
                fetchTodos();
            }
            else {
                alert(data.error || "Failed to delete all todos. Please try again.");
                console.error("Delete all error:", data.error);
            }
        }
        catch (error) {
            console.error("Error deleting all todos:", error);
            alert("An error occurred while deleting all todos.");
        }
    }
    else {
        console.log("Delete all operation canceled.");
    }
});
const updateTodo = (id, updatedTask) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`http://localhost:5001/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ todo_item: updatedTask }),
        });
        const data = yield response.json();
        if (response.ok) {
            alert(data.message);
            fetchTodos(); // Refresh the UI
        }
        else {
            alert(data.error);
        }
    }
    catch (error) {
        console.error("Error updating todo:", error);
    }
});
fetchTodos();
window.addTodo = addTodo; // expose function globally, so FE can call
window.deleteTodo = deleteTodo;
window.deleteAllTodos = deleteAllTodos;
window.updateTodo = updateTodo;
