const form=document.querySelector("#todo-form"),input=document.querySelector("#todo-input"),list=document.querySelector("#todo-list"),itemsLeft=document.querySelector("#items-left"),emptyState=document.querySelector("#empty-state"),message=document.querySelector("#form-message");
const clearCompletedButton=document.querySelector("#clear-completed"),clearAllButton=document.querySelector("#clear-all"),filterButtons=document.querySelectorAll("[data-filter]"),themeToggle=document.querySelector("#theme-toggle");
let todos=[],currentFilter="all",nextId=1;
function visibleTodos(){if(currentFilter==="active")return todos.filter(todo=>!todo.completed);if(currentFilter==="completed")return todos.filter(todo=>todo.completed);return todos;}
function updateStats(){const remaining=todos.filter(todo=>!todo.completed).length;itemsLeft.textContent=remaining===1?"1 item left":`${remaining} items left`;emptyState.hidden=visibleTodos().length>0;}
function createTodoElement(todo){
 const item=document.createElement("li");item.className=`todo-item${todo.completed?" completed":""}`;item.dataset.id=String(todo.id);
 const checkbox=document.createElement("input");checkbox.type="checkbox";checkbox.className="complete-checkbox";checkbox.checked=todo.completed;checkbox.setAttribute("aria-label",`Mark ${todo.text} as ${todo.completed?"active":"completed"}`);
 const text=document.createElement("span");text.className="todo-text";text.textContent=todo.text;text.title="Double-click to edit";
 const del=document.createElement("button");del.type="button";del.className="icon-button delete-button";del.dataset.action="delete";del.textContent="Delete";del.setAttribute("aria-label",`Delete ${todo.text}`);
 item.append(checkbox,text,del);return item;
}
function renderTodos(){list.replaceChildren();visibleTodos().forEach(todo=>list.append(createTodoElement(todo)));updateStats();}
function addTodo(text){const clean=text.trim();if(!clean){message.textContent="Please type a task before adding it.";return;}todos.push({id:nextId++,text:clean,completed:false});message.textContent="";renderTodos();}
function toggleTodo(id){const todo=todos.find(item=>item.id===id);if(!todo)return;todo.completed=!todo.completed;renderTodos();}
function deleteTodo(id){todos=todos.filter(todo=>todo.id!==id);renderTodos();}
function editTodo(item,todo){
 const editor=document.createElement("input");editor.className="edit-input";editor.type="text";editor.maxLength=120;editor.value=todo.text;editor.setAttribute("aria-label","Edit task");item.replaceChildren(editor);editor.focus();editor.select();
 let finished=false;function finish(save){if(finished)return;finished=true;if(save&&editor.value.trim())todo.text=editor.value.trim();renderTodos();}
 editor.addEventListener("keydown",event=>{if(event.key==="Enter")finish(true);if(event.key==="Escape")finish(false);});editor.addEventListener("blur",()=>finish(true));
}
form.addEventListener("submit",event=>{event.preventDefault();addTodo(input.value);if(input.value.trim())input.value="";input.focus();});
// Delegation: one parent listener handles controls on existing and future tasks.
list.addEventListener("click",event=>{const item=event.target.closest(".todo-item");if(!item)return;const id=Number(item.dataset.id);if(event.target.matches(".complete-checkbox"))toggleTodo(id);if(event.target.closest('[data-action="delete"]'))deleteTodo(id);});
list.addEventListener("dblclick",event=>{const text=event.target.closest(".todo-text");if(!text)return;const item=text.closest(".todo-item"),todo=todos.find(entry=>entry.id===Number(item.dataset.id));if(todo)editTodo(item,todo);});
filterButtons.forEach(button=>button.addEventListener("click",()=>{currentFilter=button.dataset.filter;filterButtons.forEach(other=>{const active=other===button;other.classList.toggle("active",active);other.setAttribute("aria-pressed",String(active));});renderTodos();}));
clearCompletedButton.addEventListener("click",()=>{todos=todos.filter(todo=>!todo.completed);renderTodos();});
clearAllButton.addEventListener("click",()=>{todos=[];renderTodos();});
themeToggle.addEventListener("click",()=>{const dark=document.body.classList.toggle("dark");themeToggle.textContent=dark?"☀️ Light mode":"🌙 Dark mode";themeToggle.setAttribute("aria-pressed",String(dark));});
renderTodos();
