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
          <div class="text-h5 text-weight-bold q-mt-sm">Get Started</div>
          <div>Create your account and manage tasks</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="name"
            label="Full name"
            type="name"
            outlined
            dense
            autocomplete="name"
            class="q-mb-md"
          >
            <template #prepend><q-icon name="person" /></template>
          </q-input>

          <q-input
            v-model="email"
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
            v-model="password"
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
            label="Create Account"
            no-caps
            class="full-width bg-primary text-white"
            :loading="loading"
            @click="AddUser"
          >
            <template #loading>
              <q-spinner-dots size="25px" color="white"></q-spinner-dots>
            </template>
          </q-btn>
        </q-card-section>

        <q-card-section class="text-center">
          <div>Already have an account?</div>
          <q-btn
            label="Sign in"
            flat
            no-caps
            to="/login"
            class="text-primary q-ml-xs q-mb-lg"
          ></q-btn>
        </q-card-section>
      </div>
    </div>
  </q-page>
</template>


<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      loading: false,
    };
  },

  computed: {
    ...mapState("UserInfoModule", ["users"]),
  },
  methods: {
    ...mapActions("UserInfoModule", ["adduser"]),

    AddUser() {
      if (!this.name || !this.email || !this.password) {
        this.$q.notify({
          type: "negative",
          message: "Please enter all field",
          timeout: 2000,
          position: "top",
        });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.$q.notify({
          type: "warning",
          message: "Please enter a valid email",
          timeout: 2000,
          position: "top",
        });
        return;
      }

      if (this.password.length < 8) {
        this.$q.notify({
          type: "warning",
          message: "Password must be at least 8 characters",
          timeout: 2000,
          position: "top",
        });
        return;
      }

      const checkemailexist = this.users.find((f) => f.email == this.email);
      if (checkemailexist) {
        this.$q.notify({
          type: "warning",
          message: "Email exist",
          timeout: 2000,
          position: "top",
        });
        return;
      }
      this.loading = true;

      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      this.adduser(user);
      this.$q.notify({
        type: "positive",
        message: "Account created successfully!",
        timeout: 2000,
        position: "top",
      });
      this.loading = false;
      this.$router.push("/login");
    },
  },
};
</script>