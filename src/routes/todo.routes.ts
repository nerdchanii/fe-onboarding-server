import { Router } from "express";
import * as TodoController from "../controllers/todo.controller";
const router = Router();

router.get("/", TodoController.getTodos);
router.post("/", TodoController.createTodo);
router.get("/:id", TodoController.getTodo);
router.put("/:id", TodoController.updateTodo);
router.delete("/:id", TodoController.deleteTodo);

export default router;
