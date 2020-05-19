<template>
  <!-- 播放器模块 -->
  <div class="player">
    <audio autoplay class="audio" :src="this.srcmp3"></audio>
    <div class="player_img">
      <img height="100%" :src="this.picUrl" alt />
    </div>
    <div class="player_titile">{{this.val}}</div>
    <div class="player_btn" @click="player_button">
      <span @click="play" v-if="!isPlaying" class="iconfont icon-bofang"></span>
      <span @click="stop" v-if="isPlaying" class="iconfont icon-zanting"></span>
    </div>
  </div>
</template>

<script>
import axios from "@/router/myaxios";
export default {
  data() {
    return {
      isPlaying: false,
      srcmp3: "",
      picUrl: "",
      val: ""
      // url: `/song/url?id=${this.id}` 获取歌曲url
    };
  },
  methods: {
    //暂停
    stop() {
      let audio = document.querySelector(".audio");
      if (this.isPlaying) {
        audio.pause();
        this.isPlaying = false;
      }
    },
    // 播放
    play() {
      let audio = document.querySelector(".audio");
      if (!this.isPlaying && this.picUrl != "") {
        console.log(123);
        audio.play();
        this.isPlaying = true;
      }
    },
    //
    player_button() {
      axios({
        url: `/song/url?id=${this.$store.state.id}`
      }).then(res => {
        this.srcmp3 = res.data.data[0].url;
        this.picUrl = this.$store.state.picUrl;
      });
    }
  }
};
</script>

<style lang='less' scoped>
.player {
  color: #fff;
  width: 100%;
  height: 40px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: space-around;
  background: rgba(224, 79, 12, 0.651);
  line-height: 40px;
  .player_btn span {
    font-size: 30px;
  }
  .player_img {
    width: 40px;
    height: 100%;
    //旋转
    animation: circling 8s linear 0s infinite;
    @keyframes circling {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
  .player_img img {
    border-radius: 50%;
  }
}
</style>