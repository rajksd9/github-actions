const request = require ('supertest');
const  app = require ('../src/app.js');

describe('Todo API', () => {
  it('should create a new todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ task: 'Test TODO' })
      .expect(201);
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.task).toBe('Test TODO');

  });

  it('should get a todo by ID', async () => {
    const postResponse = await request(app)
      .post('/todos')
      .send({ task: 'Another TODO' })
      .expect(201);

    const todoId = postResponse.body.id;

    const getResponse = await request(app)
      .get(`/todos/${todoId}`)
      .expect(200);
    
    expect(getResponse.body).toHaveProperty('id', todoId);
    expect(getResponse.body.task).toBe('Another TODO');
  });

  it('should delete a todo by ID', async () => {
    const postResponse = await request(app)
      .post('/todos')
      .send({ task: 'TODO to delete' })
      .expect(201);

    const todoId = postResponse.body.id;

    await request(app)
      .delete(`/todos/${todoId}`)
      .expect(204);

    await request(app)
      .get(`/todos/${todoId}`)
      .expect(404);
  });

  it('should list all todos', async () => {
    await request(app)
      .post('/todos')
      .send({ task: 'TODO 1' })
      .expect(201);
    await request(app)
      .post('/todos')
      .send({ task: 'TODO 2' })
      .expect(201);

    const response = await request(app)
      .get('/todos')
      .expect(200);

    expect(response.body.length).toBe(4);
    expect(response.body[2].task).toBe('TODO 1');
    expect(response.body[3].task).toBe('TODO 2');
  });
});
