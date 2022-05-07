<template>
  <div class="footer" ref="target">
    <div class="footer__btn" v-if="moreAddContent">
      <BaseBtn :text="'view more'" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseBtn from "./BaseBtn.vue";
export default {
  data() {
    return {
      target: "",
      executionAddApi: false,
    };
  },
  computed: {
    ...mapGetters({ moreAddContent: "api/watchMoreAddContent" }),
  },
  methods: {
    init() {
      this.target = this.$refs.target;
      this.addApiTrigger();
    },

    clickAddApiList() {
      if (this.moreAddContent) this.$store.dispatch("api/addFetch");
    },

    disableScroll(e) {
      e.preventDefault();
    },

    scrollCallback(entries) {
      entries.forEach((el) => {
        if (el.isIntersecting && this.moreAddContent)
          setTimeout(() => {
            new Promise((resolve) => {
              document.addEventListener("touchmove", this.disableScroll, {
                passive: false,
              });
              document.addEventListener("mousewheel", this.disableScroll, {
                passive: false,
              });
              resolve();
            })
              .then(() => {
                this.$store.dispatch("api/addFetch");
              })
              .then(() => {
                //updateで値が変わったかを確認 確認できたらスクロール開始
                document.removeEventListener("touchmove", this.disableScroll, {
                  passive: false,
                });
                document.removeEventListener("mousewheel", this.disableScroll, {
                  passive: false,
                });
              });
          }, 1000);
      });
    },
    addApiTrigger() {
      const options = {
        root: null,
        rootMargin: "50%",
        threshold: 0,
      };
      new IntersectionObserver(this.scrollCallback, options).observe(
        this.target
      );
    },
  },
  mounted() {
    this.init();
  },
  components: { BaseBtn },
};
</script>

<style lang="scss" scoped>
.footer {
  height: calc(28% + 120px);
  &__btn {
    width: max-content;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
