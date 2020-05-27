<template>
  <div class="lyric">
    <!-- 头部返回按钮 -->
    <div class="headers">
      <span @click="go" class="iconfont icon-guanbi"></span>
    </div>
    <!-- 图片播放 -->
    <div class="song_wrap">
      <i class="iconfont icon-zanting" v-show="icon" @click="clicks"></i>
      <div class="song_disc">
        <div class="song_img an" @click="stop" :style="{'animation-play-state':isan}">
          <img :src="picUrl" alt />
        </div>
      </div>
    </div>
    <!-- 歌词显示 -->
    <div class="lyric_item">
      <ul class="ul">
        <li v-for="(item,index) in songLyric" :key="index">{{item.words}}</li>
      </ul>
    </div>
    <audio :src="url"></audio>
  </div>
</template>

<script>
import axios from "@/router/myaxios";
export default {
  data() {
    return {
      // 音乐动画
      isan: "",
      //
      url: "",
      songLyric: [],
      word: [],
      picUrl: "",
      // 暂停图标
      icon: true,
      rotateVal: 0 // 旋转角度
    };
  },
  methods: {
    // 返回上一层
    go() {
      this.$router.go(-1);
    },

    // 暂停
    stop() {
      var audio = document.querySelector("audio");
      // var song_img = document.querySelector(".song_img");
      audio.pause();
      this.icon = true;
      this.isan = "paused";
    },
    // 播放
    clicks() {
      var audio = document.querySelector("audio");
      // var song_img = document.querySelector(".song_img");
      this.icon = false;
      audio.play();
      this.isan = "running";
    },
    //图片css3旋转
    // rotate(img) {
    //   setInterval(() => {
    //     this.rotateVal += 1;
    //     img.style.transform = "rotate(" + this.rotateVal + "deg)";
    //     img.style.transition = "0.1s linear";
    //   }, 100);
    // },
    //获取播放时间
    getSong() {
      //当前时间 223040

      console.log(this.maxTime);
      // 26条 i>0 i-1
      for (let i = this.songLyric.length - 1; i > 0; i--) {
        let liobj = this.songLyric[i];
        // console.log(this.songLyric[i]);
        if (this.maxTime >= liobj.time) {
          return i;
        }
      }
      return -1;
    },
    //动态添加歌词效果
    actives() {
      // index 33 条歌词
      let index = this.getSong();
      let ul = document.querySelector(".ul");
      let li = document.querySelector("active");
      if (li) {
        li.className = "";
      }
      if (index !== -1) {
        ul.children[index].className = "active";
      }
      // 歌词滚动
      let configs = {
        // ul高度
        ulHeight: 500,
        // li高度
        liHeight: 12
      };
      //  235 高度
      var midHeight = configs.ulHeight / 2 - configs.liHeight / 2;
      //
      var marginTop = midHeight - index * configs.liHeight;
      if (marginTop < 0) {
        marginTop = 0;
      }
      ul.style.marginTop = marginTop + "px";
    },
    // 获取歌曲信息
    btn() {
      var id = this.$route.query.lyric;
      this.url = sessionStorage.lyric_url;
      this.picUrl = sessionStorage.picUrl;
      axios({
        url: `/lyric?id=${id}`
      }).then(res => {
        // console.log(res);
        let { lyric } = res.data.lrc;
        // 将 lyric 变为数组
        this.songLyric = lyric.split("\n");
        for (let i = 0; i < this.songLyric.length; i++) {
          let str = this.songLyric[i];
          this.songLyric[i] = this.createObj(str);
        }
      });
    },
    // 转换为单句对象
    createObj(str) {
      let obj = str.split("]");
      let time = obj[0];
      let words = obj[1];
      time = time.replace("[", ""); //去除左侧的 [
      //将时间转为秒
      let times = time.split(":");
      let min = times[0];
      let second = times[1];
      time = parseInt(min * 60) + parseFloat(second);
      return {
        time: time,
        words: words
      };
    }
  },
  mounted() {},
  created() {
    this.btn();
  }
};
</script>

<style lang="less" scoped>
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
  margin-bottom: 55px;
  background: url("http://p3.music.126.net/PbzE5dRHoL1leZughowomA==/17676848440011124.jpg")
    no-repeat;
  .lyric_item {
    ul {
      li {
        font-size: 0.9rem;
        color: #ccc;
        margin-bottom: 10px;
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
      font-size: 30px;
    }
    span:hover {
      color: pink;
    }
  }
}
</style>