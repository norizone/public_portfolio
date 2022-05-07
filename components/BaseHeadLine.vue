<template>
  <component :is="headLineTag" class="headline upper" v-html="text"></component>
</template>

<script>
export default {
  template: "",
  props: {
    text: { type: [String, Number], require: true, default: "" },
    level: { type: [Number, Boolean], require: true, default: 1 },
  },
  data() {
    return {
      headLineTag: this.level ? `h${this.level}` : "p",
    };
  },
};
</script>

<style lang="scss" scoped>
.headline {
  font-size: vw(375, 40);
  font-family: var(--font-en);
  font-weight: var(--font-bold);
  letter-spacing: ls(20);
  position: relative;
  z-index: 1;
  line-height: lh(100, 90);
  @include media("lg") {
    font-size: vw(1366, 100);
  }
  @include media("xl") {
    font-size: rem(100);
  }
}
</style>
