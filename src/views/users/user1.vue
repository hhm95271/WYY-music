<template>
  <div class="user1">
    <Tab />

    <div class="box">
      <div class="icon">
        <div id="uid">
          <img :src="users.avatarUrl" />
          <span>{{ users.nickname }}</span>
        </div>
        <div class="exit" @click="exit">退出登录</div>
      </div>
      <nav>
        <div class="nav-item">
          <span
            style="color:red"
            class="iconfont 1_music90 icon-1_music90"
          ></span>
          <span>我喜欢</span>
        </div>
        <div class="nav-item" @click="enterBroadcasting">
          <span class="iconfont 1_music93 icon-1_music93"></span>
          <span>私人FM</span>
        </div>
        <div class="nav-item" @click="enterCollect">
          <span class="iconfont 1_music86 icon-1_music86"></span>
          <span>我的收藏</span>
        </div>
      </nav>
    </div>
    <!-- 我喜欢的歌曲item -->
    <div class="song_item">
      <div
        class="item"
        @click="setSongs(index)"
        v-for="(item, index) in tracks"
        :key="index"
      >
        <div class="item_left">
          <div class="top">{{ item.name }}</div>
          <div class="bottom">{{ item.ar[0].name }}-{{ item.al.name }}</div>
        </div>
        <!-- 右侧图标 -->
        <div
          class="item-right"
          :style="{ backgroundImage: 'url(' + item.al.picUrl + ')' }"
        >
          <span class="iconfont 1_music80 icon-1_music80"></span>
        </div>
      </div>
    </div>
    <!-- 私人FM -->
  </div>
</template>

<script>
import Tab from '@/views/public/tab';
import aixos from '@/router/myaxios';
import { MessageBox } from 'mint-ui';
export default {
  components: {
    Tab,
  },
  data() {
    return {
      // mv
      mv: [],
      title: '我的',
      // user-status
      users: {},
      // 我喜欢
      tracks: [],
    };
  },
  methods: {
    exit() {
      aixos({
        url: '/logout',
      }).then(() => {
        MessageBox.confirm('确定执行此操作?')
          .then(() => {
            this.$router.push('/loign');
            sessionStorage.removeItem('uid');
          })
          .catch((err) => {
            console.log('取消', err);
          });
      });
    },
    // 进入收藏
    enterCollect() {
      console.log('进入我的收藏');
    },
    // 进入电台
    enterBroadcasting() {},
    // 进入歌曲播放
    setSongs(index) {
      aixos({
        url: '/song/url?id=' + this.tracks[index].id,
      }).then((res) => {
        sessionStorage.setItem('lyric_url', res.data.data[0].url);
        sessionStorage.setItem('picUrl', this.tracks[index].al.picUrl);
        this.$router.push({ path: `/Lyric?lyric=${this.tracks[index].id}` });
      });
    },
    // 我喜欢初始化
    getUserStatus() {
      aixos({
        url: '/login/status',
      }).then((res) => {
        this.users = res.data.profile;
      });
      aixos({
        url: `/likelist?uid=${sessionStorage.uid}`,
      }).then((res) => {
        let { ids } = res.data;
        ids.forEach((e) => {
          aixos({
            url: `/song/detail?ids=${e}`,
          }).then((res) => {
            this.tracks.push(res.data.songs[0]);
          });
        });
      });
    },
  },
  mounted() {
    aixos.get('/mv/url?id=32192436').then((res) => {
      console.log(res);
    });
    this.getUserStatus();
  },
};
</script>

<style lang="less" scoped>
.private-FM {
  width: 100%;
  .item {
    height: 10rem;
    video {
      width: 100%;
    }
  }
}
.song_item {
  width: 100%;
  .item {
    margin: auto;
    padding-left: 1.5rem;
    width: 90%;
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f3f9;
    .item-right {
      height: 100%;
      width: 3.75rem;
      background-size: 100% 100%;
      border-radius: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 1.5rem;
        color: black;
      }
    }
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
.user1 {
  background: #f3f5f7;
}
.box {
  padding-bottom: 1rem;
  width: 100%;
  background: black;
  margin-top: 3.125rem;
  color: #fff;
  nav {
    display: flex;
    justify-content: space-around;
    .nav-item {
      display: flex;
      flex-direction: column;
      font-size: 0.75rem;
      .iconfont {
        font-size: 2rem;
      }
    }
  }
  .icon {
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: auto;
    .exit {
      font-size: 0.875rem;
      color: #26a2ff;
    }
    img {
      width: 4rem;
      border-radius: 50%;
      margin-right: 1rem;
      vertical-align: middle;
    }
    span {
      font-size: 0.85rem;
      font-weight: 600;
    }
  }
}
</style>
