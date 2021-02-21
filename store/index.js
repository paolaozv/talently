import { postData } from '~/utils/store'

export const state = () => ({
  content: [],
  actualContent: null,
})

export const mutations = {
  SET_CONTENT(state, content) {
    state.content = content
  },
  SET_ACTUAL_CONTENT(state, content) {
    state.actualContent = content
  },
  UPDATE_CONTENT(state, content) {
    const index = state.content.content.findIndex((obj) => obj.id == content.id)
    state.content.content[index].progress = content.progress
    state.actualContent = content
  },
  UPDATE_ACTUAL_CONTENT(state, content) {
    state.actualContent = content
  },
}

export const actions = {
  async GET_CONTENT({ commit }) {
    const { data: content } = await postData('content', this.$axios)
    commit('SET_CONTENT', content)
  },
  async UPDATE_PROGRESS({ commit }, content) {
    await this.$axios.post(`content/${content.id}/progress`, {
      progress: content.progress,
    })
    commit('UPDATE_CONTENT', content)
  },
}
