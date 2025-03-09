const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());


async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/todoapp");
    console.log('DB connected');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}

connectToDatabase();


app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



