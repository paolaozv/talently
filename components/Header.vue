<template>
  <nav class="header flex a-center">
    <div class="flex a-center j-between w-100">
      <LinkHome />
      <div class="link">
        <NuxtLink to="/register">Register</NuxtLink>
        <NuxtLink to="/login">Login</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style>
.header {
  max-width: 1200px;
  height: 70px;
  margin: 0 auto;
  padding: 15px;
}

</style>
