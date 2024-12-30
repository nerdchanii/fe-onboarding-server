import express from "express";
import todoRoutes from "./routes/todo.routes";
import cors from "cors";
import bodyparser from "body-parser";
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.use("/api/v1/todos", todoRoutes);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
