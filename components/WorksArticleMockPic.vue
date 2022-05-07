<template>
  <div class="mockPic">
    <div class="mockPic__outside" :class="device">
      <picture class="mockPic__mock">
        <source
          :srcset="require(`@/assets/image/works/${device}-s.webp`)"
          type="image/webp"
          media="(max-width: 430px)"
        />
        <source :srcset="require(`@/assets/image/works/${device}-s.png`)" />
        <source
          :srcset="require(`@/assets/image/works/${device}.webp`)"
          type="image/webp"
        />
        <img
          :src="require(`@/assets/image/works/${device}.png`)"
          :height="size[device].height"
          :width="size[device].width"
        />
      </picture>
    </div>
    <div class="mockPic__inside-wrap">
      <div class="mockPic__inside" :class="device" ref="autoScrollParent">
        <div class="mockPic__glass"></div>

        <picture class="mockPic__pic -first" :class="{ loaded: loadedImg }">
          <source
            :srcset="
              img.url +
              `?fit=crop&crop=left,top&w=${innerSize[device].width}&h=${innerSize[device].height}&fm=webp&q=0`
            "
            type="image/webp"
          />
          <img
            :src="img.url"
            :height="img.height"
            :width="img.width"
            alt=""
            class="canvas-img"
          />
        </picture>

        <picture
          class="mockPic__pic"
          :class="{ loaded: loadedImg }"
          ref="autoScrollTarget"
        >
          <source
            :srcset="img.url + '?fm=webp&q=40'"
            type="image/webp"
            media="(max-width: 430px)"
          />
          <source :srcset="img.url + '?fm=webp&q=60'" type="image/webp" />
          <img
            :src="img.url"
            :height="img.height"
            :width="img.width"
            :alt="title"
            decoding="async"
            loading="lazy"
            @load="init"
          />
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  props: {
    device: { type: String, default: "desktop" },
    img: Object,
    title: { type: String, require: false, default: false },
  },
  data() {
    return {
      scrollRange: 0,
      tmScroll: null,
      targetPic: null,
      parentWrap: null,
      frequency: null,
      firstWindowWidth: 0,
      imgHeight: 0, //スクロール対象の高さ
      parentHeight: 0, // モックの高さ
      executionScrollCount: 0, //スクロールさせる回数
      remainder: "", //余り
      loadedImg: false,
      size: {
        desktop: { width: 800, height: 582 },
        mobile: { width: 611, height: 300 },
      },
      innerSize: {
        desktop: { width: 800 / 2, height: 532 / 2 },
        mobile: { width: 258 / 2, height: 459 / 2 },
      },
    };
  },
  mounted() {
    this.firstWindowWidth = window.innerWidth;
    let timerResize = setTimeout(() => {
      clearTimeout(timerResize);
      window.addEventListener("resize", this.packEvent, false);
    }, 1000);
  },

  beforeDestroy() {
    let timerResize = setTimeout(() => {
      clearTimeout(timerResize);
      window.removeEventListener("resize", this.packEvent, false);
    }, 1000);
  },

  watch: {
    scrollRange() {
      this.scrollRange = this.scrollRange;
    },
  },

  methods: {
    packEvent() {
      if (this.firstWindowWidth !== window.innerWidth) {
        this.firstWindowWidth = window.innerWidth;
        this.tmScroll.kill();
        new Promise((res) => {
          this.setAnimationValue();
          res();
        })
          .then(() => {
            this.autoScrollEvent();
          })
          .then(() => {
            setTimeout(() => {
              this.observerScroll();
            }, 300);
          });
      }
    },

    init() {
      this.loadedImg = true;
      this.firstWindowWidth = window.innerWidth;
      this.parentWrap = this.$refs.autoScrollParent;
      this.targetPic = this.$refs.autoScrollTarget;
      new Promise((res) => {
        this.setAnimationValue();
        res();
      })
        .then(() => {
          this.autoScrollEvent();
        })
        .then(() => {
          this.observerScroll();
        });
    },

    setAnimationValue() {
      new Promise((res) => {
        this.imgHeight = this.targetPic.getBoundingClientRect().height; //スライドさせる物
        this.parentHeight = this.parentWrap.getBoundingClientRect().height; //モック内部の高さ 表示領域
        res();
      }).then(() => {
        this.scrollRange = (this.imgHeight - this.parentHeight) * -1;
        this.executionScrollCount = Math.floor(
          this.imgHeight / this.parentHeight
        ); //回数
        this.remainder = this.parentHeight % this.imgHeight; //余り 0 以外は最後一番下までスクロール
      });
    },

    autoScrollEvent() {
      this.tmScroll = gsap.timeline({
        repeat: -1,
        overWrite: true,
        paused: true,
        autoKill: false,
        transformOrigin: "top",
        ease: "power1.inOut",
      });
      this.tmScroll.to(this.$refs.autoScrollTarget, {
        //ios - resizeバグのため戻りのアニメーションなし
        y: 0,
        duration: 1,
      });
      for (let index = 0; index < this.executionScrollCount - 1; index++) {
        this.tmScroll.to(this.$refs.autoScrollTarget, {
          // mock の高さ / img の高さ回 アニメーション
          y: (index + 1) * this.parentHeight * -1, //一回の移動距離mockの高さ
          delay: 0.5,
          duration: 2,
          ease: "power1.inOut",
        });
      }
      this.tmScroll.to(this.$refs.autoScrollTarget, {
        y: this.scrollRange,
        delay: 0.5,
        duration: 2,
        ease: "power1.inOut",
      });
    },

    scrollCallback(entries) {
      entries.forEach((el) => {
        if (el.isIntersecting) {
          this.tmScroll.play();
        } else {
          this.tmScroll.pause();
        }
      });
    },

    observerScroll() {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      };
      new IntersectionObserver(this.scrollCallback, options).observe(
        this.targetPic
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.mockPic {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  &__outside {
    width: 100%;
    &.desktop {
      filter: brightness(0.8);
    }
    &.mobile {
      filter: brightness(0.5);
    }
  }
  &__inside {
    &-wrap {
      position: absolute;
      z-index: 1;
      width: 100%;
    }
    overflow: scroll;
    margin-left: auto;
    margin-right: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    &.desktop {
      @include aspect-ratio(767, 510);
      width: p(800, 767);
    }
    &.mobile {
      @include aspect-ratio(258, 459);
      width: p(299, 258);
    }
  }
  &__glass {
    height: 100%;
    width: 100%;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.01));
    z-index: 1;
  }
  &__pic {
    position: absolute;
    top: 0;
    left: 0;
    height: auto;
    width: 100%;
    &:not(.-first) {
      z-index: 1;
      opacity: 0;
      &.loaded {
        opacity: 1;
      }
    }
    &.-first {
      z-index: 2;
      transition: opacity 0.2s 0.2s linear;
      &.loaded {
        opacity: 0;
      }
    }
  }
}
</style>
