<template>
  <div>
    <h3>lessons</h3>
    <p>{{ user.name }}</p>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  head: {
    title: 'Lessons'
  },
  data() {
    return {
      user: this.$auth.user
    }
  }
}
</script>