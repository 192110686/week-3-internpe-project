// Initialize variables
let tasks = [];
const taskInput = document.getElementById('task-input');
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const progress = document.getElementById('progress');
const numbers = document.getElementById('numbers');
const celebration = document.getElementById('celebration');
const nameInput = document.getElementById('name-input');
const userNameSpan = document.getElementById('user-name');

// Function to trigger confetti
const triggerConfetti = () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
};

// Function to update the progress bar and task count
const updateStats = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progressPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    numbers.textContent = `${completedTasks}/${totalTasks}`;
    progress.style.width = `${progressPercentage}%`;

    // Show celebration message if all tasks are completed
    if (completedTasks === totalTasks && totalTasks > 0) {
        celebration.classList.remove('hidden');
        userNameSpan.textContent = nameInput.value || 'User';
        triggerConfetti(); // Trigger confetti effect
    } else {
        celebration.classList.add('hidden');
    }
};

// Function to render tasks
const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskItem.innerHTML = `
            <div class="checkbox-container">
                <input type="checkbox" ${task.completed ? 'checked' : ''} />
            </div>
            <label>${task.name}</label>
            <button class="delete-btn">Delete</button>
        `;

        // Add event listeners
        taskItem.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
            task.completed = e.target.checked;
            updateStats();
            renderTasks();
        });

        taskItem.querySelector('.delete-btn').addEventListener('click', () => {
            tasks = tasks.filter(t => t !== task);
            updateStats();
            renderTasks();
        });

        taskList.appendChild(taskItem);
    });

    updateStats();
};

// Handle form submission
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = taskInput.value.trim();
    if (taskName) {
        tasks.push({ name: taskName, completed: false });
        taskInput.value = '';
        renderTasks();
    }
});

// Handle name input change
nameInput.addEventListener('input', updateStats);

// Initial render
renderTasks();
