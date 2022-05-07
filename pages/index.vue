<template>
  <div>
    <div class="contents__wrap" id="js-canvasTargetWrap" ref="targetWrap">
      <IndexMainContents
        v-for="(content, index) in contents"
        :key="content.id"
        :content="content"
        :index="index"
        :activeIndex="activeIndex"
        @scrollAddIndex="scrollAddIndex"
      />
      <IndexAddApiFooter />
    </div>
    <IndexIndicators :activeIndex="activeIndex" :contents="contents" />
  </div>
</template>

<script>
import IndexMainContents from "../components/IndexMainContents.vue";
import { mapGetters } from "vuex";
import IndexIndicators from "../components/IndexIndicators.vue";
import IndexAddApiFooter from "../components/IndexAddApiFooter.vue";

export default {
  components: {
    IndexMainContents,
    IndexIndicators,
    IndexAddApiFooter,
  },
  head() {
    return {
      title: "",
      meta: [
        { hid: "og:url", property: "og:url", content: "https://3na3.net/" },
        {
          hid: "og:title",
          property: "og:title",
          content: "minami takanori portfolio",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "ポートフォリオサイト",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://3na3.net/ogp.jpg",
        },
      ],
    };
  },
  data() {
    return {
      contents: this.$store.state.api.apiList,
      activeIndex: 0,
      firstWindowWidth: 0,
    };
  },

  methods: {
    scrollAddIndex(value) {
      this.activeIndex = value;
    },
    addApiList() {
      if (this.$store.state.api.addContent)
        this.$store.dispatch("api/addFetch");
      this.contents.push(...this.$store.state("api/keepApi"));
    },
    autoScrollWorks() {
      const id = this.$store.state.pageTransition.worksId;
      if (document.getElementById(id))
        document.getElementById(id).scrollIntoView({
          block: "center",
        });
    },
    setTargetWrapHeight() {
      const divideHeight = window.innerHeight * 0.01;
      this.$refs.targetWrap.style.setProperty("--vh", `${divideHeight}px`);
    },
  },
  computed: {
    ...mapGetters({
      watchApiList: "api/watchApiList",
      watchPageLoaded: "pageTransition/watchPageLoaded",
    }),
  },
  mounted() {
    this.$nextTick(() => {
      new Promise((res) => {
        this.setTargetWrapHeight();
        res();
      }).then(() => {
        this.$store.state.pageTransition.worksId
          ? this.autoScrollWorks()
          : window.scrollTo({ top: 0 });
      });
    });
    let timerResize = setTimeout(() => {
      clearTimeout(timerResize);
      window.addEventListener("resize", this.setTargetWrapHeight, false);
    }, 300);
  },
  beforeDestroy() {
    let timerResize = setTimeout(() => {
      clearTimeout(timerResize);
      window.removeEventListener("resize", this.setTargetWrapHeight, false);
    }, 300);
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("pageTransition/startPageLoaded");
    to.name === "works-id"
      ? next()
      : setTimeout(() => {
          next();
        }, 300);
  },
};
</script>

<style lang="scss" scoped>
.contents__wrap {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  scroll-snap-type: y mandatory;
  overflow: auto;
  position: relative;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
