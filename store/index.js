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
    // const update = state.content.map((el) => {
    //   if (el.id === content.id) {
    //     el.progress = content.progress
    //   }
    // })
    console.log(state)
    state.actualContent = content
    // state.content = update
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
