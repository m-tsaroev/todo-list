const taskSelector = '[data-js-task]'

class Task {
  selectors = {
    openCloseButton: '[data-js-open-close-button]',
    compliteButton: '[data-js-complite-button]',
    deleteButton: '[data-js-delete-button]',
  }

  stateClasses = {
    isActive: 'is-active',
    isComplite: 'is-complite',
    isDelete: 'is-delete',
  }

  constructor(taskElement) {
    this.taskElement = taskElement
    this.bindEvents()
  }

  onTaskElementClick = (event) => {
    const { target } = event

    const isOpenCloseButtonElement = target.closest(
      this.selectors.openCloseButton
    )
    const isCompliteButtonElement = target.closest(
      this.selectors.compliteButton
    )
    const isDeleteBittonElement = target.closest(this.selectors.deleteButton)

    const hasIsDeleteClass = this.taskElement.classList.value.includes(
      this.stateClasses.isDelete
    )
    const hasIsCompliteClass = this.taskElement.classList.value.includes(
      this.stateClasses.isComplite
    )

    if (isOpenCloseButtonElement) {
      this.taskElement.classList.toggle(this.stateClasses.isActive)
      target.innerText = this.taskElement.classList.value.includes(
        this.stateClasses.isActive
      )
        ? 'Close'
        : 'Open'
    } else if (isCompliteButtonElement && !hasIsDeleteClass) {
      this.taskElement.classList.add(this.stateClasses.isComplite)
    } else if (isDeleteBittonElement && !hasIsCompliteClass) {
      this.taskElement.classList.add(this.stateClasses.isDelete)
    }
  }

  bindEvents() {
    this.taskElement.addEventListener('click', this.onTaskElementClick)
  }
}

class TaskCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(taskSelector).forEach((taskElement) => {
      new Task(taskElement)
    })
  }
}

export { TaskCollection }
