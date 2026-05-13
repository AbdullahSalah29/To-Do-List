<template>
  <div class="row q-pa-md justify-center q-gutter-md">
    <q-card style="width: 200px" class="text-center">
      <q-card-section class="bg-white text-black">
        <q-icon name="format_list_bulleted" color="primary" size="md"></q-icon>
        <div class="text-h6">{{ tasks.length }}</div>
        <div class="text-subtitle2">Total</div>
      </q-card-section>
    </q-card>

    <q-card style="width: 200px" class="text-center">
      <q-card-section class="bg-white text-black">
        <q-icon name="schedule" color="orange" size="md"></q-icon>

        <div class="text-h6">{{ pendingcount }}</div>
        <div class="text-subtitle2">Pending</div>
      </q-card-section>
    </q-card>

    <q-card style="width: 200px" class="text-center">
      <q-card-section class="bg-white text-black">
        <q-icon name="check_circle" color="positive" size="md"></q-icon>
        <div class="text-h6">{{ completecount }}</div>
        <div class="text-subtitle2">Done</div>
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