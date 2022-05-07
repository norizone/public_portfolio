<template>
  <component :is="headLineTag" class="upper num-headline">{{ text }}</component>
</template>

<script>
export default {
  props: {
    text: String,
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
.num-headline {
  font-size: rem(14);
  font-family: var(--font-en);
  letter-spacing: ls(40);
  font-weight: var(--font-regular);
  @include media("lg") {
    font-size: rem(16);
  }
}
</style>
