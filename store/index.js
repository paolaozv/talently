import { postData } from '~/utils/store'

export const state = () => ({
  content: [],
  currentContent: null,
  comments: [],
  selectedComment: null,
  editComment: null,
})

export const mutations = {
  SET_CONTENT(state, content) {
    state.content = content
  },
  SET_CURRENT_CONTENT(state, content) {
    state.currentContent = content
  },
  UPDATE_CONTENT(state, content) {
    const index = state.content.content.findIndex((obj) => obj.id == content.id)
    state.content.content[index].progress = content.progress
    state.currentContent = content
  },
  UPDATE_CURRENT_CONTENT(state, content) {
    state.currentContent = content
  },
  SET_COMMENTS(state, comments) {
    state.comments = comments.comments
  },
  SELECT_COMMENT(state, id) {
    state.selectedComment = id
  },
  UPDATE_COMMENTS(state, data) {
    const newComment = { ...data.comment, user: data.user }
    const comments = state.comments
    const updateList = [...comments, newComment]
    state.comments = updateList
  },
  UPDATE_DELETE_COMMENTS(state, id) {
    const comments = state.comments
    const newCommenst = comments.filter((el) => el.id !== id)
    state.comments = newCommenst
  },
  EDIT_COMMENT(state, data) {
    state.editComment = data
  },
  UPDATE_COMMENT(state, data) {
    const index = state.comments.findIndex((obj) => obj.content_id == data.id)
    state.comments[index].content = data.comment
  },
}

export const actions = {
  async getContent({ commit }) {
    const { data: content } = await postData('content', this.$axios)
    commit('SET_CONTENT', content)
  },
  async updateProgress({ commit }, content) {
    // Next line is before the axios call to avoid making 2 requests. Normally
    // it should be after the call to the server.
    commit('UPDATE_CONTENT', content)
    await this.$axios.post(
      `content/${content.id}/progress`,
      {
        progress: content.progress,
      },
      { progress: false }
    )
  },
  async getComments({ commit }, content) {
    const { data: comments } = await postData(
      `content/${content.id}/comments`,
      this.$axios
    )
    commit('SET_COMMENTS', comments)
  },
  async createComment({ commit }, data) {
    const { data: message } = await this.$axios.post(
      'comment/create',
      data.comment
    )
    const res = { comment: message.message, user: data.user }
    commit('UPDATE_COMMENTS', res)
  },
  async deleteComment({ commit }, id) {
    const data = await this.$axios.delete(`comment/${id}`)
    commit('UPDATE_DELETE_COMMENTS', id)
  },
  async updateComment({ commit }, data) {
    // it should be put but there is no this method for the url
    await this.$axios.post(`comment/${data.id}/update`, {
      content: data.comment,
    })
    commit('UPDATE_COMMENT', data)
  },
}
