<template>
  <div>
    <TheHeader />
    <Artwork :pageLoaded="pageLoaded" />
    <TheScrollBtn />
    <transition name="fade">
      <Nuxt v-show="pageLoaded" />
    </transition>
    <TheLinkContact v-if="$nuxt.$route.path !== '/profile'" />
  </div>
</template>

<script>
import Artwork from "~/components/Artwork";
import TheHeader from "../components/TheHeader.vue";
import TheLinkContact from "../components/TheLinkContact.vue";
import TheScrollBtn from "../components/TheScrollBtn.vue";
import { mapGetters } from "vuex";

export default {
  async fetch() {
    if (this.$store.state.api.apiList.length === 1) {
      await this.$store.dispatch("api/firstArticleFetch");
    }
  },
  data() {
    return {
      pageLoaded: this.watchPageLoaded,
    };
  },
  components: {
    Artwork,
    TheHeader,
    TheLinkContact,
    TheScrollBtn,
  },
  computed: {
    ...mapGetters({
      watchPageLoaded: "pageTransition/watchPageLoaded",
    }),
  },
  mounted() {
    this.$store.commit("pageTransition/finishPageLoaded");
  },
  watch: {
    watchPageLoaded() {
      this.pageLoaded = this.watchPageLoaded;
    },
    "$route.name"(to, from) {
      this.$store.commit("pageTransition/finishPageLoaded");
    },
  },
};
</script>

<style lang="scss">
@import "assets/scss/reset.scss";
@import "assets/css/fonts.css";

html {
  position: relative;
  z-index: 0;
  min-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

:root {
  --color-gray: #707070;

  --color-white: #fff;
  --color-black: #000;
  --color-red: #c42e2e;

  --color-error: var(--color-gray);

  --font-en: "Montserrat";
  --font-regular: 300;
  --font-medium: 500;
  --font-bold: 700;

  $radius: vw(375, 20);
  --radius: #{$radius};
  @include media("s") {
    $radius-s: rem(20);
    --radius: #{$radius-s};
  }
  @include media("lg") {
    $radius-lg: vw(1440, 40);
    --radius: #{$radius-lg};
  }
  @include media("xl") {
    $radius-xxl: rem(40);
    --radius: #{$radius-xxl};
  }
}

body {
  margin: 0;
  padding: 0;
  font-family: "游ゴシック体", YuGothic, "Yu Gothic M", "游ゴシック Medium",
    "Yu Gothic Medium", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN W3",
    HiraKakuProN-W3, "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN",
    "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, Osaka,
    "ＭＳ Ｐゴシック", "MS PGothic", "Helvetica Neue", HelveticaNeue, Helvetica,
    Arial, "Segoe UI", sans-serif;
  font-feature-settings: "palt" 1;
  width: 100%;
  font-size: rem(12);
  line-height: lh(12, 14);
  color: var(--color-white);
  background: var(--color-black);
  font-weight: 400;
  word-break: break-all;
  @include media("lg") {
    font-size: rem(14);
  }
}

img {
  width: 100%;
  height: auto;
  vertical-align: bottom;
}

.space {
  padding: 0.25em;
}

.reset-div {
  font-size: 0;
}
.upper {
  text-transform: uppercase;
}

.inline-block {
  display: inline-block;
}

.sp {
  display: block;

  @include media("lg") {
    display: none;
  }
}

.md {
  display: none;

  @include media("md") {
    display: block;
  }
}

.lg {
  display: none;

  @include media("lg") {
    display: block;
  }
}

.xl {
  display: none;

  @include media("xl") {
    display: block;
  }
}

.xxl {
  display: none;

  @include media("xl") {
    display: block;
  }
}

.nuxt-link-exact-active {
  pointer-events: none;
}

// layout
.l-wrap {
  width: vw(375, 310);
  margin-left: auto;
  margin-right: auto;
  @include media("lg") {
    width: vw(1366, 824);
  }
  @include media("xl") {
    width: rem(824);
  }
  &.-primary {
    @include media("lg") {
      width: vw(1440, 868);
    }
    @include media("xl") {
      width: rem(868);
    }
  }
} //end -layout
.fade-enter-active {
  //表示
  transition: opacity 0.3s linear, transform 0.3s linear;
  opacity: 1;
  transform: translateY(0);
}
.fade-enter {
  opacity: 0;
  transform: translateY(-15px);
}

.fade-leave-active {
  //非表示
  transition: opacity 0.3s linear, transform 0.3s linear;
  opacity: 1;
  transform: translateY(0);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
</style>
