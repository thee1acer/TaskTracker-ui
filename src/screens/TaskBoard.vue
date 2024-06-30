<template>
  <div class="task-board-screen-container">
    <div class="top-header">
      <div class="top-header-title">
        <q-icon
          class="top-header-title-icon"
          name="content_paste"
          size="1.8rem"
          color="blue"
        />TaskTracker
      </div>
      <div class="top-header-space"></div>

      <div class="top-header-utils">
        <!---<div class="top-header-add-task" @click="isAddingTask = !isAddingTask">
          <div class="top-header-icon-text">Add Task</div>

          <q-icon class="top-header-icon" name="edit_note" size="1.8rem" />
        </div>--->

        <div class="top-header-profile">
          <div class="top-header-icon-text">{{ getActiveUser }}</div>

          <q-icon
            class="top-header-icon"
            name="account_circle"
            size="1.9rem"
            color="grey"
          />
        </div>
      </div>
    </div>

    <div class="body-content">
      <div class="body-content-left">
        <q-list bordered separator>
          <q-item clickable v-rippl selected>
            <q-item-section
              >Tasks<q-tooltip
                >Manage Tasks: Add, Remove, Or Update your task list</q-tooltip
              >
            </q-item-section>
            <q-icon name="list" size="1.7rem" />
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section
              >Boards<q-tooltip
                >Organize Work: Create and manage boards for project
                planning</q-tooltip
              ></q-item-section
            >
            <q-icon name="ssid_chart" size="1.7rem" />
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section
              >Pipelines<q-tooltip
                >Automate Builds: Configure pipelines to automate build and
                release processes</q-tooltip
              ></q-item-section
            ><q-icon name="plumbing" size="1.7rem" />
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section
              >Repos<q-tooltip
                >Version Control: Manage source code repositories and
                collaborate with teams</q-tooltip
              ></q-item-section
            ><q-icon name="folders" size="1.7rem" />
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section
              >Builds<q-tooltip
                >Compile Code: Build and test your applications with
                customizable build configurations</q-tooltip
              ></q-item-section
            ><q-icon name="cloud_sync" size="1.7rem" />
          </q-item>
        </q-list>
      </div>

      <div class="body-content-right">
        <div
          :class="[!isAddingTask ? 'tasks-banner' : 'tasks-banner-override']"
        >
          <Tasks />
        </div>
        <div class="add-task-banner" v-if="isAddingTask"></div>
      </div>
    </div>
  </div>
</template>

<script setup type="ts">

import { ref, onMounted, computed} from "vue";
import { useApplicationUserStore } from "../store/Pinia/ApplicationUser/ApplicationUserStore.ts";
import { useTaskStore } from "../store/Pinia/Task/TaskStore";
import { useUserAuthenticationStore } from "../store/Pinia/Auth/UserAunthenticationStore";
import Tasks from "../components/TaskBoard/Tasks.vue"

var applicationUserStore = useApplicationUserStore();
var userAuthStore = useUserAuthenticationStore();
var taskStore = useTaskStore();

const isAddingTask = ref(true);


const getActiveUser = computed(()=>  {
   var activeUser = applicationUserStore.activeApplicationUser;
  return activeUser.firstName + " "+ activeUser.lastName;
});


const getAllApplicationUsers = async () => {
  await applicationUserStore.getAllApplicationUsers;
};

const getAllTasks = async () => {
  await taskStore.getAllTasks;
};

onMounted(() => {
  console.log({Initiated_TaskBoard: true});

  getAllApplicationUsers();
  getAllTasks();

  applicationUserStore.setActivelApplicationUserRoleId();

});
</script>

<style scoped>
.task-board-screen-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.top-header {
  display: grid;
  width: 100%;
  height: 45px;
  grid-template-rows: 1fr;
  grid-template-columns: 5fr 14fr 2fr;
  border: 1px ridge rgb(126, 125, 125);
  font-family: "Roboto";
}

.top-header-title {
  display: flex;
  height: 100%;
  padding: 1%;
  margin-left: 2%;
  font-size: x-large;
  font-weight: bold;
}

.top-header-icon {
  width: 24%;
  height: 100%;
  padding-top: 4%;
}

.top-header-icon-text {
  width: 75%;
  margin-right: 6%;
  height: 100%;
  text-align: right;
  padding-top: 9%;
}

.top-header-space {
  display: flex;
  height: 100%;
}

.top-header-utils {
  height: 100%;
  display: flex;
  font-weight: bold;
}

.top-header-add-task {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1%;
  font-size: 18px;
}

.top-header-profile {
  display: flex;
  height: 100%;
  width: 100%;
  padding-right: 8%;
  font-size: auto;
}

.body-content {
  position: relative;
  background-color: azure;
  height: 100%;
  flex: 1;
  overflow-y: auto;
  font-family: "Roboto";
}

.body-content-left {
  border-right: 1px ridge grey;
  background-color: rgb(244, 238, 238);
  width: 15%;
  height: 100dvh;
  align-self: start;
  float: left;
  font-weight: bold;
}

.body-content-right {
  padding: 1%;
  background-color: white;
  width: 85%;
  height: 500px;
  align-self: end;
  float: left;
  height: 100dvh;
}

.tasks-banner {
  background-color: rgb(244, 238, 238);
  width: 100%;
  height: 100%;
  align-self: start;
  float: left;
  border-radius: 10px;
}

.tasks-banner-override {
  background-color: rgb(244, 238, 238);
  width: 65%;
  height: 100%;
  align-self: start;
  float: left;
  border-radius: 10px;
  border: 1px ridge rgb(126, 125, 125);
}

.add-task-banner {
  background-color: rgb(244, 238, 238);
  width: 34%;
  height: 100%;
  align-self: end;
  float: left;
  border-radius: 10px;
  margin-left: 1%;
  border: 1px ridge rgb(126, 125, 125);
}

.top-header-title-icon {
  padding-top: 1%;
  padding-right: 5%;
}
</style>
