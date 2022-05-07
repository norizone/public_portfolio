<template>
  <div class="scroll">
    <p class="upper scroll__btn">scroll down</p>
  </div>
</template>
<script>
export default {};
</script>

<style lang="scss" scoped>
.scroll {
  writing-mode: vertical-lr;
  position: fixed;
  bottom: 32px;
  left: vw(375, 18);
  font-family: var(--font-en);
  letter-spacing: ls(40);
  z-index: 10;
  font-weight: var(--font-regular);
  @include media("lg") {
    left: vw(1366, 62);
    bottom: 82px;
  }
  @include media("xl") {
    left: rem(62);
  }
}
</style>
