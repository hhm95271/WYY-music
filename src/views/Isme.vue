<template>
  <div class="Isme">
    <!-- 返回按钮 -->
    <div
      class="go iconfont 1_music83
icon-1_music83"
      @click="goTo"
    ></div>
    <div
      class="header"
      :style="{ backgroundImage: 'url(' + this.coverImgUrl + ')' }"
    >
      <img :src="this.coverImgUrl" alt />
      <p>{{ name }}</p>
    </div>

    <!-- 歌曲标签 -->
    <div class="songlist">
      <span>歌曲标签：</span>
      <ul>
        <li v-for="(item, index) in tags" :key="index">{{ item }}</li>
      </ul>
    </div>
    <!-- 歌曲简介 -->
    <div class="intro">
      <span>
        <i>简介：</i>
        {{ description }}
      </span>
    </div>
    <!-- 歌曲item -->
    <div class="song_item">
      <div
        class="item"
        @click="getMusic(item.id, index)"
        v-for="(item, index) in tracks"
        :key="index"
      >
        <div class="item_left">
          <div class="top">{{ item.name }}</div>
          <div class="bottom">{{ item.ar[0].name }}-{{ item.al.name }}</div>
        </div>
        <!-- 右侧图标 -->
        <div class="item-right">
          <span
            class="iconfont 1_music73
icon-1_music73"
          ></span>
        </div>
      </div>
    </div>
    <!-- 播放器 -->
  </div>
</template>

<script>
import axios from '@/router/myaxios';

export default {
  data() {
    return {
      //头部背景
      coverImgUrl: '',
      // 头部描述
      name: '',
      tracks: [],
      url: '',
      tags: [],
      description: '',
    };
  },
  methods: {
    goTo() {
      this.$router.go(-1);
    },
    getMusic(id, index) {
      axios({
        url: `/song/url?id=${id}`,
      }).then((res) => {
        // 获取歌曲mp3
        let { id, url } = res.data.data[0];
        sessionStorage.setItem('lyric', id);
        sessionStorage.setItem('picUrl', this.tracks[index].al.picUrl);
        sessionStorage.setItem('lyric_url', url);
        this.$store.state.audio.currentTime = this.tracks[index].dt;
        console.log(this.$store.state.audio.currentTime);
        this.$router.push({ path: `Lyric?lyric=` + id });
      });
    },

    getAllitem(id) {
      id = this.$route.query.id;
      sessionStorage.setItem('Isme_id', id);
      axios({
        url: `/playlist/detail?id=${id}`,
      }).then((res) => {
        let {
          description,
          tags,
          coverImgUrl,
          name,
          tracks,
        } = res.data.playlist;
        this.coverImgUrl = coverImgUrl;
        this.name = name;
        this.tracks = tracks;
        this.tags = tags;
        this.description = description;
      });
    },
  },
  mounted() {
    this.getAllitem();
  },
};
</script>

<style lang="less" scoped>
.intro {
  border-bottom: 1px solid #e3e5f9;
  text-align: left;
  width: 95%;
  margin: auto;
  span {
    color: rgba(211, 166, 173, 0.897);
    font-size: 12px;
    text-align: left;
    i {
      font-style: normal;
      color: #666;
      text-decoration: none;
      font-weight: 600;
    }
  }
}
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
  position: relative;
  .go {
    position: absolute;
    top: 0;
    left: -0.6875rem;
    font-size: 2rem;
  }
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
    display: flex;
    padding: 10px 0;
    background: #eeeff0;
    color: #666;
    font-size: 12px;
    margin-bottom: 7px;
    text-align: left;
    text-indent: 10px;
    ul {
      color: rgba(211, 166, 173, 0.897);
      display: flex;
      li {
        text-align: center;
        background: #fff;
        border-radius: 50%;
        padding-right: 5px;
      }
    }
  }
}
</style>
