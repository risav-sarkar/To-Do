let todos = new Map();
let undone_todos = 0;

document.querySelector(".input-button").addEventListener("click", function () {
  const input = document.querySelector(".input-field");
  if (input.value != "") {
    undone_todos++;
    todos.set(input.value, 0);
    input.value = "";
    console.log("Input Button Clicked");
    render(todos);
  }
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.size; i++) {
    listItems += `
            <li class="todos">
                <button class="done-button" id="done-${i}" onclick="donebtn(this.id,${i})"></button>
                    <p class="todo-text" id="text-deco-${i}">
                        ${Array.from(todos.keys())[i]}
                    </p>
                <button class="remove-button" onclick="deletebtn(${i})"><i class="fas fa-times"></i></button>
            </li>
          `;
  }

  listItems += `
            <li class="todo-stats">
                <p id="todo-number">${undone_todos} items left</p>
                <button class="todo-clearbtn">Clear Completed</button>
            </li>
          `;
  document.querySelector(".todos-container").innerHTML = listItems;
  update_style(leads);
}

function update_style(leads) {
  for (let i = 0; i < leads.size; i++) {
    const key = Array.from(todos.keys())[i];
    const id = "done-" + i;
    const text = "text-deco-" + i;
    console.log(id, text);
    if (todos.get(key) === 1) {
      document.getElementById(id).style.backgroundColor = "#fff";
      document.getElementById(text).style.textDecoration = "line-through";
    }
  }
}

function donebtn(id, i) {
  const key = Array.from(todos.keys())[i];
  if (todos.get(key) === 0) {
    undone_todos--;
    todos.set(key, 1);
    render(todos);
  } else {
    undone_todos++;
    todos.set(key, 0);
    render(todos);
  }
}

function deletebtn(i) {
  todos.delete(Array.from(todos.keys())[i]);
  render(todos);
}
