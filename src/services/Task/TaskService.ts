import axios from "../../base-axios";
import { TaskEntityDTO } from "../../models/Task/TaskEntityDTO.";

class TaskService {
  async getAllTasksAsync(): Promise<TaskEntityDTO[]> {
    return axios.get(`task/get-all-tasks`).then((resp) => resp.data);
  }

  async updateTaskAsync(task: TaskEntityDTO): Promise<boolean> {
    return axios.post(`task/update-task`, task).then((resp) => resp.data);
  }

  async deleteTaskAsync(taskId: number): Promise<boolean> {
    return axios.delete(`delete-task/${taskId}`).then((resp) => resp.data);
  }

  async addTaskAsync(task: TaskEntityDTO): Promise<boolean> {
    return axios.post("add-task", task).then((resp) => resp.data);
  }
}

export default new TaskService();
