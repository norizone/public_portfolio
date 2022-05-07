<template>
  <button class="btn upper" @click="clickEvent">
    {{ text }}
    <loadSvg />
  </button>
</template>

<script>
import LoadSvg from "@/assets/image/common/load.svg?inline";
export default {
  components: { LoadSvg },
  props: {
    text: { type: String, default: null },
    clickEvent: { type: Function, required: false, default: () => 1 },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  font-size: vw(375, 28);
  font-family: var(--font-en);
  letter-spacing: ls(20);
  font-weight: var(--font-bold);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  @include media("s") {
    font-size: rem(28);
  }
  @include media("lg") {
    font-size: vw(1366, 40);
  }
  @include media("xl") {
    font-size: rem(40);
    padding-left: rem(110);
  }
  & svg {
    width: vw(375, 16);
    margin-left: vw(375, 10);
    height: auto;
    @include media("s") {
      width: rem(16);
      margin-left: rem(10);
    }
    @include media("lg") {
      width: vw(1366, 20);
      margin-left: vw(1366, 22);
    }
    @include media("xxl") {
      width: rem(20);
      margin-left: rem(22);
    }
  }
}
</style>
