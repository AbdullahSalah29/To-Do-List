<template>
  <q-page>
    <status-task></status-task>
    <tasks-view></tasks-view>
  </q-page>
</template>


<script>
import TasksView from "src/components/TasksView.vue";
import StatusTask from "src/components/StatusTask.vue";
export default {
  components: {
    TasksView,
    StatusTask,
  },
};
</script>