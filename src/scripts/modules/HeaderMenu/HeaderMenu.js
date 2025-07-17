class HeaderMenu {
  selectors = {
    root: '[data-js-header]',
    menu: '[data-js-header-menu]',
    burgerButton: '[data-js-burger-button]',
  }

  stateClasses = {
    isActive: 'is-active',
    isOpen: 'is-open',
    isLock: 'is-lock'
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    this.menuElement = document.querySelector(this.selectors.menu)
    this.burgerButtonElement = document.querySelector(
      this.selectors.burgerButton
    )
    this.bindEvents()
  }

  onBurgerButtonClick = () => {
    this.menuElement.classList.toggle(this.stateClasses.isOpen)
    this.burgerButtonElement.classList.toggle(this.stateClasses.isActive)
    document.documentElement.classList.toggle(this.stateClasses.isLock)
  }

  bindEvents() {
    this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick)
  }
}

export { HeaderMenu }
