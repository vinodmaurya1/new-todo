const Todo = require("../model/todoModel");

const getTodos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || ""; // Get search query
    const skip = (page - 1) * limit;

    // Search filter
    const searchFilter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // Fetch todos based on search and pagination
    const todos = await Todo.find(searchFilter).skip(skip).limit(limit);
    const totalTodos = await Todo.countDocuments(searchFilter);


    res.json({
      status: true,
      message: "Todos fetched successfully",
      data: todos,
      pagination: {
        total: totalTodos,
        page,
        limit,
        totalPages: Math.ceil(totalTodos / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch todos",
      error: error.message,
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json({ status: true, message: "Fetched todo", data: todo });
  } catch (error) {
    res
      .status(500)
      .json({
        status: false,
        message: "Failed to fetch todos",
        error: error.message,
      });
  }
};

const addTodo = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ status: false, message: "Please enter all required fields" });
    }

    // Find last inserted title with the same base title
    const lastTodo = await Todo.findOne({
      title: new RegExp(`^${title}-\\d+$`, "i"),
    }).sort({ createdAt: -1 });

    let newTitle = title;
    if (lastTodo) {
      const match = lastTodo.title.match(/-(\d+)$/);
      const lastNumber = match ? parseInt(match[1], 10) : 0;
      newTitle = `${title}-${lastNumber + 1}`;
    } else {
      newTitle = `${title}-1`;
    }

    const newTodo = new Todo({ title: newTitle, content });
    await newTodo.save();

    res.json({
      status: true,
      message: "Todo added successfully",
      data: newTodo,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        status: false,
        message: "Failed to add todo",
        error: error.message,
      });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      res
        .status(400)
        .json({ status: false, message: "Please enter all required fields" });
    }
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ status: false, message: "Todo not found" });
    }
    res.json({
      status: true,
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        status: false,
        message: "Failed to update todo",
        error: error.message,
      });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ status: false, message: "Todo not found" });
    }
    res.json({ status: true, message: "Todo deleted" });
  } catch (error) {
    res
      .status(500)
      .json({
        status: false,
        message: "Failed to delete todo",
        error: error.message,
      });
  }
};

const searchTodo = async (req, res) => {
  try {
    const title = req.params.title;
    if (!title) {
      return res
        .status(400)
        .json({ status: false, message: "Please provide a title to search" });
    }

    console.log(title);

    const todos = await Todo.find({ title: new RegExp(title, "i") }); // Case-insensitive search for title

    if (todos.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "No matching todos found" });
    }

    res.json({ status: true, data: todos });
  } catch (error) {
    res
      .status(500)
      .json({
        status: false,
        message: "Failed to fetch todos",
        error: error.message,
      });
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
  searchTodo,
};
