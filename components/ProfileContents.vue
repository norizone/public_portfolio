<template>
  <section class="contents">
    <BaseNumberHeadLine :level="1" :text="'1.profile'" />
    <p class="contents__text">
      My name is <br />
      MINAMI TAKANORI.<br />
      I'm FRONT-END <br class="sp" />DEVELOPER. <br />
    </p>
    <dl class="contents__data">
      <dt class="contents__data-label upper">skill</dt>
      <dd class="contents__data-desc">
        {{ skills.join(" / ") }}
      </dd>
    </dl>
  </section>
</template>

<script>
import BaseNumberHeadLine from "./BaseNumberHeadLine.vue";
export default {
  components: { BaseNumberHeadLine },
  data() {
    return {
      skills: [
        "HTML / CSS",
        "EJS",
        "構造化マークアップ",
        "node-sass(LibSass)",
        "sass(DartSass)",
        "JavaScript",
        "TypeScript",
        "jQuery",
        "Vue.js",
        "Nuxt.js",
        "Three.js",
        "tone.js",
        "chart.js",
        "GSAP",
        "PHP",
        "WordPress",
        "GitHub",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.contents {
  margin-top: vw(375, 70);
  @include media("s") {
    margin-top: 70px;
  }
  @include media("lg") {
    margin-top: vw(1280, 130);
  }
  @include media("xl") {
    margin-top: 130px;
  }
  &__text {
    font-size: vw(375, 31);
    margin-top: vw(375, 24);
    font-family: var(--font-en);
    font-weight: var(--font-regular);
    line-height: lh(32, 46);
    letter-spacing: 0;
    @include media("s") {
      font-size: rem(31);
      margin-top: 24px;
    }
    @include media("lg") {
      font-size: vw(1366, 60);
      margin-top: 26px;
      line-height: lh(60, 77);
      white-space: nowrap;
    }
    @include media("xl") {
      font-size: rem(60);
    }
  }
  &__data {
    margin-left: vw(375, 30);
    margin-top: vw(375, 30);
    font-size: rem(14);
    letter-spacing: ls(40);
    line-height: lh(14, 22);

    @include media("s") {
      margin-left: 30px;
      margin-top: 30px;
    }
    @include media("lg") {
      display: flex;
      flex-flow: row nowrap;
      margin-left: 0;
      margin-top: vw(1366, 76);
    }
    @include media("xl") {
      margin-top: 76px;
    }
    &-label {
      color: var(--color-gray);
      white-space: nowrap;
      font-family: var(--font-en);
      font-weight: var(--font-regular);
    }
    &-desc {
      word-break: normal;
      margin-top: rem(2);
      @include media("lg") {
        margin-left: vw(1366, 30);
        margin-top: 0;
      }
      @include media("xl") {
        margin-left: 30px;
      }
    }
  }
}
</style>
