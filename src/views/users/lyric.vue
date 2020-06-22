<template>
  <div class="lyric">
    <!-- 头部返回按钮 -->
    <div class="headers">
      <span @click="go" class="iconfont 1_music83 icon-1_music83"></span>
    </div>
    <!-- 图片播放 -->
    <div class="song_wrap">
      <i
        style="color:#333"
        class="iconfont 1_music94 icon-1_music94"
        v-show="icon"
        @click="clicks"
      ></i>
      <div class="song_disc">
        <div
          class="song_img an"
          @click="stop"
          :style="{ 'animation-play-state': isan }"
        >
          <img :src="picUrl" alt />
        </div>
      </div>
    </div>
    <!-- 歌词显示 -->
    <div class="lyric_item" ref="box">
      <div id="a">
        <div
          class="lyric_songs"
          v-for="(item, index) in songLyric"
          :key="index"
        >
          <p :class="{ active: isActive }">{{ item.words }}</p>
        </div>
      </div>
    </div>
    <audio :src="url" ref="audio"></audio>
    <!-- 播放时间 -->
    <div class="playTime">
      <mt-range :barHeight="num" v-model="rangeValue">
        <!-- 当前播放时间 -->
        <div slot="start" ref="currttime" v-text="currentTime"></div>
        <div slot="end">{{ maxTime }}</div>
        <!-- 总时长 -->
      </mt-range>
    </div>
  </div>
</template>

<script>
import axios from '@/router/myaxios';
export default {
  data() {
    return {
      isActive: false,
      num: 5,
      rangeValue: 0,
      // 音乐动画
      isan: '',
      //
      url: '',
      //音乐总时长
      maxTime: '',
      maxTimes: 0,
      currentTime: '0:0', //当前时间
      currentTimes: 0, //当前时间
      songLyric: [],
      word: [],
      picUrl: '',
      // 暂停图标
      icon: true,
    };
  },
  watch: {},
  methods: {
    getindex() {
      // 当前播放时间
      var audio = document.querySelector('audio');
      this.currentTime = audio.currentTime;
      var playTime = audio.currentTime;
      for (var a = this.songLyric.length - 1; a >= 0; a--) {
        var isp = this.songLyric[a];
        if (playTime >= isp.time) {
          return a;
        }
      }
      return -1;
    },
    // 歌词滚动条
    scroll() {
      var index = this.getindex();
      // var a = document.querySelector('#a').scrollHeight;
      var configs = {
        psHeight: 40,
        divHeight: 340,
      };
      // 155
      var mid = configs.divHeight / 2 - configs.psHeight / 2;
      if (this.currentTime === this.maxTime) {
        this.$refs.box.scrollTop = 0;
      }
      if (index > 5) {
        this.$refs.box.scrollTop = index * configs.psHeight - mid;
      }
      this.rangeValue = (this.currentTimes / this.maxTimes) * 100;
      this.setroll();
    },
    // 动态添加歌词效果
    setroll() {
      // 返回第几行歌词
      let index = this.getindex();
      let p = Array.from(document.querySelectorAll('.lyric_songs p'));
      p.forEach((e) => {
        e.className = '';
        if (index != -1) {
          p[index].className = 'active';
        }
      });
      this.currentTime = this.timetransform(this.currentTime);
      console.log(this.currentTime);
    },
    // 返回上一层
    go() {
      this.stop();
      this.$router.go(-1);
    },
    // 暂停
    stop() {
      var audio = document.querySelector('audio');
      audio.pause();
      this.icon = true;
      this.isan = 'paused';
    },
    // 播放
    clicks() {
      var audio = document.querySelector('audio');
      this.icon = false;
      audio.play();
      this.isan = 'running';
    },
    // 时间转换
    timetransform(s) {
      s = Math.round(s);
      this.currentTimes = s;
      var h = Math.floor(s / 60);
      s = s % 60;
      h = h.length == 1 ? '0' + h : h;
      s = s.length == 1 ? '0' + s : s;
      return h + ':' + s;
    },
    // 获取歌曲信息
    btn() {
      var id = this.$route.query.lyric;
      this.url = sessionStorage.lyric_url;
      this.picUrl = sessionStorage.picUrl;
      axios({
        url: `/lyric?id=${id}`,
      }).then((res) => {
        let { lyric } = res.data.lrc;
        // 将 lyric 变为数组
        this.songLyric = lyric.split('\n');
        for (let i = 0; i < this.songLyric.length; i++) {
          let str = this.songLyric[i];
          this.songLyric[i] = this.createObj(str);
        }
        this.maxTime = this.$refs.audio.duration;
        this.maxTimes = Math.round(this.maxTime);
        this.maxTime = this.timetransform(this.maxTime);
      });
    },
    // 转换为单句对象
    createObj(str) {
      let obj = str.split(']');
      let time = obj[0];
      let words = obj[1];
      time = time.replace('[', ''); //去除左侧的 [
      //将时间转为秒
      let times = time.split(':');
      let min = times[0];
      let second = times[1];
      time = parseInt(min * 60) + parseFloat(second);
      return {
        time: Math.round(time * 100) / 100,
        words: words,
      };
    },
    setIntervals() {
      setInterval(() => {
        if (this.currentTime !== this.maxTime) {
          this.scroll();
        } else {
          this.stop();
          this.currentTime = '0:0';
          document.querySelector('audio').currentTime = 0;
        }
      }, 1000);
    },
  },
  mounted() {
    this.setIntervals();
  },
  created() {
    this.btn();
  },
};
</script>

<style lang="less" scoped>
.active {
  color: #26a2ff;
  font-weight: 600;
  font-size: 1.2rem !important;
}
.playTime {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2.5rem;
  color: #fff;
  /deep/.mt-range-progress {
    background-color: #fff;
  }
  /deep/.mt-range-thumb {
    width: 1.25rem;
    height: 1.25rem;
    top: 15%;
  }
}
.an {
  animation: rotate 10s linear infinite;
  animation-play-state: paused;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.lyric {
  display: flex;
  flex-direction: column;
  background: black;
  .lyric_item {
    height: 21.25rem;
    padding-bottom: 1rem;
    color: #fff;
    overflow-y: scroll;
    #a {
      .lyric_songs {
        height: 2.5rem;
        line-height: 2.5rem;
        p {
          font-size: 1rem;
        }
      }
    }
  }
  .song_wrap {
    height: 13rem;
    position: relative;
    i {
      color: rgba(206, 204, 223, 0.918);
      font-size: 40px;
      position: absolute;
      left: 45%;
      top: 40%;
      z-index: 5;
    }
    .song_disc {
      width: 65%;
      height: 100%;
      margin: auto;
      background: url(../../assets/disc.png) no-repeat center;
      background-size: contain;
      display: flex;
      justify-content: center;
      align-items: center;
      .song_img {
        width: 65%;
        margin: auto;
        img {
          border-radius: 50%;
        }
      }
    }
  }
  .headers {
    width: 100%;
    height: 35px;
    text-align: left;
    line-height: 35px;
    span {
      color: #fff;
      font-size: 25px;
    }
    span:hover {
      color: pink;
    }
  }
}
</style>
