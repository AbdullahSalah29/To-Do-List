<template>
  <AuthForm
    title="Task flow"
    subtitle="Welcome back — sign in to continue"
    button-label="Log in"
    bottom-text="Don't have an account?"
    bottom-btn-label="Create one"
    bottom-btn-to="/register"
    :loading="loading"
    @submit="checkuser"
  />
</template>

<script>
import { mapState } from "vuex";
import AuthForm from "src/components/AuthForm.vue";

export default {
  components: {
    AuthForm
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState("UserInfoModule", ["users"]),
  },

  methods: {
    checkuser(formData) {
      const { email, password } = formData;

      if (!email || !password) {
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
        (f) => f.email == email && f.password == password
      );

      if (check) {
        this.loading = false;
        localStorage.setItem("auth", "true");

        this.$q.notify({
          type: "positive",
          message: "Login successful!",
          timeout: 2000,
          position: "top",
        });

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