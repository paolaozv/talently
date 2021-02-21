<template>
  <div class="container flex a-center j-center">
    <div class="form-container">
      <div class="logo">
        <LinkHome />
      </div>
      <form @submit.prevent="registerUser" class="flex d-column j-center">
        <div class="mb-15 text-left">
          <label for="name">Name</label>
          <input type="text" v-model="name" required class="input" />
          <span v-if="errors.name" class="error-input">{{ errors.name }}</span>
        </div>
        <div class="mb-15 text-left">
          <label for="email">Email</label>
          <input type="text" v-model="email" required class="input" />
          <span v-if="errors.email" class="error-input">{{ errors.email }}</span>
        </div>
        <div class="mb-15 text-left">
          <label for="password">Password</label>
          <input type="password" v-model="password" required class="input" />
          <span v-if="errors.password" class="error-input">{{ errors.password }}</span>
        </div>
        <span v-if="error" class="error-input">{{ error }}</span>
        <button type="submit" class="button-form submit">Register</button>
        <p v-if="loading">Please wait....</p>
      </form>
      <p class="link text-center">
        ¿Ya tienes cuenta?
        <NuxtLink to="/login">Inicia sesión</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  // middleware: 'checkauth',
  layout: 'login-register',
  head: {
    title: 'Register'
  },
  data() {
    return {
      loading: false,
      name: '',
      email: '',
      password: '',
      errors: {},
      error: ''
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
        const res = await this.$axios.post("auth/register", data);
        this.loading = false;
        if (res && res.data && res.data.success) {
          this.$router.push("/login");
        } else {
          this.error = res.data.errors && res.data.errors.email ?
                      res.data.errors.email[0] :
                      res.data.errors.password[0];
        }
      } catch (error) {
        this.loading = false;
        this.error = error;
      }
    }
  }
}
</script>

<style lang="css" scoped>
.form-container {
  min-height: 425px;
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