<template>
  <q-header class="task-header text-white">
    <q-toolbar class="header-toolbar q-px-md">
      <q-toolbar-title class="row items-center q-gutter-sm">
        <q-icon name="task_alt" size="26px" />
        <div>
          <div class="header-title">TaskFlow</div>
          <div class="header-subtitle">Your productivity hub</div>
        </div>
      </q-toolbar-title>

      <q-btn flat round dense icon="logout" @click="loguot">
        <q-tooltip>Logout</q-tooltip>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  methods: {
    loguot() {
      localStorage.removeItem("auth");
      this.$q.notify({
        type: "info",
        message: "Logged out successfully.",
        timeout: 2000,
        position: "top"
      });
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.task-header {
  background: linear-gradient(135deg, #5b6cff, #7c4dff);
}

.header-toolbar {
  min-height: 58px;
}

.header-title {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.1;
}

.header-subtitle {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.82);
  margin-top: 1px;
}
</style>