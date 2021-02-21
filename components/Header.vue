<template>
  <nav class="header flex a-center">
    <div class="flex a-center j-between w-100">
      <LinkHome />
      <div v-if="user">
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
import { signout } from '~/utils/index';

export default {
  data() {
    return {
      user: this.$auth.user,
    }
  },
  methods: {
    signOut() {
      signout();
      this.$router.push("/login");
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
