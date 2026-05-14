<template>
  <q-page class="flex flex-center bg-grey-2 q-pa-md">
    <div class="row full-width justify-center">
      <div class="bg-white col-12 col-sm-8 col-md-5 col-lg-4">
        <q-card-section class="text-center">
          <q-avatar
            size="lg"
            color="primary"
            text-color="white"
            icon="task_alt"
          />
          <div class="text-h5 text-weight-bold q-mt-sm">{{ title }}</div>
          <div>{{ subtitle }}</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-if="showName"
            v-model="formData.name"
            label="Full name"
            outlined
            dense
            autocomplete="name"
            class="q-mb-md"
          >
            <template #prepend><q-icon name="person" /></template>
          </q-input>

          <q-input
            v-model="formData.email"
            label="Email address"
            type="email"
            outlined
            dense
            autocomplete="username"
            class="q-mb-md"
          >
            <template #prepend><q-icon name="alternate_email" /></template>
          </q-input>

          <q-input
            v-model="formData.password"
            label="Password"
            type="password"
            outlined
            dense
            autocomplete="new-password"
            class="q-mb-sm"
          >
            <template #prepend><q-icon name="lock_outline" /></template>
          </q-input>

          <q-btn
            :label="buttonLabel"
            no-caps
            class="full-width bg-primary text-white"
            :loading="loading"
            @click="submitForm"
          >
            <template #loading>
              <q-spinner-dots size="25px" color="white" />
            </template>
          </q-btn>
        </q-card-section>

        <q-card-section class="text-center">
          <div>{{ bottomText }}</div>
          <q-btn
            :label="bottomBtnLabel"
            flat
            no-caps
            :to="bottomBtnTo"
            class="text-primary q-ml-xs q-mb-lg"
          />
        </q-card-section>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String,
    buttonLabel: String,
    bottomText: String,
    bottomBtnLabel: String,
    bottomBtnTo: String,
    showName: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: ''
      }
    }
  },

  methods: {
    submitForm() {
      this.$emit('submit', { ...this.formData })
    }
  }
}
</script>