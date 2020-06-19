<template>
  <div class="footer">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="主页">
        <img @click="btn1" slot="icon" src="../../../src/assets/home.png" />
        <span>推荐</span>
      </mt-tab-item>
      <mt-tab-item id="排行榜">
        <img @click="btn2" slot="icon" src="../../../src/assets/home.png" />
        <span>排行榜</span>
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img @click="btn3" slot="icon" src="../../../src/assets/home.png" />
        <span>我的</span>
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

<style scoped>
.mint-tabbar {
  position: fixed;
}
</style>
