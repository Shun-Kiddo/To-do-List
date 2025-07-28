function formatTimeTo12Hour(time24) {
        const [hourStr, minute] = time24.split(":");
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        return `${hour}:${minute} ${ampm}`;
    }

    let task = JSON.parse(localStorage.getItem('task')) || [];
    const todoTableBody = document.querySelector('#todo-table tbody');

    function saveTask(){
        localStorage.setItem('task', JSON.stringify(task));
    }

    function addTaskToTable(taskObject) {
        const newRow = document.createElement('tr');
        const checkboxCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = taskObject.checked;
        checkbox.addEventListener('change', function() {
            taskObject.checked = checkbox.checked;
            saveTask();
        });
        checkboxCell.appendChild(checkbox);
        checkboxCell.classList.add('checkbox');

            const taskCell = document.createElement('td');
            taskCell.textContent = taskObject.task;

            const dateCell = document.createElement('td');
            dateCell.textContent = taskObject.date;

            const timeCell = document.createElement('td');
            timeCell.textContent = taskObject.time;

            const actionCell = document.createElement('td');

            const deleteButton = document.createElement('button');  
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.addEventListener('click', function() {
                newRow.remove();
                task = task.filter(t => t !== taskObject);
                saveTask();
            });
            
            actionCell.appendChild(deleteButton);

            const updateButton = document.createElement('button');
            updateButton.innerHTML = '<i class="fas fa-pen"></i>';
            updateButton.addEventListener('click',function() {
                
                const newTask = prompt("Enter new task:", taskCell.textContent);
                const newDate = prompt("Enter new date (yyyy-mm-dd):", dateCell.textContent);
                const newTime = prompt("Enter new time (HH:MM):", "");

    
                if (newTask !== null && newTask.trim() !== '') {
                    taskObject.task = newTask;
                    taskCell.textContent = newTask;
                }
                if (newDate !== null && newDate.trim() !== '') {
                    taskObject.date = newDate;
                    dateCell.textContent = newDate;
                }
                if (newTime !== null && newTime.trim() !== '') {
                    taskObject.time = formatTimeTo12Hour(newTime);
                    timeCell.textContent = formatTimeTo12Hour(newTime);
                }
                saveTask();
            });
            actionCell.appendChild(document.createTextNode(' '));
            actionCell.appendChild(updateButton);

            newRow.appendChild(checkboxCell);
            newRow.appendChild(taskCell);   
            newRow.appendChild(dateCell);
            newRow.appendChild(timeCell);
            newRow.appendChild(actionCell);
            
            todoTableBody.appendChild(newRow);
    
    }

    task.forEach(addTaskToTable);
    
    document.getElementById('todo-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const taskInput = document.getElementById('todo-input');
        const dateInput = document.querySelector('.add-date');
        const timeInput = document.querySelector('.add-time');
        const formattedTime = formatTimeTo12Hour(timeInput.value);
        
        if (taskInput.value.trim() !== '') {
            const taskObject = {
                task: taskInput.value,
                date: dateInput.value,
                time: formatTimeTo12Hour(timeInput.value),
                checked: false
            };
            task.push(taskObject);
            saveTask();
            addTaskToTable(taskObject);
            
            taskInput.value = '';
            dateInput.value = '';
            timeInput.value = '';
        }
    });

    console.log("%cThank you for checking the console!\n%cProject by Jayson Mancol © 2025", 
    "color: green; font-weight: bold; font-size: 16px;", 
    "color: gray; font-size: 12px;");
