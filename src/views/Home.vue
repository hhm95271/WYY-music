<template>
  <div class="home">
    <Tab />
    <!-- 轮播图广告，仅供观看 -->

    <div class="advertising">
      <mt-swipe :auto="6000">
        <mt-swipe-item v-for="(item, index) in banners" :key="index">
          <img :src="item.pic" alt="记载失败" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 导航栏 -->
    <nav>
      <div class="nav-item" @click="_item1">
        <i class="iconfont icon-rili"></i>
        <span>每日推荐</span>
      </div>
      <div class="nav-item" @click="_item2">
        <i class="iconfont icon-paixingbang"></i>
        <span>排行榜</span>
      </div>
      <div class="nav-item">
        <i class="iconfont icon-yinle"></i>
        <span>电台</span>
      </div>
      <div class="nav-item">
        <i class="iconfont icon-shipin"></i>
        <span>视频</span>
      </div>
    </nav>
    <!-- 内容 -->
    <div class="main">
      <div class="content">
        <div class="content_title">推荐歌单</div>
        <div
          class="music_item"
          @click="getlocaltion(item.id)"
          v-for="(item, index) in playlists"
          :key="index"
        >
          <!-- 左侧 -->
          <div class="item-left">
            <h4>{{ item.name }}</h4>
            <div class="tags">
              <span>{{ item.tags[0] }}</span>
              <span>{{ item.tags[1] }}</span>
              <span>{{ item.tags[2] }}</span>
            </div>
          </div>
          <div class="item-right">
            <img :src="item.coverImgUrl" alt />
          </div>
        </div>
      </div>
    </div>
    <!-- copy -->
    <div class="copyright">
      <div class="top">
        <img src="../assets/copy.png" alt />
      </div>
      <p>Copyright © 1998 - 2019 Tencent All Rights Reserved</p>
      <p>联系电话：0755-86013388 QQ群：552092351</p>
    </div>
    <!-- 底部 -->
    <footer>练习demo：仿网易云音乐</footer>
  </div>
</template>

<script>
import axios from '@/router/myaxios';
import Tab from '@/views/public/tab';
export default {
  components: {
    Tab,
  },
  data() {
    return {
      value: '',
      playlists: [],
      banners: [],
    };
  },
  methods: {
    _item2() {
      this.$router.push({ path: '/About' });
    },
    _item1() {
      this.$router.push({ path: '/recommend' });
    },
    getlocaltion(id) {
      this.$router.push({ path: `/Isme?id=${id}` });
    },
    getBanner() {
      axios({
        url: '/banner?type=2',
      }).then((res) => {
        this.banners = res.data.banners;
      });
    },
  },

  mounted() {
    this.getBanner();
    axios({
      url: '/top/playlist',
    }).then((res) => {
      let playlists = res.data.playlists;
      this.playlists = playlists;
    });
  },
};
</script>

<style lang="less" scoped>
nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .nav-item {
    display: flex;
    flex-direction: column;
    i {
      font-size: 1.8rem;
      color: #fff;
      display: block;
      width: 3rem;
      height: 3rem;
      line-height: 3rem;
      border-radius: 50%;
      background: #26a2ff;
    }
    span {
      font-size: 0.7rem;
    }
  }
}
/deep/.mint-swipe-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}
.advertising {
  margin-top: 3.75rem;
  width: 100%;
  height: 9.625rem;
}
.tags {
  display: flex;
  justify-content: space-around;
}
footer {
  margin-top: 10%;
  margin-bottom: 30%;
  color: #f1f1f1;
}
.content_title {
  font-weight: 600;
  color: #26a2ff;
  margin-bottom: 10px;
}
.copyright {
  border-top: 1px solid #f1f3f5;
  margin-top: 5%;
  .top {
    width: 30%;
    height: 10%;
    margin: auto;
  }
  p {
    font-size: 10px;
    margin-bottom: 10px;
  }
}

.music_item {
  background: rgba(0, 0, 20, 0.1);
  width: 90%;
  height: 85px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: auto;
  margin-bottom: 10px;
  border-radius: 5px;
  h4 {
    // margin-bottom: px;
    font-size: 12px;
  }
  span {
    font-size: 8px;
    color: rgba(26, 26, 26, 0.2);
  }
  .item-left {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding: 5px;
    text-align: left;
    box-sizing: border-box;
    flex: 1;
    overflow: hidden;
    white-space: wrap;
    text-overflow: ellipsis;
    p {
      font-size: 12px;
      color: rgba(26, 26, 26, 0.5);
    }
  }
  .item-right {
    width: 91px;
    height: 100%;
    border-radius: 0 5px 5px 0;
    img {
      width: 90%;
    }
  }
}
.box {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
}
.home {
  header {
    margin-bottom: 0;
    background: #26a2ff;
    color: #fff;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      margin-right: 15px;
      width: 40px;
      height: 40px;
      border-radius: 25%;
      background: url('../assets/logo.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
.mint-search {
  height: 52px;
}
</style>
