<template>
  <div class="nav">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="主页">
        <span @click="btn1">发现</span>
      </mt-tab-item>
      <mt-tab-item id="排行榜">
        <span @click="btn2">排行榜</span>
      </mt-tab-item>
      <mt-tab-item id="我的">
        <span @click="btn3">我的</span>
      </mt-tab-item>
      <mt-tab-item id="搜索">
        <i class="iconfont 1_music95 icon-1_music95"></i>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: true,
    };
  },
  methods: {
    btn1() {
      this.$router.push('/');
    },
    btn2() {
      this.$router.push('/about');
    },
    btn3() {
      if (sessionStorage.getItem('uid')) {
        this.$router.push('/User1');
      } else {
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style scoped lang="less">
.nav {
  /deep/.mint-tabbar {
    height: 3.125rem;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 1px;
    .mint-tab-item {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
