import axios from "../../base-axios";
import { ApplicationUserDTO } from "../../models/ApplicationUserDTO";

class ApplicationUserService {
  async getAllUsers(): Promise<ApplicationUserDTO[]> {
    return axios.get(`task/get-all-users"`).then((resp) => resp.data);
  }

  async updateUserAsync(task: ApplicationUserDTO): Promise<boolean> {
    return axios.post(`task/update-user`, task).then((resp) => resp.data);
  }

  async deleteUserAsync(taskId: number): Promise<boolean> {
    return axios.delete(`delete-user/${taskId}`).then((resp) => resp.data);
  }

  async addUserAsync(task: ApplicationUserDTO): Promise<boolean> {
    return axios.post("add-user", task).then((resp) => resp.data);
  }
}

export default new ApplicationUserService();
