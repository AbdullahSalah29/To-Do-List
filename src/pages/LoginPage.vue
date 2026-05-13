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
          <div class="text-h5 text-weight-bold q-mt-sm">Task flow</div>
          <div>Welcome back — sign in to continue</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="email"
            label="Email Address"
            type="email"
            outlined
            dense
            class="q-mb-md"
          >
            <template #prepend><q-icon name="alternate_email" /></template>
          </q-input>

          <q-input
            v-model="password"
            label="password"
            type="password"
            outlined
            dense
            class="q-mb-md"
          >
            <template #prepend><q-icon name="lock_outline" /></template>
          </q-input>

          <q-btn
            label="Log in"
            no-caps
            class="full-width bg-primary text-white"
            @click="checkuser"
            :loading="loading"
          >
            <template #loading>
              <q-spinner-dots size="25px" color="white"></q-spinner-dots>
            </template>
          </q-btn>
        </q-card-section>

        <q-card-section class="text-center">
          <div>Don't have an account?</div>
          <q-btn
            label="Create one"
            flat
            no-caps
            to="/register"
            class="text-primary q-ml-xs q-mb-lg"
          ></q-btn>
        </q-card-section>
      </div>
    </div>
  </q-page>
</template>


<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
    };
  },
  computed: {
    ...mapState("UserInfoModule", ["users"]),
  },
  methods: {
    checkuser() {
      if (!this.email || !this.password) {
        this.$q.notify({
          type: "negative",
          message: "must enter all field",
          timeout: 2000,
          position: "top",
        });
        return;
      }

      this.loading = true;

      const check = this.users.find(
        (f) => f.email == this.email && f.password == this.password
      );

      if (check) {



        this.loading = false;
        localStorage.setItem("auth", "true");
        
        this.$q.notify({
          type: "positive",
          message: "Login successful!",
          timeout: 2000,
          position: "top"
        })
        
        this.$router.push("/tasks");



      } else {
        this.$q.notify({
          type: "negative",
          message: "Email or Password not correct",
          timeout: 3000,
          position: "top",
        });
        this.loading = false;
      }
    },
  },
};
</script>