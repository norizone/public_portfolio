<template>
  <div class="indicators">
    <div class="indicators__inner" ref="indicators">
      <p class="indicators__text upper" v-html="activeTitle"></p>
      <div class="indicators__clip">
        <span
          class="indicator"
          v-for="(content, index) in contents"
          :key="content.id"
          :class="{ active: activeIndex === index }"
        >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contents: { type: Array, require: true },
    activeIndex: { type: Number, require: true, default: 0 },
  },
  data() {
    return {
      activeTitle: this.contents[this.activeIndex].title_en,
    };
  },
  methods: {
    setIndicatorPosition() {
      const indicatorsCount = this.contents.length - 1;
      const position =
        100 - ((indicatorsCount - this.activeIndex) / indicatorsCount) * 100;
      this.$refs.indicators.style.setProperty(
        "--indicator-position",
        `${position}% `
      );
    },
  },
  watch: {
    activeIndex() {
      this.setIndicatorPosition();
      this.activeTitle = this.contents[this.activeIndex].title_en;
    },
    contents() {
      this.setIndicatorPosition();
    },
  },
};
</script>

<style lang="scss" scoped>
.indicators {
  position: fixed;
  z-index: 10;
  right: vw(375, 12);
  height: 100vh;
  top: 0;
  width: max-content;
  &__inner {
    --indicator-position: 0%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
  }
  &__clip {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    padding: 20px 0;
    clip-path: polygon(
      50% 0,
      100% 0%,
      100% 100%,
      50% 100%,
      0% var(--indicator-position)
    );
    @include media("lg") {
      padding: 0;
    }
  }
  &__text {
    display: none;
    @include media("lg") {
      display: block;
      font-family: var(--font-en);
      font-weight: var(--font-regular);
      letter-spacing: ls(40);
      height: max-content;
      width: max-content;
      position: absolute;
      text-align: right;
      display: flex;
      align-items: center;
      font-size: rem(12);
      top: calc(var(--indicator-position) - 0.5em);
      right: rem(28);
    }
  }
}
.indicator {
  width: vw(375, 16);
  background: var(--color-gray);
  height: 1px;
  transition: background 0.1s ease-in;
  @include media("s") {
    width: rem(16);
  }
  & ~ & {
    margin-top: 20px;
  }
  &.active {
    background: var(--color-white);
    height: 2px;
  }
}
</style>
