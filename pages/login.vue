<template>
  <div class="container flex a-center j-center">
    <div class="form-container">
      <div class="logo">
        <LinkHome />
      </div>
      <form @submit.prevent="loginUser" class="flex d-column j-center">
        <div class="mb-15">
          <label for="email">Email</label>
          <input type="text" v-model="email" required class="input" />
          <span v-if="errors.email" class="error-input">{{ errors.email }}</span>
        </div>
        <div class="mb-15">
          <label for="password">Password</label>
          <input type="password" v-model="password" required class="input" />
          <span v-if="errors.password" class="error-input">{{ errors.password }}</span>
        </div>
        <button class="button-form submit" type="submit">Login</button>
      </form>
      <p class="link text-center">
        ¿Nuevo en Talently?
        <NuxtLink to="/register">Crea una cuenta.</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  // middleware: 'auth',
  layout: 'login-register',
  head: {
    title: 'Login'
  },
  data() {
    return {
      loading: false,
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
    async loginUser() {
      let data = {
        email: this.email,
        password: this.password
      };
      this.loading = true;
      this.$nuxt.$loading.start();
      try {
        let res = await this.$auth.loginWith("local", {
          data
        });
        this.loading = false;
        this.$nuxt.$loading.finish();
      } catch (error) {
        this.loading = false;
        this.$nuxt.$loading.finish();
      }
    }
  }
}
</script>

<style lang="css" scoped>
.form-container {
  min-height: 354px;
  width: 313px;
  border-radius: 4px;
  background-color: #fff;
  padding: 25px;
}

.logo {
  text-align: center;
  margin-bottom: 15px;
}

.submit {
  margin: 15px 0;
}

.link {
  font-size: 12px;
}
</style>