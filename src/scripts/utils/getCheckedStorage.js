const getCheckedStorage = (storageKey) => {
  return localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : []
}

export { getCheckedStorage }