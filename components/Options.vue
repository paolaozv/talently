<template>
  <div>
    <div class="dots" @click="selectedComment">
      <Dots />
    </div>
    <div v-show="selectedId === id" class="options">
      <div class="flex a-end pointer">
        <Pen />
        <p class="option">Editar</p>
      </div>
      <div class="flex a-end pointer">
        <Trash />
        <p class="option">Eliminar</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$auth.user,
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    selectedComment() {
      this.$store.commit('SELECT_COMMENT', this.id)
    }
  },
  computed: {
    selectedId() {
      return this.$store.state.selectedComment
    },
  }
}
</script>

<style lang="css" scoped>
.dots {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.options {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 80px;
  width: 120px;
  background-color: #fff;
  z-index: 2;
  padding: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.option {
  margin-left: 8px;
  margin-bottom: 8px;
  font-size: 14px;
}
</style>