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
      <q-item clickable v-rippl selected @click="showModal()">
        <q-item-section>
          {{ task.id }} - {{ task.shortDescription }} - [{{ task.state }}]
        </q-item-section>

        <q-icon name="list" size="1.7rem" />
      </q-item>
    </q-list>
  </div>

  <q-dialog v-model="modalShowing" persistent
    ><q-layout class="task-details-modal" align-self="center">
      <q-btn label="close" v-close-popup />
    </q-layout>
  </q-dialog>
</template>

<script setup type="ts">
import { defineProps } from 'vue';
import { ref, onMounted, computed, onBeforeMount} from "vue";
import { useTaskStore } from "../../store/Pinia/Task/TaskStore";

const props = defineProps({
  isAddingTask: Boolean
});

const emit = defineEmits(["update:addingTask"]);

const taskStore = useTaskStore();

const searchTasksText = ref("");
const tasks = ref([]);
const modalShowing = ref(false);

const updateIsAddingTask = () => {
  emit("update:isAddingTask", !props.isAddingTask);
}

const setAllTasks = () => {
  tasks.value = JSON.parse(JSON.stringify(taskStore._allTasks));
};

const showModal = () => {
  modalShowing.value = true;
}

const hideModal = () => {
  modalShowing.value = false;
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
  background-color: white;
  height: 100%;
}
</style>
