import { Response, Request } from "express";
import { Todo } from "../model/todo.model";
import { TodoRepository } from "../repository/todo.repository";
import ERROR_MESSAGE from "../constants/ErrorMessage";

export const getTodos = async (req: Request, res: Response) => {
  const repo = new TodoRepository();
  try {
    const todos = await repo.getAll();
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGE.INTERNAL_SERVER });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  const repo = new TodoRepository();
  try {
    const reqId = Number(req.params.id);
    const todo = await repo.getById(reqId);
    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGE.INTERNAL_SERVER });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const repo = new TodoRepository();
  const todo: Todo = req.body;
  try {
    await repo.create(todo);
    res.status(201).json({ todo });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGE.INTERNAL_SERVER });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const reqId = Number(req.params.id);
  const repo = new TodoRepository();
  try {
    const todo: Todo = req.body;
    const oldTodo = await repo.getById(reqId);
    const newtodo = repo.update(oldTodo, { ...oldTodo, ...todo });
    res.status(200).json({ todo: newtodo });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGE.INTERNAL_SERVER });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const repo = new TodoRepository();
  try {
    const reqId = Number(req.params.id);
    await repo.delete(reqId);
    res.status(204).json({ message: `Todo[${req.params.id}] is deleted` });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGE.INTERNAL_SERVER });
  }
};
