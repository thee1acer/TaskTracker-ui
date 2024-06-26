import axios from "../../base-axios";
import { ApplicationUserDTO } from "../../models/ApplicationUserDTO";
import { LoginAuthDataDTO } from "../../models/LoginAuthDataDTO";

class UserAuthenticationService {
  async registerUserAsync(user: ApplicationUserDTO): Promise<boolean> {
    return axios
      .post(`authentication/register-user`, user)
      .then((resp) => resp.data);
  }

  async loginUserAsync(loginAuth: LoginAuthDataDTO): Promise<LoginAuthDataDTO> {
    return axios
      .post(`authentication/login-user`, loginAuth)
      .then((resp) => resp.data);
  }
}

export default new UserAuthenticationService();
