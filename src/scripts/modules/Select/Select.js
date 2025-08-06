import { MatchMedia } from '../../constants/MatchMedia'
import { digitsOnly } from '../../utils/digitsOnly'
import { getCheckedStorage } from '../../utils/getCheckedStorage'
import TasksList from '../TasksList/TasksList'

class Select {
  selectors = {
    root: '[data-js-select]',
    originalControl: '[data-js-select-original-control]',
    button: '[data-js-select-button]',
    dropdown: '[data-js-select-dropdown]',
    option: '[data-js-select-option]',
    lastsTasksList: '[data-js-lasts-tasks-list]',
    taskDeleteButton: '[data-js-delete-button]'
  }

  stateClasses = {
    isExpanded: 'is-expanded',
    isSelected: 'is-selected',
    isCurrent: 'is-current',
    isOnTheLeftSide: 'is-on-the-left-side',
    isOnTheRightSide: 'is-on-the-right-side',
  }

  initialState = {
    isExpanded: false,
    currentOptionIndex: null,
    selectedOptionElement: null,
    lastsTasksCount: -1,
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    if (!this.rootElement) {
      return
    }

    this.originalControlElement = this.rootElement.querySelector(
      this.selectors.originalControl
    )
    this.buttonElement = this.rootElement.querySelector(this.selectors.button)
    this.dropdownElement = this.rootElement.querySelector(
      this.selectors.dropdown
    )
    this.optionElements = this.rootElement.querySelectorAll(
      this.selectors.option
    )
    this.lastsTasksListElement = document.querySelector(
      this.selectors.lastsTasksList
    )
    this.state = this.getProxyState({
      ...this.initialState,
      currentOptionIndex: this.originalControlElement.selectedIndex,
      selectedOptionElement:
        this.optionElements[this.originalControlElement.selectedIndex],
    })

    this.updateUI()
    setTimeout(this.fixDropDownPosition, 500)
    this.updateTabIndex()
    this.bindEvents()
  }

  getProxyState(initialState) {
    return new Proxy(initialState, {
      get: (target, prop) => {
        return target[prop]
      },
      set: (target, prop, newValue) => {
        const oldValue = target[prop]

        target[prop] = newValue

        if (oldValue !== newValue) {
          this.updateUI()
        }

        return true
      },
    })
  }

  updateUI() {
    const { isExpanded, currentOptionIndex, selectedOptionElement } = this.state

    const newSelectedOptionValue = selectedOptionElement.textContent.trim()

    const lastsTasks = getCheckedStorage(TasksList.tasksListStorageKey)
    this.state.lastsTasksCount =
      newSelectedOptionValue !== 'all'
        ? digitsOnly(newSelectedOptionValue) - 1
        : lastsTasks.length - 1

    const updateOriginalControl = () => {
      this.originalControlElement.value = newSelectedOptionValue
    }

    const updateButton = () => {
      this.buttonElement.textContent = newSelectedOptionValue
      this.buttonElement.classList.toggle(
        this.stateClasses.isExpanded,
        isExpanded
      )
      this.buttonElement.ariaExpanded = isExpanded
      this.buttonElement.ariaActiveDescendent =
        this.optionElements[currentOptionIndex].id
    }

    const updateDropdown = () => {
      this.dropdownElement.classList.toggle(
        this.stateClasses.isExpanded,
        isExpanded
      )
    }

    const updateOptions = () => {
      this.optionElements.forEach((optionElement, index) => {
        const isCurrent = currentOptionIndex === index
        const isSelected = optionElement === selectedOptionElement

        optionElement.classList.toggle(this.stateClasses.isCurrent, isCurrent)
        optionElement.classList.toggle(this.stateClasses.isSelected, isSelected)
        optionElement.ariaSelected = isSelected
      })
    }

    const renderLastsTasks = () => {

      this.lastsTasksListElement.innerHTML = ''
      lastsTasks ? 
      lastsTasks.forEach(({ id, title }, index) => {
        if (index > this.state.lastsTasksCount) return

        this.lastsTasksListElement.innerHTML += `
          <li class="tasks__item lasts-tasks__item" data-js-task id=${id}>
              <header class="tasks__item-header lasts-tasks__item-header">
                <h2 class="tasks__item-title">${title}</h2>
                <div class="tasks__item-buttons">
                  <button class="delete lasts-tasks__item-button" data-js-delete-button>
                    Delete
                  </button>
                </div>
              </header>
            </li>
        `
      }) : this.lastsTasksListElement.innerHTML = ''
    }

    updateOriginalControl()
    updateButton()
    updateDropdown()
    updateOptions()
    renderLastsTasks()
  }

