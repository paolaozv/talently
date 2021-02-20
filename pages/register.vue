<template>
  <div>
    <input v-model="email" label="Email" />
    <input
      v-model="password"
      label="Password"
      type="password"
    />
    <button @click="handleLoginClicked">Login</button>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Register'
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleLoginClicked() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: { user: { email: this.email, password: this.password } }
        })
        console.log(response)
        if (response.data.success) {
          this.$router.replace({ name: 'blogs' })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="css" scoped></style>