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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db")); // Import the database connection
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 5001;
// Serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
// Root route
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
});
// Get all todos
app.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query("SELECT * FROM todos");
        res.json(rows);
    }
    catch (error) {
        console.error("Database query failed:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
// Add todo
app.post("/add-todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todo_item } = req.body;
    if (!todo_item || typeof todo_item !== "string") {
        return res.status(400).json({ error: "Invalid 'todo_item' Provided" });
    }
    try {
        const [result] = yield db_1.default.execute("INSERT INTO todos (todo_item) VALUES (?)", [todo_item]);
        const insertId = result.insertId;
        return res.status(201).json({
            message: "Todo added successfully",
            todo: { todo_id: insertId, todo_item, is_complete: 0 }
        });
    }
    catch (error) {
        console.error("Failed to add todo:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Delete todo
app.delete("/delete-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ error: "Invalid todo_id Provided" });
    try {
        const [result] = yield db_1.default.execute("DELETE FROM todos WHERE todo_id = ?", [id]);
        if (result.affectedRows === 0)
            return res.status(404).json({ error: "Todo not found" });
        return res.status(200).json({ message: "Todo deleted successfully!" });
    }
    catch (error) {
        console.error("Failed to delete todo:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Delete ALL todos
app.delete("/delete-all-todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield db_1.default.execute("TRUNCATE TABLE todos");
        return res.status(200).json({ message: "All todos deleted successfully!" });
    }
    catch (error) {
        console.error("Failed to delete todos:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Edit todo
app.put("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { todo_item } = req.body;
    if (!id || todo_item === undefined) {
        return res.status(400).json({ error: "Provide todo_item for a full update." });
    }
    try {
        const [result] = yield db_1.default.execute("UPDATE todos SET todo_item = ? WHERE todo_id = ?", [todo_item, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Todo not found or no changes made." });
        }
        return res.status(200).json({ message: "Todo fully updated successfully." });
    }
    catch (error) {
        console.error("Failed to update todo:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
