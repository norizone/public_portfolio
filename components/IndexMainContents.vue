<template>
  <section v-if="content.topContent" class="l-wrap topContent" ref="target">
    <h1 class="topContent__title">
      FRONT-END<br class="sp" />
      DEVELOPER.
    </h1>
  </section>

  <section
    v-else-if="content.id"
    class="l-wrap content"
    :class="{ active: activeIndex === index }"
    ref="target"
    :id="id"
  >
    <div class="content__header">
      <h2 class="content__title upper js-effectPicTarget">
        <nuxt-link
          :to="'works/' + id"
          v-html="content.title_en"
          class="content__title-link"
        ></nuxt-link>
      </h2>
      <nuxt-link :to="'works/' + id" class="content__pic" v-if="picOb">
        <img
          :src="picOb.url + '?q=50'"
          :height="picOb.height"
          :width="picOb.width"
          :alt="content.title_en"
          decoding="async"
          loading="lazy"
          class="canvas-img"
        />
      </nuxt-link>
    </div>
    <ul class="content__list">
      <li
        class="content__item inline-block"
        v-for="(tool, index) in content.use_tools"
        :key="tool.id"
      >
        {{ tool
        }}{{ index + 1 !== content.use_tools.length ? "&nbsp;/&nbsp;" : "" }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    content: Object,
    index: Number,
    activeIndex: Number,
  },

  data() {
    return {
      picOb: this.content.archive_img ? this.content.archive_img : "",
      tools: this.content.use_tools,
      scrollTarget: "",
      id: this.content.id,
    };
  },
  methods: {
    init() {
      this.scrollTarget = this.$refs.target;
      this.scrollMainContent();
    },
    scrollCallback(entries) {
      entries.forEach((el) => {
        if (el.isIntersecting) {
          this.$emit("scrollAddIndex", this.index);
        }
      });
    },
    scrollMainContent() {
      const options = {
        root: null,
        rootMargin: "-50% 0px",
        threshold: 0,
      };
      new IntersectionObserver(this.scrollCallback, options).observe(
        this.scrollTarget
      );
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.topContent {
  height: 100%;
  scroll-snap-align: center;
  &__title {
    font-size: vw(375, 40);
    font-weight: var(--font-bold);
    font-family: var(--font-en);
    letter-spacing: ls(20);
    display: flex;
    flex-flow: column nowrap;
    text-align: center;
    align-items: center;
    font-size: rem(40);
    width: 100%;
    height: 100%;
    justify-content: center;
  }
}

.content {
  scroll-snap-align: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  height: 28%;
  margin-bottom: 120px;
  perspective: 400px;
  perspective-origin: left center;

  &__header {
    transition: transform 0.2s linear;
    position: relative;
    transform: translate3d(0, 0, -150px);
  }
  &__pic {
    width: p(310, 258);
    margin-left: auto;
    order: 1;
    opacity: 0;
    transform: scale(0, 0);
    transform-origin: left bottom;
    position: absolute;
    bottom: 48px;
    right: 0;
    pointer-events: none;
    @include media("s") {
      width: p(824, 446);
    }
    @include media("lg") {
      bottom: -10px;
    }
  }
  &__title {
    font-size: vw(375, 40);
    font-weight: var(--font-regular);
    font-family: var(--font-en);
    opacity: 0.3;
    letter-spacing: ls(20);
    order: 2;
    position: relative;
    z-index: 1;
    line-height: lh(100, 90);
    pointer-events: none;
    transition: opacity 0.2s linear;
    padding-bottom: vw(375, 30);
    margin-top: 80px;
    width: max-content;
    min-width: 5em;
    @include media("s") {
      padding-bottom: 30px;
      font-size: vw(1366, 100);
    }
    @include media("lg") {
      padding-bottom: vw(1366, 46);
    }
    @include media("xl") {
      padding-bottom: 46px;
      font-size: rem(100);
    }
    &::after {
      height: 1px;
      width: p(310, 140);
      transform: scale(0);
      transform-origin: left top;
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      background: var(--color-white);
      transform-origin: left;
      transition: transform 0.3s linear;
      @include media("lg") {
        width: p(824, 140);
        left: p(824, 4);
      }
    }
    &-link {
      display: block;
    }
  }
  &__list {
    margin-top: vw(375, 30);
    order: 3;
    clip-path: inset(0 100% 0 0);
    font-size: 0;
    transition: clip-path 0.3s linear;
    @include media("s") {
      margin-top: rem(30);
      width: 80%;
    }
    @include media("md") {
      margin-top: vw(1366, 46);
      width: p(824, 600);
    }
    @include media("xl") {
      margin-top: 46px;
    }
  }
  &__item {
    line-height: lh(12, 24);
    letter-spacing: ls(40);
  }
}
.content.active {
  .content {
    &__header {
      transform: translate3d(0, 0, 0);
    }
    &__title {
      font-weight: var(--font-bold);
      opacity: 1;
      pointer-events: auto;
      &::after {
        transform: scale(1);
      }
    }
    &__pic {
      transform: scale(1, 1);
      pointer-events: auto;
      transition: transform 0s 0.3s linear;
    }
    &__list {
      clip-path: inset(0);
      font-size: rem(12);
    }
  }
}
</style>
