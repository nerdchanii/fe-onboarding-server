import { Response, Request } from "express";
import { Todo } from "../model/todo.model";
import { TodoRepository } from "../repository/todo.repository";

export const getTodos = async (req: Request, res: Response) => {
  const repo = new TodoRepository();
  const todos = await repo.getAll();
  console.log(todos);
  res.status(200).json({ todos });
};

export const createTodo = async (req: Request, res: Response) => {
  const repo = new TodoRepository();
  const todo: Todo = req.body;

  await repo.create(todo);

  res.status(201).json({ message: "Todo created" });
};

export const updateTodo = async (req: Request, res: Response) => {
  const reqId = Number(req.params.id);
  const repo = new TodoRepository();
  const todo: Todo = req.body;

  const oldTodo = await repo.getById(reqId);
  const newtodo = repo.update(oldTodo, { ...oldTodo, ...todo });

  res.status(200).json(newtodo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const reqId = Number(req.params.id);
  const repo = new TodoRepository();

  await repo.delete(reqId);

  res.status(204).json({ message: "Todo deleted" });
};
