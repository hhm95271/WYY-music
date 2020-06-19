<template>
  <div class="header">
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: ['title'],
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 3.125rem;
  background: #26a2ff;
  line-height: 3.125rem;
  font-weight: 600;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
