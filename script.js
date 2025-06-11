$(document).ready(function () {
  loadTasks();

  $('#task-form').submit(function (e) {
    e.preventDefault();
    const taskText = $('#task-input').val().trim();

    if (taskText) {
      addTask(taskText);
      $('#task-input').val('');
    }
  });

  function addTask(text, isCompleted = false) {
    const taskId = Date.now();
    const taskItem = $(`
            <li class="task-item" data-id="${taskId}">
                <span class="task-text">${text}</span>
                <div class="task-actions">
                    <button class="task-btn complete-btn">
                        <i class="fas ${
                          isCompleted ? 'fa-undo' : 'fa-check'
                        }"></i>
                    </button>
                    <button class="task-btn delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `);

    if (isCompleted) {
      taskItem.addClass('completed');
      taskItem.addClass('completed');
      taskItem
        .find('.complete-btn i')
        .removeClass('fa-check')
        .addClass('fa-undo');
    }

    taskItem.find('.complete-btn').click(function () {
      toggleComplete(taskItem);
    });

    taskItem.find('.delete-btn').click(function () {
      deleteTask(taskItem);
    });

    $('#task-list').append(taskItem);
    saveTasks();
    updateTaskCount();
  }

  function toggleComplete(taskItem) {
    const completeIcon = taskItem.find('.complete-btn i');
    completeIcon.removeClass('fa-check fa-undo');

    taskItem.toggleClass('completed');

    if (taskItem.hasClass('completed')) {
      completeIcon.addClass('fa-undo');
    } else {
      completeIcon.addClass('fa-check');
    }

    taskItem.addClass('clicked');
    setTimeout(() => {
      taskItem.removeClass('clicked');
    }, 300);

    saveTasks();
    updateTaskCount();
  }

  function deleteTask(taskItem) {
    taskItem.addClass('clicked');
    setTimeout(() => {
      taskItem.remove();
      saveTasks();
      updateTaskCount();
    }, 300);
  }

  function updateTaskCount() {
    const incompleteCount = $('.task-item:not(.completed)').length;
    $('#task-count').text(incompleteCount);
  }

  function saveTasks() {
    const tasks = [];
    $('.task-item').each(function () {
      tasks.push({
        id: $(this).data('id'),
        text: $(this).find('.task-text').text(),
        completed: $(this).hasClass('completed'),
      });
    });
    localStorage.setItem('brutalTasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const savedTasks = localStorage.getItem('brutalTasks');
    if (savedTasks) {
      JSON.parse(savedTasks).forEach((task) => {
        addTask(task.text, task.completed);
      });
      updateTaskCount();
    }
  }

  $('.add-btn').hover(
    function () {
      $(this).css('transform', 'translateY(-2px)');
    },
    function () {
      $(this).css('transform', 'translateY(0)');
    },
  );
});
