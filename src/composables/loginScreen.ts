import { ref } from "vue";
import { useApplicationUserStore } from "../store/Pinia/ApplicationUser/ApplicationUserStore";
import { useUserAuthenticationStore } from "../store/Pinia/Auth/UserAunthenticationStore";

export function loginScreen() {
  const email = ref("");
  const password = ref("");

  var applicationUserStore = useApplicationUserStore();
  var userAuthStore = useUserAuthenticationStore();

  const validateEmailAdress = (): true | string => {
    if (!email.value) return "Field is required";

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email.value)) {
      return "Invalid email format";
    }

    if (
      !email.value.toLowerCase().endsWith("@gmail.com") &&
      !email.value.toLowerCase().endsWith("@outlook.com")
    ) {
      return "Email must be @gmail.com or @outlook.com";
    }

    return true;
  };

  const validatePassword = (): true | string => {
    if (!password.value) return "Field is required";

    return true;
  };

  const appLogin = async () => {
    const loginData = { email: email.value, unhashedPassword: password.value };

    /*var response = await userAuthStorelogUserIn(loginData);

    if (response != undefined)
      applicationUserStore._activeApplicationUser(response);
    */
  };

  const googleLogin = async () => {};

  return {
    email,
    password,
    validateEmailAdress,
    validatePassword,
    appLogin,
    googleLogin
  };
}
