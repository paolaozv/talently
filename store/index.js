import { postData } from '~/utils/store'

export const state = () => ({
  content: [],
  currentContent: null,
  comments: [],
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
    state.comments = comments
  },
}

export const actions = {
  async GET_CONTENT({ commit }) {
    const { data: content } = await postData('content', this.$axios)
    commit('SET_CONTENT', content)
  },
  async UPDATE_PROGRESS({ commit }, content) {
    // Next line is before the axios call to avoid making 2 requests. Normally
    // it should be after the call to the server.
    commit('UPDATE_CONTENT', content)
    await this.$axios.post(`content/${content.id}/progress`, {
      progress: content.progress,
    })
  },
  async GET_COMMENTS({ commit }, content) {
    const data = await postData(`content/${content.id}/comments`, this.$axios)
    // commit('SET_COMMENTS', content)
  },
}
