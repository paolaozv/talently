<template>
  <div>
    <form @submit.prevent="loginUser">
      <label for="email">Email</label>
      <input type="text" v-model="email" required />
      <span v-if="errors.email">{{ errors.email }}</span>
      <label for="password">Password</label>
      <input type="password" v-model="password" required />
      <span v-if="errors.password">{{ errors.password }}</span>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Login'
  },
  data() {
    return {
      email: '',
      password: '',
      errors: {}
    }
  },
  watch: {
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
    loginUser() {
      alert('login');
    }
  }
}
</script>

<style lang="css" scoped></style>