<template>
  <div class="footer"></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  height: vw(375, 136);

  @include media("s") {
    height: 136px;
  }
  @include media("lg") {
    height: vw(1366, 280);
  }
  @include media("xl") {
    height: 280px;
  }
}
</style>