  fixDropDownPosition = () => {
    const viewportWidth = document.documentElement.clientWidth
    const viewportCenterX = viewportWidth / 2
    const { width, x } = this.buttonElement.getBoundingClientRect()
    const buttonCenterX = x + width / 2
    const isButtonOnTheLeftViewportSide = buttonCenterX < viewportCenterX

    this.dropdownElement.classList.toggle(
      this.stateClasses.isOnTheLeftSide,
      isButtonOnTheLeftViewportSide
    )
    this.dropdownElement.classList.toggle(
      this.stateClasses.isOnTheRightSide,
      !isButtonOnTheLeftViewportSide
    )
  }

  updateTabIndex(isMobileDevice = MatchMedia.mobile.matches) {
    this.originalControlElement.tabIndex = isMobileDevice ? 0 : -1
    this.buttonElement.tabIndex = isMobileDevice ? -1 : 0
  }

  toggleExpandedState() {
    this.state.isExpanded = !this.state.isExpanded
  }

  expand() {
    this.state.isExpanded = true
  }

  collaps() {
    this.state.isExpanded = false
  }

  get isNeedToExpand() {
    const isButtonFocused = document.activeElement === this.buttonElement

    return !this.state.isExpanded && isButtonFocused
  }

  selectCurrentOption() {
    this.state.selectedOptionElement =
      this.optionElements[this.state.currentOptionIndex]
  }

  onMobileMatchMediaChange = (event) => {
    this.updateTabIndex(event.matches)
  }

  onOriginalControlChange = () => {
    this.state.selectedOptionElement =
      this.optionElements[this.originalControlElement.selectedIndex]
  }

  onButtonClick = () => {
    this.toggleExpandedState()
  }

  onClick = (event) => {
    const { target } = event

    const isButtonClick = target === this.buttonElement
    const isOutsideDropdownClick =
      target.closest(this.selectors.dropdown) !== this.dropdownElement

    if (!isButtonClick && isOutsideDropdownClick) {
      this.collaps()

      return
    }

    const isOptionClick = target.matches(this.selectors.option)

    if (isOptionClick) {
      this.state.selectedOptionElement = target
      this.state.currentOptionIndex = [...this.optionElements].findIndex(
        (optionElement) => optionElement === target
      )
      this.collaps()
    }
  }

  onArrowUpKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand()
      return
    }

    if (this.state.currentOptionIndex > 0) {
      this.state.currentOptionIndex--
    }
  }

  onArrowDownKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand()
      return
    }

    if (this.state.currentOptionIndex < this.optionElements.length - 1) {
      this.state.currentOptionIndex++
    }
  }

  onSpaceKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand()
      return
    }

    this.selectCurrentOption()
    this.collaps()
  }

  onEnterKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand()
      return
    }

    this.selectCurrentOption()
    this.collaps()
  }

  onEscape = () => {
    this.collaps()
  }

  onKeyDown = (event) => {
    const { code } = event

    const action = {
      ArrowUp: this.onArrowUpKeyDown,
      ArrowDown: this.onArrowDownKeyDown,
      Space: this.onSpaceKeyDown,
      Enter: this.onEnterKeyDown,
      Escape: this.onEscape,
    }[code]

    if (action) {
      event.preventDefault()
      action()
    }
  }

  onLastsTasksListClick = (event) => {
    const { target } = event

    if (target.matches(this.selectors.taskDeleteButton)) {
      this.updateUI()
      console.log(5);
    }
  }

  bindEvents() {
    MatchMedia.mobile.addEventListener('change', this.onMobileMatchMediaChange)
    this.originalControlElement.addEventListener(
      'change',
      this.onOriginalControlChange
    )
    this.buttonElement.addEventListener('click', this.onButtonClick)
    document.addEventListener('click', this.onClick)
    this.rootElement.addEventListener('keydown', this.onKeyDown)
    this.lastsTasksListElement.addEventListener('click', this.onLastsTasksListClick)
  }
}

export { Select }
