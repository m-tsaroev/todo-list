class SwitchTheme {
  selectors = {
    switchThemeButton: '[data-js-switch-theme-button]',
  }

  stateClasses = {
    isActive: 'is-active',
    isLight: 'light',
  }

  themes = {
    dark: 'dark',
    light: 'light',
  }

  storageKey = 'theme'

  constructor() {
    this.switchThemeButtonElement = document.querySelector(
      this.selectors.switchThemeButton
    )
    this.renderTheme()
    this.bindEvents()
  }

  get isLightThemeChanges() {
    return localStorage.getItem(this.storageKey) === this.themes.light
  }

  onSwitchThemeButtonClick = () => {
    this.switchThemeButtonElement.classList.toggle(
      this.stateClasses.isActive,
      this.isLightThemeChanges
    )
    localStorage.setItem(
      this.storageKey,
      this.isLightThemeChanges ? 'dark' : 'light'
    )

    this.renderTheme()
  }

  renderTheme() {
    document.documentElement.classList.toggle(
      this.stateClasses.isLight,
      this.isLightThemeChanges
    )
    this.switchThemeButtonElement.classList.toggle(
      this.stateClasses.isActive,
      this.isLightThemeChanges
    )
  }

  bindEvents() {
    this.switchThemeButtonElement.addEventListener(
      'click',
      this.onSwitchThemeButtonClick
    )
  }
}

export { SwitchTheme }
