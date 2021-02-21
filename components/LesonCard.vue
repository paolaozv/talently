<template>
  <div class="container-lesson">
    <h3>Contenido</h3>
    <div v-if="content.length > 0">
      <div v-for="cont in content" :key="cont.id" :class="{'lesson': true, 'active': actualContent.id === cont.id}" @click="updateContent(cont)" >
        <div class="player">
          <client-only>
            <vimeo-player @ready="onReady" ref="player" :video-id="cont.video_url" :player-height="height" :player-width="width" />
          </client-only>
        </div>
        <div class="content">
          <div class="left">
            <h6>Clase {{ cont.id }}</h6>
            <p>{{ cont.description }}</p>
          </div>
          <div class="progress">
            <div v-if="cont.progress < 10" class="uncompleted">
              <div class="background-left" :style="{ 'z-index': `${cont.progress <= 5 ? 30 : 15 }` }"></div>
              <div class="background-right"></div>
              <div class="foreground-left" :style="{ 'transform': `rotate(${(Math.max(5, cont.progress) - 10)/10}turn` }"></div>
              <div class="foreground-right" :style="{ 'transform': `rotate(${(Math.min(5, cont.progress) - 5)/10}turn` }"></div>
            </div>
            <div v-else class="done">
              <Done />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>No hay data para mostrar</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: 62,
      width: 80,
      playerReady: false
    }
  },
  props: {
    content: {
      type: Array,
      required: true
    },
    actualContent: {
      type: Object,
      required: true
    }
  },
  methods: {
    onReady() {
			this.playerReady = true
		},
    updateContent(content) {
      this.$store.commit('UPDATE_ACTUAL_CONTENT', content)
    }
  }
}
</script>

<style lang="css" scoped>
.container-lesson {
  background-color: #fff;
  width: 332px;
  height: auto;
  padding: 20px;
}
.lesson {
  display: flex;
  cursor: pointer;
}
h3 {
  margin-bottom: 20px;
}
p {
  font-size: 9px;
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: calc(100% - 80px);
}
.left {
  width: 80%;
}
.uncompleted {
  width: 22px;
  height: 22px;
  position: relative;
}
.progress .background-left {
  height: 100%;
  width: 50%;
  border: 2px solid #EEECEC;
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 22px;
  border-bottom-left-radius: 22px;
  border-right: 0;
  z-index: 10; /* becomes 30 if < 50% */
}
.progress .background-right {
  height: 100%;
  width: 50%;
  border: 2px solid #EEECEC;
  position: absolute;
  top: 0;
  left: 11px;
  border-top-right-radius: 22px;
  border-bottom-right-radius: 22px;
  border-left: 0;
  z-index: 20;
}
.progress .foreground-left {
  
  height: 100%;
  width: 50%;
  border: 2px solid #30308C;
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 22px;
  border-bottom-left-radius: 22px;
  border-right: 0;
  z-index: 15;
  /* transform: rotate(-50deg); */
  transform-origin: center right;
}
.progress .foreground-right {
  height: 100%;
  width: 50%;
  border: 2px solid #30308C;
  position: absolute;
  top: 0;
  left: 11px;
  border-top-right-radius: 22px;
  border-bottom-right-radius: 22px;
  border-left: 0;
  z-index: 25;
  transform: rotate(-50deg);
  transform-origin: center left;
}
.left-bar {
  border-radius: 50%;
  height: 100%;
  width: 100%;
  border: 0.1em solid #EEECEC;
  position: absolute;
  top: 0;
  left: 0;
}
.right-bar {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  border: 0.1em solid #EEECEC;
  position: absolute;
  top: 0;
  left: 0;
}
.done {
  width: 22px;
  height: 22px;
  background-color: #30308C;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.player {
  height: 62px;
  width: 80px;
}
.active {
  background-color:  #EEECEC;
}
</style>