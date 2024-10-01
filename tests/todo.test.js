const lambdaTester = require('lambda-tester');
const app = require('../src/app'); 

describe('Todo Lambda API', () => {

  it('should create a new todo', async () => {
    await lambdaTester(app.handler)
      .event({
        httpMethod: 'POST',
        path: '/todos',
        body: JSON.stringify({ task: 'Test TODO' })
      })
      .expectResolve((result) => {
        expect(result.statusCode).toBe(201);
        const responseBody = JSON.parse(result.body);
        expect(responseBody).toHaveProperty('id');
        expect(responseBody.task).toBe('Test TODO');
      });
  });

  it('should get a todo by ID', async () => {
    const postResult = await lambdaTester(app.handler)
      .event({
        httpMethod: 'POST',
        path: '/todos',
        body: JSON.stringify({ task: 'Another TODO' })
      })
      .expectResolve();

    const postResponseBody = JSON.parse(postResult.body);
    const todoId = postResponseBody.id;

    await lambdaTester(app.handler)
      .event({
        httpMethod: 'GET',
        path: `/todos/${todoId}`,
        pathParameters: { id: String(todoId) }
      })
      .expectResolve((result) => {
        expect(result.statusCode).toBe(200);
        const responseBody = JSON.parse(result.body);
        expect(responseBody).toHaveProperty('id', todoId);
        expect(responseBody.task).toBe('Another TODO');
      });
  });

  it('should delete a todo by ID', async () => {
    const postResult = await lambdaTester(app.handler)
      .event({
        httpMethod: 'POST',
        path: '/todos',
        body: JSON.stringify({ task: 'TODO to delete' })
      })
      .expectResolve();

    const postResponseBody = JSON.parse(postResult.body);
    const todoId = postResponseBody.id;

    await lambdaTester(app.handler)
      .event({
        httpMethod: 'DELETE',
        path: `/todos/${todoId}`,
        pathParameters: { id: String(todoId) }
      })
      .expectResolve((result) => {
        expect(result.statusCode).toBe(204);
      });

    await lambdaTester(app.handler)
      .event({
        httpMethod: 'GET',
        path: `/todos/${todoId}`,
        pathParameters: { id: String(todoId) }
      })
      .expectResolve((result) => {
        expect(result.statusCode).toBe(404);
      });
  });

  it('should list all todos', async () => {
    await lambdaTester(app.handler)
      .event({
        httpMethod: 'POST',
        path: '/todos',
        body: JSON.stringify({ task: 'TODO 1' })
      })
      .expectResolve();

    await lambdaTester(app.handler)
      .event({
        httpMethod: 'POST',
        path: '/todos',
        body: JSON.stringify({ task: 'TODO 2' })
      })
      .expectResolve();

    await lambdaTester(app.handler)
      .event({
        httpMethod: 'GET',
        path: '/todos'
      })
      .expectResolve((result) => {
        expect(result.statusCode).toBe(200);
        const responseBody = JSON.parse(result.body);
        expect(responseBody.length).toBeGreaterThanOrEqual(2); // Adjust based on previous test data
        expect(responseBody[responseBody.length - 2].task).toBe('TODO 1');
        expect(responseBody[responseBody.length - 1].task).toBe('TODO 2');
      });
  });

});
