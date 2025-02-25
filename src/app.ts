import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import db from "./db"; // Import the database connection

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
const PORT = 5001;

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Root route
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Get all todos
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM todos");
    res.json(rows);
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add todo
app.post("/add-todo", async (req: Request , res: Response): Promise<any> => {
  const { todo_item } = req.body;

  if(!todo_item || typeof todo_item !== "string") {
    return res.status(400).json({ error: "Invalid 'todo_item' Provided" });
  }

  try {    
    const [result] = await db.execute(
      "INSERT INTO todos (todo_item) VALUES (?)",[todo_item]
    );
    const insertId = (result as any).insertId;

    return res.status(201).json({
      message: "Todo added successfully",
      todo: { todo_id: insertId, todo_item, is_complete: 0 }
    });
  } catch (error) {
    console.error("Failed to add todo:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete todo
app.delete("/delete-todo/:id", async(req:Request, res:Response): Promise<any> => {
  const { id } = req.params;
  if(!id) return res.status(400).json({ error: "Invalid todo_id Provided" });

  try {
    const [result]:any = await db.execute("DELETE FROM todos WHERE todo_id = ?", [id]);
    if(result.affectedRows === 0) return res.status(404).json({ error: "Todo not found" });
    
    return res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (error) {
    console.error("Failed to delete todo:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete ALL todos
app.delete("/delete-all-todos", async(req: Request, res:Response): Promise<any> => {
  try {
    const [result]:any = await db.execute("TRUNCATE TABLE todos");
    
    return res.status(200).json({ message: "All todos deleted successfully!" });
  } catch (error) {
    console.error("Failed to delete todos:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Edit todo
app.put("/todos/:id", async(req: Request, res:Response):Promise<any> => {
  const { id } = req.params;
  const { todo_item } = req.body;

  if (!id || todo_item === undefined) {
    return res.status(400).json({ error: "Provide todo_item for a full update." });
  }

  try {
    const [result]: any = await db.execute(
      "UPDATE todos SET todo_item = ? WHERE todo_id = ?", [todo_item, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Todo not found or no changes made." });
    }

    return res.status(200).json({ message: "Todo fully updated successfully." });
  } catch (error) {
    console.error("Failed to update todo:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});