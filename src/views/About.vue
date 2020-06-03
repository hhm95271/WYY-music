<template>
  <div class="About">
    <div class="rank">
      <!-- 官方榜 -->
      <div class="rank-officials">
        <span>官方榜</span>
        <div
          class="rank-item"
          @click="loginRankList(item)"
          v-for="(item,index) in officials"
          :key="index"
        >
          <div class="item-left">
            <img :src="item.coverImgUrl" alt />
          </div>
          <div class="item-right">
            <ul>
              <li>1.{{item.tracks[0].name}}-{{item.tracks[0].ar[0].name}}</li>
              <li>2.{{item.tracks[1].name}}-{{item.tracks[1].ar[0].name}}</li>
              <li>3.{{item.tracks[2].name}}-{{item.tracks[2].ar[0].name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 更多 -->
    <div class="morelist">
      <span>更多榜单</span>
      <div
        class="morelist-item"
        @click="loginRankList(item)"
        v-for="(item,index) in morelist"
        :key="index"
      >
        <div class="list-top">
          <img :src="item.coverImgUrl" alt />
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import axios from "@/router/myaxios";
import Footer from "@/views/public/footer";
export default {
  components: {
    Footer
  },
  data() {
    return {
      //官方榜单
      officials: [],
      //更多榜单
      morelist: []
    };
  },
  methods: {
    // 进入选中的榜单中
    loginRankList(item) {
      let commentid = item.commentThreadId;
      let id = commentid.slice(7);
      this.$router.push({
        path: `/rankList?`,
        query: {
          id
        }
      });
    },
    // 官方榜单
    official() {
      for (var i = 0; i <= 33; i++) {
        if (i <= 4) {
          axios({
            url: `/top/list?idx=${i}`
          }).then(res => {
            this.officials.push(res.data.playlist);
          });
        } else {
          axios({
            url: `/top/list?idx=${i}`
          }).then(res => {
            this.morelist.push(res.data.playlist);
          });
        }
      }
    }
  },
  mounted() {
    //
    this.official();
  }
};
</script>

<style lang="less" scoped>
.morelist {
  .morelist-item {
    float: left;
    width: 30%;
    height: 8.4375rem;
    margin-bottom: 1rem;
    margin-left: 0.33rem;
    .list-top {
      text-align: left;
      img {
        border-radius: 5px;
        width: 100%;
      }
      span {
        font-size: 0.63rem;
      }
    }
  }
}
.rank-officials > span,
.morelist > span {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: left;
  display: block;
}
.rank {
  width: 90%;
  margin: auto;
}
.About {
  .rank-item {
    height: 90px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: row;
    margin-bottom: 0.8rem;
    .item-left {
      width: 91px;
      height: 100%;
      margin-right: 10px;
      img {
        height: 100%;
        border-radius: 5px;
      }
    }
    .item-right {
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
      ul {
        li {
          margin-top: 0.5rem;
          font-size: 0.8rem;
          color: #888;
        }
      }
    }
  }
}
</style>