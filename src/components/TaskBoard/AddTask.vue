<template>
  <div class="add-task-title">Add Task</div>

  <div class="add-task-assigned">
    <div>Assigned To</div>
    <q-select outlined dense v-model="assignedTo" :options="userOptions" />
  </div>

  <div>
    <div class="add-task-description">Short Description</div>
    <q-input
      outlined
      type="textarea"
      class="task-details-short-description-text"
      v-model="shortDescription"
      autofocus
      counter
      @keyup.enter.stop
    />
  </div>

  <div>
    <div class="add-task-description">Detailed Description</div>
    <q-input
      outlined
      type="textarea"
      class="task-details-short-description-text"
      v-model="detailedDescription"
      autofocus
      counter
      @keyup.enter.stop
    />
  </div>

  <div class="add-task-save">
    <q-btn
      no-caps
      @click="addNewTask()"
      label="Add Task"
      class="add-task-save-button"
    />
  </div>
</template>

<script setup type="ts">
import { defineProps, watch } from 'vue';
import { ref, onMounted, computed, onBeforeMount} from "vue";
import { useTaskStore } from "../../store/Pinia/Task/TaskStore";
import { useApplicationUserStore } from "../../store/Pinia/ApplicationUser/ApplicationUserStore";

const taskStore = useTaskStore();
const userAppStore = useApplicationUserStore();

const assignedTo = ref("");
const shortDescription = ref("")
const detailedDescription = ref("");

const userOptions = computed(() => {return userAppStore._allApplicationUsers.map((v) => v.firstName + " " + v.lastName)});

const addNewTask = async () => {
    const matchingAssignedUserId = userAppStore._allApplicationUsers.filter((v) => (v.firstName + " " + v.lastName) == assignedTo.value)[0].id;

    await taskStore.addTask(matchingAssignedUserId, shortDescription.toString(), detailedDescription.toString());
    //window.location.reload(); //to implement signalr
};
</script>

<style scoped></style>

<style>
.add-task-title {
  font-size: x-large;
  font-weight: bold;
  width: 100%;
  padding-bottom: 10px;
}
.add-task-description {
  font-size: medium;
  font-weight: bold;
  width: 100%;
  padding-bottom: 10px;
}
.add-task-assigned {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 2fr 1fr;
  width: 100%;
  font-size: medium;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
