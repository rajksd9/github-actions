const { handler } = require('../src/lambda');
const { addTodo, listTodos, deleteTodo } = require('../src/todoManager');

describe('Todo Lambda', () => {

  it('create a new todo', async () => {
    const event = {
      httpMethod: 'POST',
      path: '/todos',
      body: JSON.stringify({ task: 'Test TODO' })
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(201);
    const responseBody = JSON.parse(response.body);
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.task).toBe('Test TODO');
  });

  it('get a todo by ID', async () => {
    const todo = addTodo('Another TODO');

    const event = {
      httpMethod: 'GET',
      path: `/todos/${todo.id}`,
      pathParameters: { id: todo.id.toString() }
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody).toHaveProperty('id', todo.id);
    expect(responseBody.task).toBe('Another TODO');
  });

  it('delete a todo by ID', async () => {
    const todo = addTodo('TODO to delete');

    const deleteEvent = {
      httpMethod: 'DELETE',
      path: `/todos/${todo.id}`,
      pathParameters: { id: todo.id.toString() }
    };

    const deleteResponse = await handler(deleteEvent);
    expect(deleteResponse.statusCode).toBe(204);

    const getEvent = {
      httpMethod: 'GET',
      path: `/todos/${todo.id}`,
      pathParameters: { id: todo.id.toString() }
    };

    const getResponse = await handler(getEvent);
    expect(getResponse.statusCode).toBe(404);
  });

  it('list all todos', async () => {
    addTodo('TODO 1');
    addTodo('TODO 2');

    const event = {
      httpMethod: 'GET',
      path: '/todos'
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.length).toBe(4);  // Assuming there were already 2 existing todos
    expect(responseBody[2].task).toBe('TODO 1');
    expect(responseBody[3].task).toBe('TODO 2');
  });

});
