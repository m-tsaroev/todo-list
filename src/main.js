import { CreateTask } from './scripts/modules/CreateTask/CreateTask'
import { HaederItems } from './scripts/modules/HeaderItems/HeaderItems'
import { HeaderMenu } from './scripts/modules/HeaderMenu/HeaderMenu'
import { HistoryTasks } from './scripts/modules/HistoryTasks/HistoryTasks'
import { SearchField } from './scripts/modules/SearchField/SearchField'
import { SwitchTheme } from './scripts/modules/SwitchTheme/SwitchTheme'
import { Task } from './scripts/modules/Task/Task'
import TasksList from './scripts/modules/TasksList/TasksList'

new HaederItems()
new SwitchTheme()
new Task()
new TasksList()
new SearchField()
new HistoryTasks()
new HeaderMenu()
new CreateTask()
