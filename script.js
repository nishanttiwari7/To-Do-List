let todos = {
    backlog: ['Task 1', 'Task 2'],
    todo: [ 'Task 3', 'Task 4', 'Task 5'],
    ongoing: ['Task 6','Task 7', 'Task 8'],
    done: ['Task 9', 'Task 10']
};

function renderTodos() {
    for (let status in todos) {
        let list = document.getElementById(`${status}-todos`);
        list.innerHTML = '';
        todos[status].forEach((todo, index) => {
            let li = document.createElement('li');
            li.innerHTML = `
                ${todo}
                <span>
                    ${getLeftButton(status, index)}
                    ${getRightButton(status, index)}
                </span>
            `;
            list.appendChild(li);
        });
    }
}

function getLeftButton(status, index) {
    if (status === 'backlog') return '';
    let targetStatus = status === 'todo' ? 'backlog' : status === 'ongoing' ? 'todo' : 'ongoing';
    return `<button class="nav-btn-left" onclick="moveItem('${status}', '${targetStatus}', ${index})">←</button>`;
}

function getRightButton(status, index) {
    if (status === 'done') return '';
    let targetStatus = status === 'backlog' ? 'todo' : status === 'todo' ? 'ongoing' : 'done';
    return `<button class="nav-btn-right" onclick="moveItem('${status}', '${targetStatus}', ${index})">→</button>`;
}

function moveItem(from, to, index) {
    let item = todos[from].splice(index, 1)[0];
    todos[to].push(item);
    renderTodos();
}

document.addEventListener('DOMContentLoaded', renderTodos);
