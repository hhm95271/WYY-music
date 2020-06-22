<template>
  <!-- 内容页 -->

  <div class="rankList">
    <div class="goTo iconfont icon-ffanhui-" @click="go"></div>
    <header class="img">
      <div class="content"></div>
      <p>更新时间：5/14</p>
    </header>
    <div class="box">
      <div
        class="box_item"
        @click="play_btn(index)"
        v-for="(item, index) in tracks"
        :key="index"
      >
        <div class="item_left">
          <h5>
            {{ item.name }}
            <i>{{ item.alia[0] }}</i>
          </h5>
          <span>{{ item.ar[0].name }}</span>
        </div>
        <!-- 播放按钮 -->
        <div class="icon_btn iconfont 1_music73 icon-1_music73"></div>
      </div>
    </div>
    <!-- 播放器 -->

    <!--  -->
  </div>
</template>
<script>
import axios from '@/router/myaxios';
export default {
  data() {
    return {
      tracks: [],
      picUrl: '',
      imgUrl: '',
      createTime: 0,
    };
  },
  methods: {
    go() {
      this.$router.go(-1);
    },
    // 获取歌曲 url 链接
    play_btn(index) {
      // console.log(this.tracks);
      this.$store.state.id = this.tracks[index].id;
      console.log(this.tracks[index].id);
      axios({
        url: `/song/url?id=${this.$store.state.id}`,
        method: 'post',
      }).then((res) => {
        console.log(res);
        let { id, url } = res.data.data[0];
        sessionStorage.setItem('lyric', id);
        sessionStorage.setItem('picUrl', this.tracks[index].al.picUrl);
        sessionStorage.setItem('lyric_url', url);
        this.$router.push({ path: `Lyric?lyric=` + id });
      });
    },
    // 热歌数据获取
    getAllhot() {
      axios({
        url: `/playlist/detail?id=${this.$route.query.id}`,
        method: 'post',
      })
        .then((res) => {
          var { tracks } = res.data.playlist;
          this.tracks = tracks;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {},
  mounted() {
    this.getAllhot();
  },
};
</script>
<style lang="less" scoped>
.icon_btn {
  font-size: 1.25rem;
}
.img {
  background: url('http://s3.music.126.net/mobile-new/img/recommand_bg_2x.png?d045fafc60e017b653f8065a87496922=')
    no-repeat;
}
.rankList {
  position: relative;
  .goTo {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 2rem;
    z-index: 2;
    color: #26a2ff;
    opacity: 0.6;
    span {
      font-size: 14px;
    }
  }
}
header {
  margin-bottom: 5px;
  font-size: 12px;
  color: #fff;
  text-align: left;
  width: 100%;
  height: 125px;
  background-size: 50% * 5 50% * 5;
  background-repeat: 'no-repeat';
  position: relative;
  filter: brightness(80%);
  p {
    position: absolute;
    left: 0;
    bottom: 0.5rem;
    text-indent: 20px;
  }
  .content {
    width: 55%;
    height: 70%;
    background: url('../assets/index_icon_2x.png') no-repeat;
    background-size: 150% 150%;
    background-position: 20% 0%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
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

.box_item {
  border-bottom: 1px solid #f1f3f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: auto;
  height: 55px;
  .item_left {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    span {
      font-size: 12px;
    }
    h5 {
      font-size: 14px;
      i {
        color: #999;
        font-weight: 200;
      }
    }
  }
}
</style>
