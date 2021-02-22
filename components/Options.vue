<template>
  <div v-if="userCommentId === user.id">
    <div class="dots" @click="selectedComment">
      <Dots />
    </div>
    <div v-show="selectedId === id" class="options">
      <div class="flex a-end pointer" @click="editComment">
        <Pen />
        <p class="option">Editar</p>
      </div>
      <div class="flex a-end pointer" @click="deleteComment">
        <Trash />
        <p class="option">Eliminar</p>
      </div>
    </div>
    <div v-if="selectedId === id" class="outside" @click="away"></div>
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
    },
    userCommentId: {
      type: Number,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  methods: {
    selectedComment() {
      this.$store.commit('SELECT_COMMENT', this.id)
    },
    deleteComment() {
      this.$store.dispatch('deleteComment', this.id)
    },
    editComment() {
      this.$store.commit('EDIT_COMMENT', { id: this.id, open: true, content: this.content })
      this.$store.commit('SELECT_COMMENT', null)
      this.$nextTick(() => {
        this.$parent.focusEditInput();
      })
    },
    away() {
      this.$store.commit('SELECT_COMMENT', null)
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
.outside {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 0;
}
</style>