import { getCheckedStorage } from "../../utils/getCheckedStorage"
import TasksList from "../TasksList/TasksList"

class CreateTask {
  selectors = {
    root: '[data-js-create-tasks]',
    nameField: '[data-js-create-name-field]',
    descriptionField: '[data-js-create-description-field]',
    createButton: '[data-js-create-button]'
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    if (!this.rootElement) {
      return
    }
    this.nameFieldElement = this.rootElement.querySelector(this.selectors.nameField)
    this.descriptionFieldElement = this.rootElement.querySelector(this.selectors.descriptionField)
    this.createButtonElement = this.rootElement.querySelector(this.selectors.createButton)
    this.bindEvents()
  }

  onCreateButtonClick = () => {
    const taskName = this.nameFieldElement.value
    const taskDescription = this.descriptionFieldElement.value

    if (!taskName || !taskDescription) {
      return
    }

    const task = {
      id: new Date().getTime(),
      title: taskName,
      description: taskDescription
    }

    const taskList = [...getCheckedStorage(TasksList.tasksListStorageKey), task]

    localStorage.setItem(TasksList.tasksListStorageKey, JSON.stringify(taskList))

    this.nameFieldElement.value = ''
    this.descriptionFieldElement.value = ''

    console.log(1);
  }

  bindEvents() {
    this.createButtonElement.addEventListener('click', this.onCreateButtonClick)
  }
}

export { CreateTask }