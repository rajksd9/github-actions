const { addTodo, getTodo, deleteTodo, listTodos } = require('./todoManager.js');

exports.handler = async (event) => {
    const { httpMethod, path, pathParameters, body } = event;
    const id = pathParameters ? Number(pathParameters.id) : null;

    switch (httpMethod) {
        case 'POST':
            if (path === '/todos') {
                const { task } = JSON.parse(body);
                if (!task) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify({ error: 'Task is required' })
                    };
                }
                const todo = addTodo(task);
                return {
                    statusCode: 201,
                    body: JSON.stringify(todo)
                };
            }
            break;
        case 'GET':
            if (path === '/todos') {
                return {
                    statusCode: 200,
                    body: JSON.stringify(listTodos())
                };
            } else if (path === `/todos/${id}`) {
                const todo = getTodo(id);
                if (todo) {
                    return {
                        statusCode: 200,
                        body: JSON.stringify(todo)
                    };
                } else {
                    return {
                        statusCode: 404,
                        body: JSON.stringify({ error: 'Todo not found' })
                    };
                }
            }
            break;
        case 'DELETE':
            if (path === `/todos/${id}`) {
                const success = deleteTodo(id);
                if (success) {
                    return {
                        statusCode: 204,
                        body: JSON.stringify({ message: 'Todo deleted' })
                    };
                } else {
                    return {
                        statusCode: 404,
                        body: JSON.stringify({ error: 'Todo not found' })
                    };
                }
            }
            break;
        default:
            return {
                statusCode: 405,
                body: JSON.stringify({ error: 'Method Not Allowed' })
            };
    }

    return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Not Found' })
    };
};

