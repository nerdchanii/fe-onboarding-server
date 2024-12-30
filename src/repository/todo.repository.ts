import fs from "fs";
import { Todo } from "../model/todo.model";

export class TodoRepository {
  private readonly fileName = "todos.json";
  static isntatnce: TodoRepository;
  constructor() {
    if (!fs.existsSync(this.fileName)) {
      fs.writeFileSync(this.fileName, "[]");
    }
  }

  public async save(todos: Todo[]): Promise<boolean> {
    fs.writeFileSync(this.fileName, JSON.stringify(todos));
    return true;
  }

  public async create(
    todo: Omit<Todo, "id" | "created_at" | "updated_at">
  ): Promise<Todo> {
    const todos = await this.getTodos();
    const newTodo = {
      ...todo,
      id: todos.length + 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    todos.push(newTodo);
    await this.save(todos);
    return newTodo;
  }

  public async getTodos(): Promise<Todo[]> {
    if (!fs.existsSync(this.fileName)) {
      return [];
    }
    const todos = fs.readFileSync(this.fileName, "utf-8");
    return JSON.parse(todos) as Todo[];
  }

  public async add(todo: Todo): Promise<void> {
    const todos = await this.getTodos();
    todos.push(todo);
    await this.save(todos);
  }

  public async delete(todoId: number): Promise<void> {
    const todos = await this.getTodos();
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    await this.save(newTodos);
  }

  public async update(oldTodo: Todo, newTodo: Todo): Promise<Todo> {
    const todos = await this.getTodos();
    todos.reduce((acc, todo) => {
      if (todo.id === oldTodo.id) acc.push(newTodo);
      else acc.push(todo);
      return acc;
    }, [] as Todo[]);
    await this.save(todos);
    return newTodo;
  }

  public async clear(): Promise<void> {
    await this.save([]);
  }

  public async getById(index: number): Promise<Todo> {
    const todos = await this.getTodos();
    const todo = todos.find((todo) => todo.id === index);
    if (todo) {
      return todo;
    }
    throw new Error("Todo not found");
  }

  public async length(): Promise<number> {
    const todos = await this.getTodos();
    return todos.length;
  }

  public getAll(): Promise<Todo[]> {
    return this.getTodos();
  }
}
