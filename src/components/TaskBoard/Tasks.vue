<template>
  <div class="tasks-filter">
    <div class="tasks-search">
      <q-input
        outlined
        v-model="number"
        prefix="$"
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
  </div>
  <div class="tasks-body">
    <q-list bordered separator>
      <q-item clickable v-rippl selected>
        <q-item-section>
          109982 - Manage Tasks: Add, Remove, Or Update your task list
        </q-item-section>
        <q-icon name="list" size="1.7rem" />
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          109212 - Organize Work: Create and manage boards for project
          planning</q-item-section
        >
        <q-icon name="ssid_chart" size="1.7rem" />
      </q-item>
    </q-list>
  </div>
</template>

<script setup type="ts"></script>

<style scoped>
.tasks-filter {
  display: grid;
  width: 100%;
  height: fit-content;
  grid-template-rows: 1fr;
  grid-template-columns: 12fr 1.2fr 1.2fr;
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
</style>
