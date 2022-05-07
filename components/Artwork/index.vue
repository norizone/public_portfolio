<template>
  <section class="effectArt">
    <canvas class="effectArt__canvas" ref="canvas"></canvas>
  </section>
</template>

<script>
import ArtGL from "./js/main";
import { mapGetters } from "vuex";

export default {
  name: "effectArt",
  props: {
    pageLoaded: Boolean,
    pathName: String,
  },
  data() {
    return {
      artGL: null,
    };
  },
  mounted() {
    //webGL生成
    this.artGL = new ArtGL({
      canvas: this.$refs.canvas,
    });
    this.pageTransition(this.$route.name);
  },
  computed: {
    ...mapGetters({
      watchKeepApi: "api/watchKeepApi",
      watchLoadedCount: "api/watchLoadedCount",
    }),
  },
  watch: {
    watchKeepApi() {
      this.addShapes();
    },
    "$route.name"(to, from) {
      // 読み込み完了後にする
      setTimeout(() => {
        this.pageTransition(to);
      }, 300);
    },
    watchLoadedCount(addLoadedIndex, firstLoadedIndex) {
      setTimeout(() => {
        this.addShapes(addLoadedIndex, firstLoadedIndex);
      }, 300);
    },
  },
  methods: {
    addShapes(addLoadedIndex, firstLoadedIndex) {
      const textures = document.querySelectorAll(".canvas-img");
      for (let index = firstLoadedIndex; index < addLoadedIndex; index++) {
        this.artGL.addShape(textures[index], index);
      }
    },
    pageTransition(to) {
      this.artGL.deformation(to);
    },
  },
};
</script>
<style>
.effectArt {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
