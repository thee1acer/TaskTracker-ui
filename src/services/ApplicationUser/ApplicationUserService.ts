import axios from "../../base-axios";
import { ApplicationUserDTO } from "../../models/ApplicationUserDTO";

class ApplicationUserService {
  async getAllUsers(): Promise<ApplicationUserDTO[]> {
    return axios
      .get(`application-user/get-all-users`)
      .then((resp) => resp.data);
  }

  async updateUserAsync(user: ApplicationUserDTO): Promise<boolean> {
    return axios
      .post(`application-user/update-user`, user)
      .then((resp) => resp.data);
  }

  async deleteUserAsync(userId: number): Promise<boolean> {
    return axios
      .delete(`application-user/delete/${userId}`)
      .then((resp) => resp.data);
  }

  async addUserAsync(user: ApplicationUserDTO): Promise<boolean> {
    return axios
      .post(`application-user/add-user`, user)
      .then((resp) => resp.data);
  }
}

export default new ApplicationUserService();
