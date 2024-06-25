import axios from "../../base-axios";
import { ApplicationUserDTO } from "../../models/ApplicationUserDTO";

class UserAuthenticationService {
  async registerUserAsync(user: ApplicationUserDTO): Promise<boolean> {
    return axios
      .post(`authentication/register-user`, user)
      .then((resp) => resp.data);
  }

  async loginUserAsync(user: ApplicationUserDTO): Promise<boolean> {
    return axios
      .post(`authentication/logn-user`, user)
      .then((resp) => resp.data);
  }
}

export default new UserAuthenticationService();
