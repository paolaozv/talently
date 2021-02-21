<template>
  <div>
    <h3>Comentarios</h3>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
      
  //   }
  // },
  props: {
    currentContent: {
      type: Object,
      required: true
    }
  },
  async asyncData({ store }) {
    await store.dispatch('GET_COMMENTS')
  },
  computed: {
    comments() {
      // return this.$store.state.content.content
    },
  }
}
</script>

<style lang="css" scoped>
</style>