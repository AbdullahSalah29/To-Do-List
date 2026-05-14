<template>
  <q-page class="tasks-page q-pa-md">
    <div class="row full-width justify-center">
      <div class="col-12 col-xl-10">
        <div class="row q-col-gutter-lg items-start content-row">
          <div class="col-12 col-md-5">
            <q-card flat bordered class="panel-card rounded-borders">
              <q-card-section>
                <div class="section-title row items-center">
                  <q-icon name="add_circle_outline" class="q-mr-sm title-icon" />
                  New Task
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input
                  v-model="title"
                  label="Task Title"
                  outlined
                  dense
                  autocomplete="name"
                  class="q-mb-md"
                >
                  <template #prepend>
                    <q-icon name="title" />
                  </template>
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
                  <template #prepend>
                    <q-icon name="notes" />
                  </template>
                </q-input>

                <div class="text-center q-mt-sm">
                  <q-btn
                    label="Add Task"
                    no-caps
                    unelevated
                    class="main-btn"
                    icon="add"
                    @click="AddTask"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md-7">
            <q-card flat bordered class="panel-card rounded-borders">
              <q-card-section class="q-pa-sm">
                <q-tabs
                  v-model="status"
                  dense
                  active-color="primary"
                  indicator-color="primary"
                  class="text-grey-7"
                  align="justify"
                  narrow-indicator
                >
                  <q-tab name="all" label="All" no-caps>
                    {{ tasks.length }}
                  </q-tab>
                  <q-tab name="pending" label="Pending" no-caps>
                    {{ pendingcount }}
                  </q-tab>
                  <q-tab name="complete" label="Complete" no-caps>
                    {{ completecount }}
                  </q-tab>
                </q-tabs>
              </q-card-section>

              <q-separator inset />

              <q-card-section class="q-pa-md">
                <q-list bordered separator class="task-list-box rounded-borders bg-white">
                  <q-item
                    clickable
                    v-ripple
                    v-for="task in filtertask"
                    :key="task.id"
                    class="task-item"
                  >
                    <q-item-section avatar top>
                      <q-icon
                        size="30px"
                        :color="task.status == 'pending' ? 'orange' : 'positive'"
                        :name="task.status == 'pending' ? 'schedule' : 'check_circle'"
                      />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="task-title">
                        {{ task.title }}
                      </q-item-label>
                      <q-item-label caption class="task-desc text-grey-7">
                        {{ task.description }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side top class="actions-section">
                      <q-btn
                        icon="edit"
                        flat
                        round
                        color="primary"
                        @click="edit(task)"
                      >
                        <q-tooltip>Edit</q-tooltip>
                      </q-btn>

                      <q-btn
                        icon="delete"
                        flat
                        round
                        color="negative"
                        @click="deleteTask(task.id)"
                      >
                        <q-tooltip>Delete</q-tooltip>
                      </q-btn>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="openedit">
      <q-card class="edit-dialog rounded-borders">
        <q-card-section class="dialog-header row items-center q-gutter-sm">
          <q-icon name="edit_note" color="primary" size="28px" />
          <div class="dialog-title">Edit Task</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-item-label class="dialog-task-title q-mb-md">
            {{ copytask.title }}
          </q-item-label>

          <q-input
            v-model="copytask.description"
            label="Description"
            type="textarea"
            autogrow
            outlined
            dense
            class="q-mb-md"
          />

          <q-option-group
            v-model="copytask.status"
            :options="[
              { label: 'Pending', value: 'pending' },
              { label: 'Done', value: 'complete' },
            ]"
            :color="copytask.status === 'pending' ? 'orange' : 'positive'"
            inline
          />
        </q-card-section>

        <q-card-actions align="right" class="q-px-md q-pb-md">
          <q-btn
            flat
            color="primary"
            label="Save Update"
            no-caps
            @click="saveUpdate"
          />
          <q-btn
            flat
            color="negative"
            label="Close"
            v-close-popup
            no-caps
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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

<style scoped>
.tasks-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 20% 20%, rgba(91, 108, 255, 0.16), transparent 22%),
    radial-gradient(circle at 80% 80%, rgba(124, 77, 255, 0.18), transparent 24%),
    linear-gradient(135deg, #f4f6ff 0%, #eef2ff 35%, #f3edff 70%, #f8f9ff 100%);
}

.content-row {
  margin-top: 4px;
}

.panel-card {
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.75);
  box-shadow: 0 12px 28px rgba(91, 108, 255, 0.08);
  backdrop-filter: blur(8px);
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #27304d;
}

.title-icon {
  color: #7c4dff;
}

.main-btn {
  background: linear-gradient(135deg, #5b6cff, #7c4dff);
  color: white;
  min-width: 145px;
  height: 42px;
  border-radius: 10px;
  font-weight: 600;
  box-shadow: 0 10px 22px rgba(91, 108, 255, 0.18);
}

.task-list-box {
  overflow: hidden;
}

.task-item {
  padding-top: 14px;
  padding-bottom: 14px;
  transition: background-color 0.2s ease;
}

.task-item:hover {
  background: rgba(91, 108, 255, 0.05);
}

.task-title {
  font-size: 16px;
  font-weight: 700;
  color: #27304d;
  margin-bottom: 4px;
}

.task-desc {
  font-size: 13px;
  line-height: 1.6;
}

.actions-section {
  gap: 7px;
}

.edit-dialog {
  width: 420px;
  overflow: hidden;
}

.dialog-title {
  font-size: 22px;
  font-weight: 700;
  color: #27304d;
}

.dialog-task-title {
  font-size: 16px;
  font-weight: 700;
  color: #27304d;
}
</style>