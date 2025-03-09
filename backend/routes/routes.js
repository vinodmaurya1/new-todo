const express = require("express");
const { getTodos,getTodoById, addTodo, updateTodo, deleteTodo, searchTodo } = require("../controller/todoController");
const router = express.Router();

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", addTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.get("/search/:title", searchTodo);

module.exports = router;