import { defineStore } from "pinia";
import { TaskEntityDTO } from "../../../models/Task/TaskEntityDTO.";
import TaskService from "../../../services/Task/TaskService";

interface ApplicationUserState {
  _activeTask?: TaskEntityDTO;
  _activeTaskId?: number;
  _allTasks?: TaskEntityDTO[];
}

export const useTaskStore = defineStore("Task Store", {
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
      TaskService.getAllTasksAsync().then((tasks) => (this._allTasks = tasks));
    },
    deleteTasks(taskId: number) {
      TaskService.deleteTaskAsync(taskId).then((res) => {
        console.log({ task_deletion: res });
        window.location.reload(); // to implement signalr
      });
    },
    addTask(
      matchingAssignedUserId: number,
      shortDescription: string,
      detailedDescription: string
    ) {
      const task: TaskEntityDTO = {
        id: 0,
        assignedTo: matchingAssignedUserId,
        shortDescription: shortDescription,
        detailedDescription: detailedDescription,
        state: "New",
        taskType: "User Story",
        taskPriority: 1,
        taskStoryPoints: 1,
        taskStoryEffort: 4,
        createdBy: null,
        createdOn: null,
        modifiedBy: null,
        modifiedOn: null
      };

      TaskService.addTaskAsync(task).then((res) => {
        console.log({ task_addition: res });
        window.location.reload(); // to implement signalr
      });
    },
    async updateTaskAsync(task: TaskEntityDTO) {
      await TaskService.updateTaskAsync(task).then((res) => {
        console.log({ task_update: res });
        window.location.reload(); // to implement signalr
      });
    }
  },
  persist: {
    enabled: true
  }
});
