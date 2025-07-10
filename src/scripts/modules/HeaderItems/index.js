class HaederItems {
  selectors = {
    item: '[data-js-header-menu-item]',
  }

  stateClasses = {
    isActive: 'is-active',
  }

  constructor() {
    this.headerMenuItemElements = document.querySelectorAll(this.selectors.item)
    this.bindEvents()
  }

  onHeaderMenuLoaded = (event) => {
    const { location } = event.target

    this.headerMenuItemElements.forEach((headerMenuItemElement) => {
      headerMenuItemElement.classList.toggle(
        this.stateClasses.isActive,
        headerMenuItemElement.firstElementChild.getAttribute('href') ===
          location.pathname
      )
    })
  }

  bindEvents() {
    document.addEventListener('DOMContentLoaded', this.onHeaderMenuLoaded)
  }
}

export { HaederItems }
