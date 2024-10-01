
const { addTodo, getTodo, deleteTodo, listTodos } = require('./todoManager.js');



exports.createTodo=async(event)=>{
  const { task } = JSON.parse(event.body);
  if (!task) {
    return {statusCode:400,
      body: JSON.stringify({ error: 'Task is required' })}
  }
  const todo = addTodo(task);
  return {statusCode:201,
    body: JSON.stringify(todo)}
};

exports.getTodo=async(event) => {
  const todo = JSON.parse(getTodo(Number(event.pathParams.id)));
  if (todo) {
   return {statusCode:201,
      body: JSON.stringify(todo)}
  } else {
    return {statusCode:400,
      body: JSON.stringify({ error: 'Todo not found' })}
  }
};

exports.deleteTodo=async(event) => {
  const success = JSON.parse(deleteTodo(Number(event.pathParams.id)))
  if (success) {
    return {statusCode:204,
      body: JSON.stringify("todo deleted successfully")}
  }
  else {
    return {c}
  }
};

exports.getTodos= async (event) => {
  return {
    statusCode:200,
      body: JSON.stringify(listTodos())

  }
};



