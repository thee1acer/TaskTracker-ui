<template>
  <div class="tasks-filter">
    <div class="tasks-search">
      <q-input
        outlined
        v-model="searchTasksText"
        label-slot
        clearable
        dense
        placeholder="Search Tasks"
        class="task-input-search"
      ></q-input>
    </div>
    <div class="tasks-filter-func">
      <q-icon class="task-header-icon" name="filter_alt" size="1.8rem" />
    </div>
    <div class="tasks-order">
      <q-icon class="task-header-icon" name="search" size="1.8rem" />
    </div>
    <div class="tasks-add-icon" @click="updateIsAddingTask()">
      <q-icon
        v-if="!isAddingTask"
        class="task-header-icon"
        name="add"
        size="1.8rem"
      />
      <q-icon v-else class="task-header-icon" name="cancel" size="1.8rem" />
    </div>
  </div>

  <div class="tasks-body" v-for="task in tasks">
    <q-list bordered separator>
      <div class="task-list-item">
        <q-item clickable v-rippl selected @click="showModal(task)">
          <q-item-section>
            {{ task.id }} - {{ task.shortDescription }} - [{{ task.state }}]
          </q-item-section>
        </q-item>
        <q-icon
          class="task-list-tem-icon"
          @click="deleteTask(task.id)"
          name="delete"
          size="1.7rem"
          filled
        />
      </div>
    </q-list>
  </div>

  <q-dialog v-model="modalShowing" persistent
    ><q-card class="task-details-modal" align-self="center">
      <div class="task-details-header">
        <div class="task-details-header-left">
          {{ currentTask.taskType }} {{ currentTask.id }}
        </div>
        <div class="task-details-header-right">
          <q-select
            outlined
            dense
            v-model="currentTask.state"
            :options="stateOptions"
            :disable="!isAdmin"
          />
        </div>
      </div>

      <div class="task-details-second-header">
        {{ currentTask.id }} -
        {{ currentTask.shortDescription }}
      </div>

      <div class="task-details-assigned-to">
        <div>Assigned To</div>
        <q-select
          outlined
          dense
          v-model="assignedTo"
          :options="userOptions"
          class="task-details-assigned"
        />
      </div>

      <br />

      <div class="task-details-short-description">
        <div class="task-details-short-description-header">Description</div>

        <q-input
          outlined
          type="textarea"
          class="task-details-short-description-text"
          v-model="currentTask.detailedDescription"
          autofocus
          counter
          @keyup.enter.stop
        />
      </div>

      <div
        v-if="currentTask.taskBlockers?.length > 0"
        class="task-details-blockers-header"
      >
        Blockers
      </div>
      <div
        v-for="blocker in currentTask.taskBlockers"
        class="task-details-blockers"
      >
        Blocker {{ blocker.id }} -
        {{ blocker.blockerReason }}
        {{ blocker.inActive }}
      </div>

      <div class="task-details-buttons">
        <q-btn label="Close" no-caps class="task-details-btn" v-close-popup />

        <q-btn
          label="Save"
          no-caps
          class="task-details-btn"
          @click="saveTaskChanges(currentTask.id)"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup type="ts">
import { defineProps, watch } from 'vue';
import { ref, onMounted, computed, onBeforeMount} from "vue";
import { useTaskStore } from "../../store/Pinia/Task/TaskStore";
import { useApplicationUserStore } from "../../store/Pinia/ApplicationUser/ApplicationUserStore";

const props = defineProps({
  isAddingTask: Boolean
});

const emit = defineEmits(["update:addingTask"]);

const taskStore = useTaskStore();
const userAppStore = useApplicationUserStore();

const searchTasksText = ref("");
const tasks = ref([]);
const currentTask = ref(undefined);
const modalShowing = ref(false);
const assignedTo = ref("");

const stateOptions = ["New","In Progress", "Blocked", "Completed"]

const updateIsAddingTask = () => {
  emit("update:isAddingTask", !props.isAddingTask);
}

const setAllTasks = () => {
  if(taskStore._allTasks != undefined){
    tasks.value = JSON.parse(JSON.stringify(taskStore._allTasks));
  }
};

