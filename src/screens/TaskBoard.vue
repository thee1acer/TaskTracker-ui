<template>
  <div class="task-board-screen-container">
    <div class="top-header">
      <div class="top-header-title">TaskTracker</div>
      <div class="top-header-space"></div>

      <div class="top-header-utils">
        <div class="top-header-add-task" @click="isAddingTask = !isAddingTask">
          <div class="top-header-icon-text">Add Task</div>

          <q-icon class="top-header-icon" name="edit_note" size="1.8rem" />
        </div>
        <div class="top-header-profile">
          <div class="top-header-icon-text">Profile</div>

          <q-icon class="top-header-icon" name="account_circle" size="1.8rem" />
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

import { ref, onMounted } from "vue";
import { useApplicationUserStore } from "../store/Pinia/ApplicationUser/ApplicationUserStore.ts";
import { useUserAuthenticationStore } from "../store/Pinia/Auth/UserAunthenticationStore";
import Tasks from "../components/TaskBoard/Tasks.vue"

var applicationUserStore = useApplicationUserStore();
var userAuthStore = useUserAuthenticationStore();

const isAddingTask = ref(true);

onMounted(() => {
  console.log({Initiated_TaskBoard: true});
//fetch all active users and
})
</script>

<style scoped>
.task-board-screen-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.top-header {
  display: grid;
  width: 100%;
  height: 45px;
  grid-template-rows: 1fr;
  grid-template-columns: 5fr 14fr 5fr;
  background-color: rgb(117, 194, 225);
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
}

.top-header-icon-text {
  width: 75%;
  margin-right: 7%;
  height: 100%;
  text-align: right;
  padding-top: 2%;
}

.top-header-space {
  display: flex;
  height: 100%;
}

.top-header-utils {
  height: 100%;
  display: flex;
  grid-template-columns: repeat(2, 1fr);
  gap: 1%;
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
  padding: 1%;
  font-size: 18px;
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
  width: 20%;
  height: 100dvh;
  align-self: start;
  float: left;
  font-weight: bold;
}

.body-content-right {
  padding: 1%;
  background-color: rgb(212, 247, 244);
  width: 80%;
  height: 500px;
  align-self: end;
  float: left;
  height: 100dvh;
}

.tasks-banner {
  background-color: white;
  width: 100%;
  height: 100%;
  align-self: start;
  float: left;
  border-radius: 10px;
}

.tasks-banner-override {
  background-color: white;
  width: 65%;
  height: 100%;
  align-self: start;
  float: left;
  border-radius: 10px;
}

.add-task-banner {
  background-color: white;
  width: 34%;
  height: 100%;
  align-self: end;
  float: left;
  border-radius: 10px;
  margin-left: 1%;
}
</style>
