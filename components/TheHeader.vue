<template>
  <header class="header">
    <nuxt-link class="header__logo upper" to="/">
      MINAMI<br />TAKANORI
    </nuxt-link>
    <nuxt-link class="header__nav upper" to="/profile">Profile</nuxt-link>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  // mix-blend-mode: difference;
  font-family: var(--font-en);
  font-weight: var(--font-regular);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-weight: var(--font-regular);
  letter-spacing: ls(60);
  padding: vw(375, 28) vw(375, 30) 0;
  @include media("s") {
    padding: 28px 30px 0;
  }
  @include media("lg") {
    font-size: rem(16);
    padding: vw(1366, 80) vw(1366, 68) 0;
  }
  @include media("xl") {
    padding: 80px 68px 0;
  }
  &::after {
    height: 100%;
    width: 100%;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(rgba(0, 0, 0, 0.69), rgba(0, 0, 0, 0));
    z-index: -1;
  }

  &__desc {
    opacity: 0;
    position: absolute;
    top: -100vh;
    left: -100vw;
  }
}
</style>
