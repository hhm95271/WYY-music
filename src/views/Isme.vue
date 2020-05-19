<template>
  <div class="Isme">
    <div class="header" :style="{'backgroundImage':'url('+this.coverImgUrl+')'}">
      <img :src="this.coverImgUrl" alt />
      <p>{{this.name}}</p>
    </div>
    <!-- 简介 -->
    <div class="intro"></div>
    <!-- 歌曲列表 -->
    <div class="songlist">
      <span>歌曲列表</span>
    </div>
    <!-- 歌曲item -->
    <div class="song_item">
      <div
        class="item"
        @click="getMusic(item.id,index)"
        v-for="(item,index) in this.tracks"
        :key="index"
      >
        <div class="item_left">
          <div class="top">{{item.name}}</div>
          <div class="bottom">{{item.ar[0].name}}-{{item.al.name}}</div>
        </div>
        <!-- 右侧图标 -->
        <div class="item-right">
          <span class="iconfont icon-bofang"></span>
        </div>
      </div>
    </div>
    <!-- 播放器 -->
    <Player />
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
      //头部背景
      coverImgUrl: "",
      // 头部描述
      name: "",
      tracks: [],
      url: ""
    };
  },
  methods: {
    getMusic(id, index) {
      axios({
        url: `/song/url?id=${id}`
      }).then(res => {
        this.$store.state.id = id;
        // console.log(this.$store.state.id);
        let { data } = res.data;
        console.log(data + "1");
        this.url = this.tracks[index].al.picUrl;
        this.$store.state.picUrl = this.url;
      });
    },

    // song/url?id=
    getAllitem() {
      axios({
        url: `/playlist/detail?id=${this.$store.state.id}`
      }).then(res => {
        console.log(res);
        let { coverImgUrl, name, tracks } = res.data.playlist;
        this.coverImgUrl = coverImgUrl;
        this.name = name;
        this.tracks = tracks;
      });
    }
  },
  mounted() {
    this.getAllitem();
  }
};
</script>

<style lang="less" scoped>
.song_item {
  width: 100%;
  .item {
    margin: auto;
    width: 90%;
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f3f9;
    .item_left {
      text-align: left;
      .top {
        font-weight: 600;
        margin-bottom: 5px;
      }
      .bottom {
        font-size: 12px;
      }
    }
  }
}
.Isme {
  .header {
    width: 100%;
    height: 150px;
    background-size: 300% 300%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: wrap;
    img {
      height: 65%;
      width: 50%;
    }
    p {
      color: red;
      font-weight: 600;
    }
  }
  .songlist {
    width: 100%;
    height: 8%;
    background: #eeeff0;
    color: #666;
    font-size: 12px;
    margin-bottom: 7px;
    text-align: left;
    text-indent: 10px;
  }
}
</style>