class Message {
  static selectors = {
    message: '[data-js-message]',
  }

  static stateClasses = {
    isActive: 'is-active',
  }

  static messageElement = document.querySelector(Message.selectors.message)

  static showAndHide()  {
    Message.messageElement.classList.add(Message.stateClasses.isActive)

    setTimeout(() => {
      Message.messageElement.classList.remove(Message.stateClasses.isActive)
    }, 3000)
  }
}

export { Message }