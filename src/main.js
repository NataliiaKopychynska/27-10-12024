import { nanoid } from 'nanoid';
const form = document.querySelector('.header-form');
const cardsList = document.querySelector('.tasks-list');
const STORAGE_KEY = 'tasks';

form.addEventListener('submit', formSubmit);

initSt();

function formSubmit(event) {
  event.preventDefault();
  const formName = event.target.elements.taskName.value;
  const formText = event.target.elements.taskText.value;
  if (!formName || !formText) {
    alert('fiil please all');
    return;
  }
  const newTask = { formName, formText, id: nanoid() };

  addTasktoLocaleSt(newTask);
  const tasksLocaleSt = JSON.parse(localStorage.getItem(STORAGE_KEY));

  renderCards(tasksLocaleSt);
}

function renderCards(tasksLocaleSt) {
  const cards = tasksLocaleSt
    .map(
      ({ formName, formText, id }) => `<li class="task-list-item">
  <button class="task-list-item-btn" data-id="${id}">Delete</button>
  <h3>${formName}</h3>
  <p>${formText}</p>
</li>`
    )
    .join(``);
  cardsList.innerHTML = '';
  cardsList.insertAdjacentHTML('beforeend', cards);
}

function addTasktoLocaleSt(newTask) {
  const arrTasks = JSON.parse(localStorage.getItem(STORAGE_KEY));
  arrTasks.push(newTask);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arrTasks));
}

function initSt() {
  const getItems = localStorage.getItem(STORAGE_KEY);
  if (!getItems) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return;
  }
  const parceItems = JSON.parse(getItems);

  renderCards(parceItems);
}
