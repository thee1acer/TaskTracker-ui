import { defineStore } from "pinia";
import { TaskEntityDTO } from "../../../models/Task/TaskEntityDTO.";
import TaskService from "../../../services/Task/TaskService";

interface ApplicationUserState {
  _activeTask?: TaskEntityDTO;
  _activeTaskId?: number;
  _allTasks?: TaskEntityDTO[];
}

export const useTaskStore = defineStore("Application User Store", {
  state: (): ApplicationUserState => ({
    _activeTask: undefined,
    _activeTaskId: undefined,
    _allTasks: undefined
  }),
  getters: {
    activeTask: ({ _activeTask }) => {
      return _activeTask;
    },
    allTasks: ({ _allTasks }) => {
      return _allTasks;
    }
  },
  actions: {
    setActiveTaskId() {
      this._activeTaskId = this._activeTask?.id;
    },
    setActiveTask(task: TaskEntityDTO) {
      this._activeTask = task;
    },
    getAllTasks() {
      TaskService.getAllTasks().then((users) => (this._allTasks = users));
    },
    deleteTasks(taskId: number) {
      TaskService.deleteTaskAsync(taskId).then((res) =>
        console.log({ task_deletion: res })
      );
    },
    addTask(task: TaskEntityDTO) {
      TaskService.addTaskAsync(task).then((res) =>
        console.log({ task_addition: res })
      );
    },
    updateTask(task: TaskEntityDTO) {
      TaskService.updateTaskAsync(task).then((res) =>
        console.log({ task_update: res })
      );
    }
  },
  persist: {
    enabled: true
  }
});
