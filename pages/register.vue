<template>
  <div>
    <form @submit.prevent="registerUser">
      <label for="name">Name</label>
      <input type="text" v-model="name" required />
      <label for="email">Email</label>
      <input type="text" v-model="email" required />
      <span v-if="errors.email">{{ errors.email }}</span>
      <label for="password">Password</label>
      <input type="password" v-model="password" required />
      <span v-if="errors.password">{{ errors.password }}</span>
      <button type="submit">Login</button>
      <p v-if="loading">Please wait....</p>
    </form>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Register'
  },
  data() {
    return {
      loading: false,
      name: '',
      email: '',
      password: '',
      errors: {}
    }
  },
  watch: {
    name(value) {
      this.name = value;
      this.validateName(value);
    },
    email(value) {
      this.email = value;
      this.validateEmail(value);
    },
    password(value) {
      this.password = value;
      this.validatePassword(value);
    }
  },
  methods: {
    validateEmail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.errors['email'] = '';
      } else {
        this.errors['email'] = 'Invalid Email Address';
      } 
    },
    validatePassword(value) {
      if (value.length === 0) {
        this.errors['password'] = 'Password required';
      } else {
        this.errors['password'] = '';
      }
    },
    validateName(value) {
      if (value.length === 0) {
        this.errors['name'] = 'Name required';
      } else {
        this.errors['name'] = '';
      }
    },
    async registerUser() {
      this.loading = true;
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      try {
        await this.$axios.post("auth/register", data);
        this.$router.push("/login");
        this.loading = false;
        this.$notify({
          group: "success",
          title: "Success!",
          text: "Account created successfully"
        });
      } catch (error) {
        this.loading = false;
        this.$notify({
          group: "error",
          title: "Error!",
          text: error.response
            ? error.response.data.error
            : "Sorry an error occured, check your internet"
        });
      }
    }
  }
}
</script>

<style lang="css" scoped></style>