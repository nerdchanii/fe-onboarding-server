import express from "express";
import todoRoutes from "./routes/todo.routes";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.use("/api/v1/todos", todoRoutes);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
