<template>
  <div class="pageNext">
    <p class="upper pageNext__titles">
      <span class="pageNext__title">next work</span
      ><span class="pageNext__line"></span>
    </p>
    <nuxt-link class="pageNext__link" :to="'/works/' + nextContent.id"
      ><BaseHeadLine :level="false" :text="nextContent.title_en"
    /></nuxt-link>
  </div>
</template>

<script>
import BaseHeadLine from "./BaseHeadLine.vue";
export default {
  props: {
    nextContent: Object,
  },
  components: { BaseHeadLine },
};
</script>

<style lang="scss" scoped>
.pageNext {
  margin-top: vw(375, 134);
  @include media("s") {
    margin-top: 134px;
  }
  @include media("lg") {
    margin-top: vw(1366, 270);
    margin-left: vw(1366, -60);
    margin-right: vw(1366, -60);
    width: vw(1366, 988);
    display: grid;
    grid-template-columns: 1fr minmax(50%, max-content);
    column-gap: p(988, 24);
    flex-flow: row nowrap;
    align-items: center;
  }
  @include media("xl") {
    width: 988px;
    margin-top: 270px;
    margin-left: -60px;
    margin-right: -60px;
  }
  &__titles {
    width: 100%;
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
  }
  &__title {
    font-size: rem(18);
    font-family: var(--font-en);
    letter-spacing: ls(40);
    font-weight: var(--font-regular);
    padding-right: 0.5em;
  }
  &__line {
    height: 1px;
    width: 100%;
    background: var(--color-white);
  }
  &__link {
    margin-top: vw(375, 30);
    display: inline-block;
    @include media("s") {
      margin-top: rem(30);
    }
    @include media("lg") {
      margin-top: 0;
    }
  }
}
</style>