const userOptions = computed(() => {return userAppStore._allApplicationUsers.map((v) => v.firstName + " " + v.lastName)});

watch(
  () => currentTask.value,
  (currentTaskValue) => {
    if(currentTaskValue != undefined) {
      console.log(currentTaskValue);

      var foundUser = userAppStore._allApplicationUsers.find(v => v.id == currentTaskValue.assignedTo);
      console.log({found: foundUser});
      assignedTo.value =  foundUser.firstName + " " + foundUser.lastName;
    }
  },
    { immediate: true });

watch(
      () => taskStore._allTasks,
      (tasksTrack) => {
        if (tasksTrack != undefined) {
          tasks.value = undefined;
        }
        if (
          tasksTrack != undefined
        ) {
          tasks.value = tasksTrack;
        }
      },
      { immediate: true }
    );

const showModal = (task) => {
  modalShowing.value = true;
  setCurrentlySelectedTask(task)
}

const hideModal = () => {
  modalShowing.value = false;
  currentTask = undefined;
}

const isAdmin = computed(() => {
  return userAppStore._activeApplicationUserRoleId == 3
});

const setCurrentlySelectedTask =  (task) => {
  currentTask.value = task;
  console.log({currentTask: currentTask.value});
}

const saveTaskChanges = async () => {
  await taskStore.updateTask(currentTask.value);

  window.location.reload(); // to implement signalr
}

const deleteTask = async (currentTaskFocus) => {
  await taskStore.deleteTasks(currentTaskFocus);

  window.location.reload(); // to implement signalr
}


onBeforeMount(() => {
  setAllTasks();
});
</script>

<style scoped>
.tasks-filter {
  display: grid;
  width: 100%;
  height: fit-content;
  grid-template-rows: 1fr;
  grid-template-columns: 12fr 1.2fr 1.2fr 1.2fr;
  border-radius: 10px;
}

.tasks-search {
  display: flex;
  padding: 8px;
}

.tasks-filter-func {
  display: flex;
}

.tasks-order {
  display: flex;
}
.tasks-add-icon {
  display: flex;
}

.task-input-search {
  width: 100%;
  height: 100%;
  background-color: rgb(244, 238, 238);
}

.task-header-icon {
  width: 100%;
  margin-top: 13%;
}

.tasks-body {
  padding: 10px;
}

.task-details-modal {
  min-height: 90vh;
  min-width: 100vh;
  padding: 2%;
  background-color: rgb(244, 238, 238);
  border: ;
}

.task-details-header {
  width: 100%;
  font-size: large;
  font-weight: bold;
  display: grid;
  margin-bottom: 10px;
  grid-template-rows: 1fr;
  grid-template-columns: 4fr 1fr;
}
.task-details-header-left {
  display: flex;
}

.task-details-header-right {
  display: flex;
}

.task-details-second-header {
  width: 100%;
  font-size: large;
  padding: 5px 0px 5px 0px;
  background-color: rgb(211, 217, 217);
  padding-left: 5px;
}

.task-details-assigned-to {
  width: 100%;
  font-size: medium;
  padding: 5px 0px 5px 0px;
  background-color: rgb(186, 186, 172);
  padding-left: 5px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 2fr 1fr;
}

.task-details-short-description {
  margin-top: 10vh;
}
.task-details-short-description-header {
  margin-bottom: 2%;
}
.task-details-short-description-text {
}

.task-details-buttons {
  margin-top: 20%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.task-details-btn {
  display: flex;
  width: 100%;
  border-radius: 10px;
  border: 1px solid rgb(196, 193, 193);
}

.task-details-blockers-header {
  font-weight: bolder;
  font-size: medium;
  margin-bottom: 15px;
}

.task-details-blockers {
  border: 1px solid rgb(188, 184, 184);
}

.task-list-item {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 23fr 1fr;
}
.task-list-tem-icon {
  margin-top: 10px;
}

.task-details-assigned {
  width: 200px;
}

.add-task-save {
  margin-top: 10px;
  width: 100%;
  text-align: center;
}

.add-task-save-button {
  width: 80%;
  flex: 1;
  flex-direction: column;
  align-self: end;
  float: right;
}
</style>
