<template>
  <div class="container-comments">
    <h3> {{ comments && comments.length }} Comentarios</h3>
    <div class="container-input flex j-between">
      <div class="photo flex a-center j-center">
        <UserPhoto color="#fff" />
      </div>
      <form @submit.prevent="createComment" class="comment-form">
        <input v-model="comment" required type="text" placeholder="Agregar comentario" class="input comment-input">
        <span v-if="errors.comment" class="error-input">{{ errors.comment }}</span>
      </form>
    </div>
    <div v-if="comments && comments.length > 0">
      <div v-for="comment in comments" :key="comment.id" class="flex j-between container-comment">
        <div class="photo flex a-center j-center user-photo">
          <UserPhoto color="#fff" />
        </div>
        <div class="comment-user">
          <div>
            <h5>{{ comment.user.name }}</h5>
            <span>{{ comment.update_at }}</span>
          </div>
          <div>
            <div v-if="edit && edit.id === comment.id && edit.open" @keydown.esc="cancelEdit">
              <form @submit.prevent="updateComment">
                <input type="text" v-model="editInput" class="input input-edit" ref="editInput">
              </form>
            </div>
            <p v-else class="content">{{ comment.content }}</p>
          </div>
        </div>
        <Options :id="comment.id" :userCommentId="comment.user.id" :content="comment.content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$auth.user,
      comment: '',
      errors: {},
      editInput: ''
    }
  },
  props: {
    currentContent: {
      type: Object,
      required: true
    }
  },
  async mounted() {
    await this.$store.dispatch('getComments', this.currentContent)
  },
  watch: {
    comment(value) {
      this.comment = value;
      this.validateComment(value);
    }
  },
  computed: {
    comments() {
      return this.$store.state.comments
    },
    edit() {
      return this.$store.state.editComment
    }
  },
  methods: {
    createComment() {
      const comment = {
        content: this.comment,
        user_id: this.user.id,
        content_id: this.currentContent.id
      }
      const user = {
        id: this.user.id,
        name: this.user.name
      }
      this.$store.dispatch('createComment', { comment, user })
      this.comment = " "
    },
    validateComment(value) {
      if (value.length === 0) {
        this.errors['comment'] = 'Comment required';
      } else {
        this.errors['comment'] = '';
      }
    },
    cancelEdit() {
      this.$store.commit('EDIT_COMMENT', null)
    },
    focusEditInput() {
      this.editInput = this.edit.content;
      this.$refs.editInput[0].focus();
    },
    updateComment() {
      const user = {
        id: this.user.id,
        name: this.user.name
      }
      this.$store.dispatch('updateComment', { comment: this.editInput, id: this.edit.id, user })
      this.$store.commit('EDIT_COMMENT', null)
    }
  }
}
</script>

<style lang="css" scoped>
.container-comments {
  width: 715px;
  margin-top: 25px;
}
.container-input {
  height: auto;
  border-radius: 4px;
  background-color: #fff;
  padding: 10px;
  margin-top: 5px;
}
.photo {
  border-radius: 50%;
  height: 38px;
  width: 38px;
  background-color: #30308C;
}
.comment-form {
  width: calc(100% - 50px);
}
.comment-input {
  width: 100%;
  border-color: #ECF1F6;
  background-color: #ECF1F6;
}
.container-comment {
  border-radius: 4px;
  background-color: #fff;
  padding: 10px;
  height: auto;
  margin-top: 15px;
  position: relative;
}
.user-photo {
  background-color: #80808A;
}
.comment-user {
  margin-left: 10px;
  width: calc(100% - 60px);
}
.content {
  font-size: 13px;
}
.input-edit {
  width: 100%;
  border-color: #ECF1F6;
  background-color: #ECF1F6;
  margin-top: 5px;
}
</style>