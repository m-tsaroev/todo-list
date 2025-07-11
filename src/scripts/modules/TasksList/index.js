class TasksList {
  static selectors = {
    tasksList: '[data-js-tasks-list]',
  }

  static storageKey = 'tasksList'

  static tasksListElement = document.querySelector(
    TasksList.selectors.tasksList
  )

  constructor() {
    // let newTasks = []

    // for (let i = 0; i < 20; i++) {
    //   newTasks.push({
    //     id: i,
    //     title: `Task ${i}`,
    //     description:
    //       'description description description description description description description',
    //   })
    // }

    // localStorage.setItem(TasksList.storageKey, JSON.stringify(newTasks))

    TasksList.renderTasks()
  }

  static renderTasks() {
    const tasks = localStorage.getItem(this.storageKey)
      ? JSON.parse(localStorage.getItem(this.storageKey))
      : ''

    // console.log(tasks);

    tasks ? tasks.forEach(({ title, description, id }) => {
      TasksList.tasksListElement.innerHTML += `
        <li class="tasks__item" data-js-task id="${id}">
          <header class="tasks__item-header">
            <h2 class="tasks__item-title">${title}</h2>
            <div class="tasks__item-buttons">
              <button class="tasks__item-button delete" data-js-delete-button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.7464 12L18.6346 7.11179C18.8666 6.88021 18.9971 6.56595 18.9974 6.23815C18.9977 5.91035 18.8677 5.59586 18.6361 5.36387C18.4045 5.13188 18.0903 5.00138 17.7625 5.00109C17.4347 5.0008 17.1202 5.13074 16.8882 5.36233L12 10.2505L7.11179 5.36233C6.8798 5.13033 6.56515 5 6.23706 5C5.90897 5 5.59432 5.13033 5.36233 5.36233C5.13033 5.59432 5 5.90897 5 6.23706C5 6.56515 5.13033 6.8798 5.36233 7.11179L10.2505 12L5.36233 16.8882C5.13033 17.1202 5 17.4349 5 17.7629C5 18.091 5.13033 18.4057 5.36233 18.6377C5.59432 18.8697 5.90897 19 6.23706 19C6.56515 19 6.8798 18.8697 7.11179 18.6377L12 13.7495L16.8882 18.6377C17.1202 18.8697 17.4349 19 17.7629 19C18.091 19 18.4057 18.8697 18.6377 18.6377C18.8697 18.4057 19 18.091 19 17.7629C19 17.4349 18.8697 17.1202 18.6377 16.8882L13.7464 12Z"
                    fill="#151314" />
                </svg>

              </button>
              <button class="tasks__item-button complite" data-js-complite-button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M19.9939 5.43558C20.3056 5.70834 20.3372 6.18216 20.0644 6.49389L9.56443 18.4939C9.42774 18.6501 9.23242 18.7427 9.02496 18.7496C8.8175 18.7565 8.61645 18.6771 8.46967 18.5303L3.96967 14.0303C3.67678 13.7374 3.67678 13.2626 3.96967 12.9697C4.26256 12.6768 4.73744 12.6768 5.03033 12.9697L8.96347 16.9028L18.9356 5.50613C19.2083 5.1944 19.6822 5.16282 19.9939 5.43558Z"
                    fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

              </button>
              <button class="tasks__item-button open" data-js-open-close-button>Open</button>
            </div>
          </header>
          <div class="tasks__item-description">
            <p>${description}</p>
          </div>
        </li>
      `
    }) : TasksList.tasksListElement.innerHTML = ''
  }

  static deleteTask(id) {
    console.log(1)
    const tasks = JSON.parse(localStorage.getItem(TasksList.storageKey))

    console.log(tasks)

    const filteredTasks = tasks.filter((task) => {
      // console.log(task.id.toString(), id);
      return task.id.toString() !== id.toString()
    })

    console.log(filteredTasks)

    localStorage.setItem(TasksList.storageKey, '')

    TasksList.renderTasks()

    localStorage.setItem(TasksList.storageKey, JSON.stringify(filteredTasks))

    TasksList.renderTasks()
  }
}

export default TasksList
