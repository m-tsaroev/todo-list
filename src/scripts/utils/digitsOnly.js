const digitsOnly = (text) => {
  const numbers = '0123456789'

  let resultNumber = ''

  text.split('').forEach((char) => {
    if (numbers.includes(char)) {
      resultNumber += char
    }
  });

  return Number(resultNumber)
}

export { digitsOnly }