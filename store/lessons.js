import { postData } from '~/utils/store'

export const state = () => ({
  content: [],
})

export const mutations = {
  SET_CONTENT(state, content) {
    state.content = content
  },
}

// export const mutations = {
//   SET_VIDEOS(state, videos) {
//     state.videos = videos
//   },
//   ADD_VIDEO(state, video) {
//     let videos = state.videos.concat(video)
//     state.videos = videos
//   },
//   DELETE_VIDEO(state, videoId) {
//     let videos = state.videos.filter((v) => v.id != videoId)
//     state.videos = videos
//   },
//   EDIT_VIDEO(state, video) {
//     editMutation(state.videos, video)
//   },
// }

export const actions = {
  async GET_CONTENT({ commit }) {
    const { data: content } = await postData('content', this.$axios)
    commit('SET_CONTENT', content)
  },
  // async create({ commit }, video) {
  //   let response = await this.$axios.post('/videos', video)
  //   let savedVideo = response.data.data
  //   deserializeVideos([savedVideo])
  //   commit('ADD_VIDEO', savedVideo.attributes)
  //   return savedVideo.attributes
  // },
  // async delete({ commit }, video) {
  //   let response = await this.$axios.delete(`/videos/${video.id}`)
  //   if (response.status == 200 || response.status == 204) {
  //     commit('DELETE_VIDEO', video.id)
  //   }
  // },
  // async edit({ commit }, video) {
  //   let response = await this.$axios.put(`/videos/${video.id}`, video)
  //   let newVideo = response.data.data
  //   deserializeVideos([newVideo])
  //   commit('EDIT_VIDEO', newVideo.attributes)
  //   return newVideo.attributes
  // },
}

// export const getters = {
//   get: (state) => (id) => {
//     return state.videos.find((v) => v.id == id) || {}
//   },
// }
