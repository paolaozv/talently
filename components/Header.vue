<template>
  <nav class="header flex a-center">
    <div class="flex a-center j-between w-100">
      <LinkHome />
      <div v-if="loggedIn">
        <p class="pointer" @click="signOut">Cerrar Sesión</p>
      </div>
      <div class="link" v-else>
        <NuxtLink to="/register">Register</NuxtLink>
        <NuxtLink to="/login">Login</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: this.$auth.loggedIn,
    }
  },
  methods: {
    async signOut() {
      await this.$auth.logout();
      window.location.href = '/';
    }
  }
}
</script>

<style>
.header {
  max-width: 1200px;
  height: 70px;
  margin: 0 auto;
  padding: 15px;
}

</style>
