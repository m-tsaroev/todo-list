import TasksList from '../TasksList/TasksList'

class Task {
  selectors = {
    task: '[data-js-task]',
    openCloseButton: '[data-js-open-close-button]',
    compliteButton: '[data-js-complite-button]',
    deleteButton: '[data-js-delete-button]',
  }

  stateClasses = {
    isActive: 'is-active',
    isComplite: 'is-complite',
    isDelete: 'is-delete',
  }

  constructor() {
    this.bindEvents()
  }

  onTaskElementClick = (event) => {
    const { target } = event

    const taskElement = target.closest(this.selectors.task)

    if (!taskElement) {
      return
    }

    const taskElementId = taskElement.getAttribute('id')

    const isOpenCloseButtonElement = target.closest(
      this.selectors.openCloseButton
    )
    const isCompliteButtonElement = target.closest(
      this.selectors.compliteButton
    )
    const isDeleteBittonElement = target.closest(this.selectors.deleteButton)

    const hasIsDeleteClass = taskElement.classList.value.includes(
      this.stateClasses.isDelete
    )
    const hasIsCompliteClass = taskElement.classList.value.includes(
      this.stateClasses.isComplite
    )

    if (isOpenCloseButtonElement) {
      taskElement.classList.toggle(this.stateClasses.isActive)
      target.innerText = taskElement.classList.value.includes(
        this.stateClasses.isActive
      )
        ? 'Close'
        : 'Open'
    } else if (isCompliteButtonElement && !hasIsDeleteClass) {
      taskElement.classList.add(this.stateClasses.isComplite)
    } else if (isDeleteBittonElement && !hasIsCompliteClass) {
      taskElement.classList.add(this.stateClasses.isDelete)

      TasksList.deleteTask(taskElementId)
    }
  }

  bindEvents() {
    document.addEventListener('click', this.onTaskElementClick)
  }
}

export { Task }
