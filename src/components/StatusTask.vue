<template>
  <div class="row q-pa-md justify-center q-gutter-md stats-wrapper">
    <q-card class="stats-card text-center shadow-2 rounded-borders">
      <q-card-section class="bg-white text-dark q-py-lg">
        <q-icon name="format_list_bulleted" color="primary" size="30px" />
        <div class="stats-number q-mt-sm">{{ tasks.length }}</div>
        <div class="stats-label text-grey-7">Total</div>
      </q-card-section>
    </q-card>

    <q-card class="stats-card text-center shadow-2 rounded-borders">
      <q-card-section class="bg-white text-dark q-py-lg">
        <q-icon name="schedule" color="orange" size="30px" />
        <div class="stats-number q-mt-sm">{{ pendingcount }}</div>
        <div class="stats-label text-grey-7">Pending</div>
      </q-card-section>
    </q-card>

    <q-card class="stats-card text-center shadow-2 rounded-borders">
      <q-card-section class="bg-white text-dark q-py-lg">
        <q-icon name="check_circle" color="positive" size="30px" />
        <div class="stats-number q-mt-sm">{{ completecount }}</div>
        <div class="stats-label text-grey-7">Done</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState("TaskInfoModule", ["tasks"]),
    ...mapGetters("TaskInfoModule", ["pendingcount", "completecount"]),
  },
};
</script>

<style scoped>
.stats-wrapper {
  background:
    radial-gradient(circle at 20% 20%, rgba(91, 108, 255, 0.16), transparent 22%),
    radial-gradient(circle at 80% 80%, rgba(124, 77, 255, 0.18), transparent 24%),
    linear-gradient(135deg, #f4f6ff 0%, #eef2ff 35%, #f3edff 70%, #f8f9ff 100%);
}

.stats-card {
  width: 190px;
}

.stats-number {
  font-size: 30px;
  font-weight: 700;
  line-height: 1;
  color: #27304d;
}

.stats-label {
  margin-top: 8px;
  font-size: 15px;
  font-weight: 500;
}
</style>