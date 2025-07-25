import { getCheckedStorage } from '../../utils/getCheckedStorage'
import TasksList from '../TasksList/TasksList'

class SearchField {
  selectors = {
    searchButton: '[data-js-search-button]',
    searchField: '[data-js-search-field]',
  }

  stateClasses = {
    isActive: 'is-active',
  }

  constructor() {
    this.searchButtonElement = document.querySelector(
      this.selectors.searchButton
    )
    this.searchFieldElement = document.querySelector(this.selectors.searchField)

    if (this.searchButtonElement && this.searchFieldElement) {
      this.bindEvents()
    }
  }

  onSearchButtonClick = (event) => {
    const { target } = event

    const targetButton = target.closest(this.selectors.searchButton)

    const targetClasses = targetButton.classList

    targetClasses.toggle(
      this.stateClasses.isActive,
      !targetClasses.value.includes(this.stateClasses.isActive)
    )

    targetButton.innerHTML = targetClasses.value.includes(
      this.stateClasses.isActive
    )
      ? `
      <div class="header__search-button-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.7464 12L18.6346 7.11179C18.8666 6.88021 18.9971 6.56595 18.9974 6.23815C18.9977 5.91035 18.8677 5.59586 18.6361 5.36387C18.4045 5.13188 18.0903 5.00138 17.7625 5.00109C17.4347 5.0008 17.1202 5.13074 16.8882 5.36233L12 10.2505L7.11179 5.36233C6.8798 5.13033 6.56515 5 6.23706 5C5.90897 5 5.59432 5.13033 5.36233 5.36233C5.13033 5.59432 5 5.90897 5 6.23706C5 6.56515 5.13033 6.8798 5.36233 7.11179L10.2505 12L5.36233 16.8882C5.13033 17.1202 5 17.4349 5 17.7629C5 18.091 5.13033 18.4057 5.36233 18.6377C5.59432 18.8697 5.90897 19 6.23706 19C6.56515 19 6.8798 18.8697 7.11179 18.6377L12 13.7495L16.8882 18.6377C17.1202 18.8697 17.4349 19 17.7629 19C18.091 19 18.4057 18.8697 18.6377 18.6377C18.8697 18.4057 19 18.091 19 17.7629C19 17.4349 18.8697 17.1202 18.6377 16.8882L13.7464 12Z"
            fill="#151314" />
        </svg>
      </div>
    `
      : `
      <div class="header__search-button-icon">
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8.50012" cy="8.5" r="7.5" stroke="#151314" stroke-width="2" />
          <rect x="14.4143" y="13" width="8" height="2" rx="1" transform="rotate(45 14.4143 13)" fill="#151314" />
        </svg>
      </div>
    `

    this.searchFieldElement.classList.toggle(
      this.stateClasses.isActive,
      targetClasses.value.includes(this.stateClasses.isActive)
    )

    targetClasses.value.includes(this.stateClasses.isActive)
      ? this.searchFieldElement.focus()
      : this.searchFieldElement.blur()
  }

  onSearchFieldChange = (event) => {
    const { target } = event

    const tasks = getCheckedStorage(TasksList.tasksListStorageKey)

    const filtedTasksList = tasks.filter(
      ({ title }) => {
        return title
          .trim()
          .toLowerCase()
          .includes(target.value.trim().toLowerCase())
      }
    )

    TasksList.renderTasks(filtedTasksList, true)
  }

  bindEvents() {
    this.searchButtonElement.addEventListener('click', this.onSearchButtonClick)
    this.searchFieldElement.addEventListener('input', this.onSearchFieldChange)
  }
}

export { SearchField }
