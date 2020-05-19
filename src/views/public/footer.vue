<template>
  <div class="footer">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="主页">
        <img @click="btn1" slot="icon" src="../../../src/assets/home.png" />
        <span>推荐</span>
      </mt-tab-item>
      <mt-tab-item id="段子">
        <img @click="btn2" slot="icon" src="../../../src/assets/home.png" />
        <span>热歌</span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: true
    };
  },
  methods: {
    btn1() {
      this.$router.push("/");
    },
    btn2() {
      this.$router.push("/about");
    }
  }
};
</script>

<style scoped>
.mint-tabbar {
  position: fixed;
}
</style>