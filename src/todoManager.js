let todos = [];

const addTodo = (task) => {
  const todo = { id: todos.length + 1, task };
  todos.push(todo);
  return todo;
};

 const getTodo = (id) => {
  return todos.find(todo => todo.id === id);
};

 const deleteTodo = (id) => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    return true;
  }
  return false;
};

const listTodos = () => todos;
module.exports={
    addTodo,
    getTodo,
    deleteTodo,
    listTodos
}
