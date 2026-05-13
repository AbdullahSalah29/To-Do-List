<template>
  <q-page class="bg-grey-2 q-pa-md">
    <div class="row full-width justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <div class="row q-pa-md justify-center items-start q-gutter-md">
          <div
            class="bg-white text-black add-task q-pa-sm"
            style="width: 500px"
          >
            <div class="q-ma-sm q-pa-sm text-h8 text-bold">
              <q-icon name="add_circle_outline"></q-icon>
              New Task
            </div>
            <q-input
              v-model="title"
              label="Task Title"
              outlined
              dense
              autocomplete="name"
              class="q-mb-md"
            >
              <template #prepend><q-icon name="title" /></template>
            </q-input>

            <q-input
              v-model="description"
              label="Description"
              type="textarea"
              outlined
              dense
              autogrow
              class="q-mb-md"
            >
              <template #prepend><q-icon name="notes" /></template>
            </q-input>

            <div class="text-center">
              <q-btn
                label="Add Task"
                no-caps
                class="bg-primary text-white"
                icon="add"
                @click="AddTask"
              />
            </div>
          </div>

          <div
            class="q-pl-sm q-pr-sm task-status col q-gutter-y-md bg-white text-black"
            style="width: 500px"
          >
            <q-card>
              <q-tabs
                v-model="status"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                narrow-indicator
              >
                <q-tab name="all" label="All" no-caps>
                  {{ tasks.length }}</q-tab
                >
                <q-tab name="pending" label="Pending" no-caps>{{
                  pendingcount
                }}</q-tab>
                <q-tab name="complete" label="Complete" no-caps>{{
                  completecount
                }}</q-tab>
              </q-tabs>
            </q-card>

            <div class="task-lists q-pa-md" style="max-width: 500px">
              <q-list bordered separator>
                <q-item
                  clickable
                  v-ripple
                  v-for="task in filtertask"
                  :key="task.id"
                >
                  <q-item-section>
                    <q-icon
                      size="lg"
                      :color="task.status == 'pending' ? 'orange' : 'positive'"
                      :name="
                        task.status == 'pending' ? 'schedule' : 'check_circle'
                      "
                    />
                    <q-item-label class="text-h6 q-pt-sm q-pb-sm">
                      {{ task.title }}</q-item-label
                    >
                    <q-item-label caption> {{ task.description }}</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-btn
                      icon="edit"
                      flat
                      class="text-primary q-pa-sm"
                      round
                      @click="edit(task)"
                    >
                      <q-tooltip>Edit</q-tooltip>

                      <q-dialog v-model="openedit">
                        <q-card style="width: 400px">
                          <q-card-section>
                            <q-icon
                              name="edit_note"
                              color="primary"
                              size="md"
                            />
                            <div class="text-h6">Edit Task</div>
                          </q-card-section>

                          <q-card-section class="q-pt-none">
                            <q-item-label class="text-h6 q-pt-sm q-pb-sm">
                              {{ copytask.title }}
                            </q-item-label>
                            <q-input
                              v-model="copytask.description"
                              label="Description"
                              type="textarea"
                              autogrow
                            >
                            </q-input>
                            <q-option-group
                              v-model="copytask.status"
                              :options="[
                                { label: 'Pending', value: 'pending' },
                                { label: 'Done', value: 'complete' },
                              ]"
                              :color="
                                copytask.status === 'pending'
                                  ? 'orange'
                                  : 'positive'
                              "
                              inline
                            />
                          </q-card-section>

                          <q-card-actions align="right">
                            <q-btn
                              flat
                              color="primary"
                              label="Save Update"
                              no-caps
                              @click="saveUpdate"
                            />
                            <q-btn
                              flat
                              color="red"
                              label="Close"
                              v-close-popup
                              no-caps
                            />
                          </q-card-actions>
                        </q-card>
                      </q-dialog>
                    </q-btn>

                    <q-btn
                      icon="delete"
                      flat
                      class="text-red q-pa-sm"
                      round
                      @click="deleteTask(task.id)"
                    >
                      <q-tooltip>Delete</q-tooltip>
                    </q-btn>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>




<script>
import { mapState, mapActions, mapGetters } from "vuex";

import { uid } from "quasar";
export default {
  data() {
    return {
      status: "all",
      title: "",
      description: "",
      openedit: false,
      copytask: {},
    };
  },

  computed: {
    ...mapState("TaskInfoModule", ["tasks"]),
    ...mapGetters("TaskInfoModule", ["pendingcount", "completecount"]),

    filtertask() {
      if (this.status === "all") return this.tasks;
      return this.tasks.filter((f) => f.status === this.status);
    },
  },

  methods: {
    ...mapActions("TaskInfoModule", ["addtask", "deletetask", "edittask"]),

    AddTask() {
      if (!this.title) {
        this.$q.notify({
          type: "negative",
          message: "please enter title",
          timeout: 2000,
          position: "top",
        });
        return;
      }
      const task = {
        id: uid(),
        title: this.title,
        description: this.description,
        status: "pending",
      };
      this.addtask(task);
      this.$q.notify({
        type: "positive",
        message: "task added",
        timeout: 2000,
        position: "top",
      });
      this.title = "";
      this.description = "";
    },

    edit(task) {
      this.openedit = true;
      this.copytask = { ...task };
    },

    saveUpdate() {
      this.edittask(this.copytask);
      this.openedit = false;
      this.$q.notify({
        type: "positive",
        message: "task updated",
        timeout: 2000,
        position: "top",
      });
    },

    deleteTask(id) {
      this.deletetask(id);
      this.$q.notify({
        type: "positive",
        message: "task deleted",
        timeout: 2000,
        position: "top",
      });
    },
  },
};
</script>