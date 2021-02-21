<template>
  <div>
    <div class="container-lessons" v-if="content.length > 0">
      <div class="container-content">
        <div>
          <div class="container-video">
            <client-only>
              <vimeo-player @ready="onReady" @timeupdate="onTimeUpdate" @loaded="onLoaded" ref="player" :video-id="videoID" :player-height="height" :player-width="width" />
            </client-only>
            <div class="text-content">
              <h2>Clase {{ actualContent.id }}</h2>
              <p>{{ actualContent.article.slice(0, 200) }}</p>
            </div>
          </div>
          <i-comments :actualContent="actualContent" />
        </div>
        <i-lessoncard :content="content" :actualContent="actualContent" />
      </div>
    </div>
    <div v-else>No hay datos para mostrar</div>
  </div>
</template>

<script>
import LesonCard from "~/components/LesonCard.vue";
import Comments from "~/components/Comments";
import { setActualContent, updateProgress } from "~/utils/index";

export default {
  middleware: 'auth',
  head: {
    title: 'Lessons'
  },
  data() {
    return {
      user: this.$auth.user,
      height: 402,
      width: 715,
      playerReady: false
    }
  },
  components: {
    "i-lessoncard": LesonCard,
    "i-comments": Comments
  },
  methods: {
    onReady() {
			this.playerReady = true
		},
    onTimeUpdate(data, player) {
      console.log(data, player)
      const progress = Math.floor(data.percent * 10)
      if (updateProgress(progress, this.actualContent.progress)) {
        this.$store.dispatch('UPDATE_PROGRESS', { ...this.actualContent, progress })
      }
    },
    async onLoaded(data, player) {
      try {
        const totalDurationSeconds = await player.getDuration();
        const progressTime = totalDurationSeconds / 10 * this.actualContent.progress;
        await player.setCurrentTime(progressTime)
      } catch (err) {
        console.log("Could not set the progress time", err)
      }
    }
  },
  async asyncData({ store }) {
    await store.dispatch('GET_CONTENT').then(() => {
      const actualContent = setActualContent(store.state.content.content);
      store.commit('SET_ACTUAL_CONTENT', actualContent)
    })
  },
  computed: {
    content() {
      return this.$store.state.content.content
    },
    actualContent() {
      return this.$store.state.actualContent
    },
    videoID() {
      // id vimeo video
      // const id = this.$store.state.actualContent.video_url.split('/')?.[3]
      return this.$store.state.actualContent.video_url
    }
  }
}
</script>

<style lang="css" scoped>
.container-lessons {
  max-width: 1200px;
  min-height: 100vh;
  margin: auto;
  padding: 15px;
}
.container-content {
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.container-video {
  width: 715px;
  background: #fff;
}
.text-content {
  padding: 20px;
}
p {
  margin-top: 5px;
}
</style>