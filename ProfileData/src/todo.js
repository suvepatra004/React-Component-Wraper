export function Todo(title) {
  let todo = [];

  return function render(container) {
    container.innterHTML = `
            <h1>${title}</h1>
            <input type="text" id="todo-input" placeholder="Enter a todo item">
            <button id="add-todo">Add Todo</button>
            <ul id="todo-list">${todo.map((t) => `<li>${t}</li>`).join("")}</ul>
    `;

    document.querySelector("#add-todo").addEventListener("click", () => {
      const input = document.querySelector("#todo-input");
      todo.push(input.value);
      render(container);
    });
  };
}
