<template>
  <!-- 段子页 -->

  <div class="about">
    <header>
      <div class="content"></div>
      <p>更新时间：5/14</p>
    </header>
    <div class="box">
      <div class="box_item" @click="play_btn(index)" v-for="(item,index) in tracks" :key="index">
        <div class="item_left">
          <h5>
            {{item.name}}
            <i>{{item.alia[0]}}</i>
          </h5>
          <span>{{item.ar[0].name}}</span>
        </div>
        <!-- 播放按钮 -->
        <div class="icon_btn"></div>
      </div>
    </div>
    <!-- 播放器 -->
    <Player />
    <!--  -->
  </div>
</template>
<script>
import axios from "@/router/myaxios";
import Player from "@/views/player";
export default {
  components: {
    Player
  },
  data() {
    return {
      tracks: [],
      picUrl: "",
      imgUrl: ""
    };
  },
  methods: {
    // 获取歌曲 url 链接
    play_btn(index) {
      this.$store.state.id = this.tracks[index].id;
      console.log(this.$store.state.id);
      // axios({
      //   url: `/song/url?id=${this.id}`
      // }).then(res => {
      //   var { data } = res.data;
      //   setTimeout(() => {
      //     this.srcmp3 = data[0].url;
      //   }, 2000);
      //   this.picUrl = this.tracks[index].al.picUrl;
      //   // console.log(this.picUrl);
      // });
      axios({
        url: "/playlist/detail?id=19723756",
        method: "post"
      }).then(res => {
        let list = res.data.playlist.tracks;
        this.val = list[index].name;
        this.$store.state.picUrl = this.tracks[index].al.picUrl;
      });
    },
    // 热歌数据获取
    getAllhot() {
      axios({
        url: "/playlist/detail?id=19723756",
        method: "post"
      })
        .then(res => {
          var { tracks } = res.data.playlist;
          // console.log(tracks[0]);
          this.tracks = tracks;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {},
  mounted() {
    this.getAllhot();
  }
};
</script>
<style lang='less' scoped>
header {
  margin-bottom: 5px;
  font-size: 12px;
  color: #fff;
  text-align: left;
  width: 100%;
  height: 125px;
  background: url("../assets/arr_1.jpg") no-repeat;
  background-size: 50% * 2 50% * 2;
  position: relative;
  p {
    margin-top: 10px;
    text-indent: 20px;
  }
  .content {
    width: 55%;
    height: 70%;
    background: url("../assets/index_icon_2x.png") no-repeat;
    background-size: 100% 100%;
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
.box {
  margin-bottom: 60px;
}
.box_item {
  border-bottom: 1px solid #f1f3f9;
  display: flex;
  justify-content: space-between;
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
  .icon_btn {
    border-radius: 50%;
    height: 75%;
    width: 55px;
    // border: 1px solid red;
    background: url("../assets/index_icon_2x.png") no-repeat;
    background-size: 280% 270%;
    background-position: -15px 10px;
  }
}
</style>
