# ToDo Server

## todo model
```ts
interface Todo {
        id: number;
        title: string;
        description: string;
        done: boolean;
        author: string;
        created_at: string;
        updated_at: string;
}
```


## endpoints

### GET /todos
- get all todos
- response
  - code
    - 200: success
    - 500: server error
  - bofdy
    - todos: array of todo
      ```ts
      Todo[]
      ```

### GET /todos/:id
- get a todo
- response
  - code
    - 200: success
    - 500: server error
  - body
  - todo: 조회된 todo
    ```ts
    interface Todo {
      id: number;
      title: string;
      description: string;
      done: boolean;
      author: string;
      created_at: string;
      updated_at: string;
    }
    ```



### POST /todos
- create a todo
- request
  - body
  ```ts
  Array<{
        title: string;
        description: string;
        done: boolean;
        author: string;
  }>
  ```

- response
  - code
    - 201: success
    - 500: server error
  - body
    - todo: 생성된 todo
    ```ts
      { todo: Todo }
    ```
### PUT /todos/:id
- update a todo
- request
  - body
    ```ts
    {
      id: number;
      title: string;
      description: string;
      done: boolean;
      author: string;
    }
    ```
- response
- code
  - 200: success
  - 500: server error
  - body
  - todo: 업데이트된 todo
    ```ts
    {todo: Todo}
    ```

### DELETE /todos/:id
- delete a todo
- response
  - code
    - 204: success
    - 500: server error
