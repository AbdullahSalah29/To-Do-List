<template>
  <q-header class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title class="row items-center q-gutter-sm">
        <q-icon name="task_alt" size="md" />
        <div>
          <div class="text-weight-bold">TaskFlow</div>
          <div class="text-caption">Your productivity hub</div>
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
      })
      this.$router.push("/login");
    },
  },
};
</script>