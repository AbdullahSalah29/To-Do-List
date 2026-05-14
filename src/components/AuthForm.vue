<template>
  <q-page class="auth-page flex flex-center q-pa-md">
    <div class="row full-width justify-center">
      <div class="auth-card col-12 col-sm-8 col-md-5 col-lg-4 bg-white rounded-borders">
        <q-card-section class="text-center auth-header">
          <q-avatar
            size="64px"
            text-color="white"
            icon="task_alt"
            class="auth-avatar"
          />
          <div class="text-h4 text-weight-bold q-mt-md auth-title">{{ title }}</div>
          <div class="auth-subtitle q-mt-sm">{{ subtitle }}</div>
        </q-card-section>

        <q-card-section class="auth-form-section">
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
            class="q-mb-md"
          >
            <template #prepend><q-icon name="lock_outline" /></template>
          </q-input>

          <q-btn
            :label="buttonLabel"
            no-caps
            unelevated
            class="full-width auth-btn"
            :loading="loading"
            @click="submitForm"
          >
            <template #loading>
              <q-spinner-dots size="25px" color="white" />
            </template>
          </q-btn>
        </q-card-section>

        <q-card-section class="text-center auth-footer">
          <div class="footer-text text-grey-7">{{ bottomText }}</div>
          <q-btn
            :label="bottomBtnLabel"
            flat
            no-caps
            :to="bottomBtnTo"
            class="q-mt-xs text-primary text-weight-medium"
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

  emits: ['submit'],

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

<style scoped>
.auth-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 20% 20%, rgba(91, 108, 255, 0.16), transparent 22%),
    radial-gradient(circle at 80% 80%, rgba(124, 77, 255, 0.18), transparent 24%),
    linear-gradient(135deg, #f4f6ff 0%, #eef2ff 35%, #f3edff 70%, #f8f9ff 100%);
}

.auth-card {
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 18px;
  box-shadow: 0 18px 40px rgba(91, 108, 255, 0.12);
  backdrop-filter: blur(8px);
  overflow: hidden;
}

.auth-header {
  padding-top: 30px;
  padding-bottom: 14px;
}

.auth-avatar {
  background: linear-gradient(135deg, #5b6cff, #7c4dff);
  box-shadow: 0 8px 22px rgba(91, 108, 255, 0.25);
}

.auth-title {
  color: #27304d;
}

.auth-subtitle {
  color: #667085;
  font-size: 15px;
}

.auth-form-section {
  padding: 10px 22px 4px;
}

.auth-btn {
  background: linear-gradient(135deg, #5b6cff, #7c4dff);
  color: #ffffff;
  height: 45px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 10px 24px rgba(91, 108, 255, 0.22);
}

.auth-footer {
  padding-top: 16px;
  padding-bottom: 24px;
}
</style>