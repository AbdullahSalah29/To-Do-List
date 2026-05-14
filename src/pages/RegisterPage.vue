<template>
  <AuthForm
    title="Get Started"
    subtitle="Create your account and manage tasks"
    button-label="Create Account"
    bottom-text="Already have an account?"
    bottom-btn-label="Sign in"
    bottom-btn-to="/login"
    :show-name="true"
    :loading="loading"
    @submit="AddUser"
  />
</template>

<script>
import { mapState, mapActions } from "vuex";
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
    ...mapActions("UserInfoModule", ["adduser"]),

    AddUser(formData) {
      const { name, email, password } = formData;

      if (!name || !email || !password) {
        this.$q.notify({
          type: "negative",
          message: "Please enter all field",
          timeout: 2000,
          position: "top",
        });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        this.$q.notify({
          type: "warning",
          message: "Please enter a valid email",
          timeout: 2000,
          position: "top",
        });
        return;
      }

      if (password.length < 8) {
        this.$q.notify({
          type: "warning",
          message: "Password must be at least 8 characters",
          timeout: 2000,
          position: "top",
        });
        return;
      }

      const checkemailexist = this.users.find((f) => f.email == email);
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

      const user = { name, email, password };
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