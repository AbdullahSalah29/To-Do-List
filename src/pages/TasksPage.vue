<template>
  <q-page>
    <task-header></task-header>
    <status-task></status-task>
    <tasks-view></tasks-view>
  </q-page>
</template>


<script>
import TaskHeader from "src/components/TaskHeader.vue";
import TasksView from "src/components/TasksView.vue";
import StatusTask from "src/components/StatusTask.vue";
export default {
  components: {
    TaskHeader,
    TasksView,
    StatusTask,
  },
};
</script>