<template>
  <nuxt-link class="page-close" title="homeに戻る" :to="'/'"></nuxt-link>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.page-close {
  width: 20px;
  height: 20px;
  position: relative;
  top: 0;
  left: 50%;
  z-index: 100;
  display: block;
  margin-top: vw(375, 28);
  @include media("s") {
    margin-top: 28px;
  }
  @include media("lg") {
    margin-top: vw(1366, 80);
  }
  @include media("xl") {
    margin-top: 80px;
  }
  &::after,
  &::before {
    height: 1px;
    width: 100%;
    content: "";
    position: absolute;
    top: 9px;
    left: 0;
    background: var(--color-white);
    display: block;
    transform-origin: center center;
  }
  &::after {
    transform: rotate(45deg);
  }
  &::before {
    transform: rotate(-45deg);
  }
}
</style>
