import { defineStore } from "pinia";
import { ApplicationUserDTO } from "../../../models/ApplicationUserDTO";
import ApplicationUserService from "../../../services/ApplicationUser/ApplicationUserService";

interface ApplicationUserState {
  _activeApplicationUser?: ApplicationUserDTO;
  _allApplicationUsers?: ApplicationUserDTO[];
}

export const useApplicationUserStore = defineStore("Application User Store", {
  state: (): ApplicationUserState => ({
    _activeApplicationUser: undefined,
    _allApplicationUsers: undefined
  }),
  getters: {
    activeApplicationUser: ({ _activeApplicationUser }) => {
      return _activeApplicationUser;
    },
    allApplicationUser: ({ _allApplicationUsers }) => {
      return _allApplicationUsers;
    },
    isAuthenticated: ({ _activeApplicationUser }) => {
      if (
        _activeApplicationUser != undefined &&
        !(_activeApplicationUser.tokenExpiry.getUTCDate > Date.now)
      )
        return true;
      return false;
    },
    isTokenExpired: ({ _activeApplicationUser }) => {
      if (
        _activeApplicationUser != undefined &&
        _activeApplicationUser.tokenExpiry.getUTCDate > Date.now
      )
        return true;
      return false;
    }
  },
  actions: {
    getAllApplicationUsers() {
      ApplicationUserService.getAllUsers().then(
        (users) => (this._allApplicationUsers = users)
      );
    },
    deleteApplicationUser(applicationUserId: number) {
      ApplicationUserService.deleteUserAsync(applicationUserId).then((res) =>
        console.log({ user_deletion: res })
      );
    },
    addApplicationUser(applicationUser: ApplicationUserDTO) {
      ApplicationUserService.addUserAsync(applicationUser).then((res) =>
        console.log({ user_addition: res })
      );
    },
    updateApplicationUser(applicationUser: ApplicationUserDTO) {
      ApplicationUserService.updateUserAsync(applicationUser).then((res) =>
        console.log({ user_update: res })
      );
    },
    logout() {
      this._activeApplicationUser = undefined;
    }
  }
});
