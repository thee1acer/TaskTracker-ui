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
      TaskService.deleteTaskAsync(taskId).then((res) =>
        console.log({ task_deletion: res })
      );
    },
    addTask(
      matchingAssignedUserId: number,
      shortDescription: string,
      detailedDescription: string
    ) {
      console.log(shortDescription);
      console.log(detailedDescription);

      const task: TaskEntityDTO = {
        id: 0,
        assignedTo: matchingAssignedUserId,
        shortDescription: "Dummy Short Description",
        detailedDescription: "Dummy Detailed Description",
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

      TaskService.addTaskAsync(task).then((res) =>
        console.log({ task_addition: res })
      );
    },
    updateTask(task: TaskEntityDTO) {
      console.log({ hit: task });
      TaskService.updateTaskAsync(task).then((res) =>
        console.log({ task_update: res })
      );
    }
  },
  persist: {
    enabled: true
  }
});
