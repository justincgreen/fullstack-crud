var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Fetch Todos
var fetchTodos = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, todos, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:5001/todos")];
            case 1:
                response = _a.sent();
                if (!response.ok)
                    throw new Error("Failed to fetch todos");
                return [4 /*yield*/, response.json()];
            case 2:
                todos = _a.sent();
                displayTodos(todos);
                hideLoader();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Error fetching todos:", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var displayTodos = function (todos) {
    var todoList = document.querySelector('.todo-list');
    todoList.innerHTML = "";
    if (todos.length === 0) {
        todoList.innerHTML = "<p>No todos available. Add a new one!</p>";
        return;
    }
    todos.forEach(function (todo) {
        var todoItem = document.createElement("div");
        todoItem.innerHTML = "\n      <ul>\n        <li>".concat(todo.todo_item, "</li>\n        <li>").concat(todo.created_at, "</li>\n        <li>").concat(!!todo.is_complete, "</li>\n      </ul>\n    ");
        todoList.appendChild(todoItem);
    });
};
var hideLoader = function () {
    var loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = "none";
    }
};
var addTodo = function () { return __awaiter(_this, void 0, void 0, function () {
    var todoInput, todoValue, response, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                todoInput = document.querySelector('.add-todo-input');
                todoValue = todoInput.value.trim();
                if (!todoValue) {
                    alert("Please enter a todo item.");
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("/add-todo", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ todo_item: todoValue }),
                    })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                if (response.ok) {
                    alert("\u2705 Todo added: ".concat(data.todo.todo_item));
                    todoInput.value = ""; // Clear input field
                    fetchTodos(); // Reload todos to display the updated list
                }
                else {
                    alert("\u274C Error: ".concat(data.error));
                }
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error("Error adding todo:", error_2);
                alert("An error occurred while adding the todo.");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var deleteTodo = function () { return __awaiter(_this, void 0, void 0, function () {
    var deleteInput, deleteValue, response, data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                deleteInput = document.querySelector(".delete-todo-input");
                deleteValue = deleteInput.value.trim();
                if (!deleteValue) {
                    alert("Please enter a todo id");
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("http://localhost:5001/delete-todo/".concat(deleteValue), {
                        method: "DELETE"
                    })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                if (response.ok) {
                    alert(data.message || "Todo deleted successfully!");
                    deleteInput.value = ""; // Clear the input after successful deletion
                    fetchTodos();
                }
                else {
                    alert(data.error || "Failed to delete todo. Please try again.");
                }
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.error("Error deleting todo:", error_3);
                alert("An error occurred while deleting the todo.");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var deleteAllTodos = function () { return __awaiter(_this, void 0, void 0, function () {
    var btnDeleteAll, response, data, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                btnDeleteAll = document.querySelector(".btn-delete-all");
                if (!(confirm("Delete all todo items?") === true)) return [3 /*break*/, 6];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("http://localhost:5001/delete-all-todos", {
                        method: "DELETE",
                    })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                if (response.ok) {
                    alert(data.message || "All todos deleted successfully!");
                    console.log("All todos deleted successfully.");
                    fetchTodos();
                }
                else {
                    alert(data.error || "Failed to delete all todos. Please try again.");
                    console.error("Delete all error:", data.error);
                }
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.error("Error deleting all todos:", error_4);
                alert("An error occurred while deleting all todos.");
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                console.log("Delete all operation canceled.");
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
var updateTodo = function (id, updatedTask) { return __awaiter(_this, void 0, void 0, function () {
    var response, data, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:5001/todos/".concat(id), {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ todo_item: updatedTask }),
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                if (response.ok) {
                    alert(data.message);
                    fetchTodos(); // Refresh the UI
                }
                else {
                    alert(data.error);
                }
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.error("Error updating todo:", error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
fetchTodos();
window.addTodo = addTodo; // expose function globally, so FE can call
window.deleteTodo = deleteTodo;
window.deleteAllTodos = deleteAllTodos;
window.updateTodo = updateTodo;
