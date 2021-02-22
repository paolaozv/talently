<template>
  <div>
    <div class="container-lessons" v-if="content.length > 0">
      <div class="container-content">
        <div>
          <div class="container-video" :key="`video-${currentContent.id}`">
            <div class="video">
              <client-only>
                <vimeo-player @ready="onReady" @timeupdate="onTimeUpdate" @loaded="onLoaded" ref="player" :video-id="videoID" :player-height="height" :player-width="width" />
              </client-only>
            </div>
            <div class="text-content">
              <h2>Clase {{ currentContent.id }}</h2>
              <p>{{ currentContent.article.slice(0, 200) }}</p>
            </div>
          </div>
          <i-comments :currentContent="currentContent" :key="`comments-${currentContent.id}`" />
        </div>
        <i-lessoncard :content="content" :currentContent="currentContent" />
      </div>
    </div>
    <div v-else>No hay datos para mostrar</div>
  </div>
</template>

<script>
import LesonCard from "~/components/LesonCard.vue";
import Comments from "~/components/Comments";
import { setcurrentContent, updateProgress } from "~/utils/index";

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
      if (updateProgress(progress, this.currentContent.progress)) {
        this.$store.dispatch('updateProgress', { ...this.currentContent, progress })
      }
    },
    async onLoaded(data, player) {
      try {
        const totalDurationSeconds = await player.getDuration();
        const progressTime = totalDurationSeconds / 10 * this.currentContent.progress;
        await player.setCurrentTime(progressTime)
      } catch (err) {
        console.log("Could not set the progress time", err)
      }
    }
  },
  async asyncData({ store }) {
    await store.dispatch('getContent').then(() => {
      const currentContent = setcurrentContent(store.state.content.content);
      store.commit('SET_CURRENT_CONTENT', currentContent)
    })
  },
  computed: {
    content() {
      return this.$store.state.content.content
    },
    currentContent() {
      return this.$store.state.currentContent
    },
    videoID() {
      // id vimeo video
      // const id = this.$store.state.currentContent.video_url.split('/')?.[3]
      return this.$store.state.currentContent.video_url
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
  border-radius: 4px
}
.video {
  height: 402px;
  background-color: #343434;
}
.text-content {
  padding: 20px;
}
p {
  margin-top: 5px;
}
</style>