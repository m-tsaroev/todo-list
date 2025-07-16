import { getCheckedStorage } from "../../utils/getCheckedStorage"

class HistoryTasks {
  static tasksHistoryListStorageKey = 'tasksHistoryList'

  static addToHistory(task) {
    const historyTasksList = getCheckedStorage(this.tasksHistoryListStorageKey)

    console.log(historyTasksList);
    console.log(task);

    const newHistoryList = [...historyTasksList, task]

    console.log(newHistoryList);

    localStorage.setItem(this.tasksHistoryListStorageKey, JSON.stringify(newHistoryList))
  }
}

export { HistoryTasks }