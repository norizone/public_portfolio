<template>
  <section class="artwork">
    <canvas class="artwork__canvas" ref="canvas"></canvas>
  </section>
</template>

<script>
import ArtworkGL from "./js/ArtworkGL";

export default {
  name: "artwork",
  data() {
    return {
      artworkGL: "",
    };
  },
  mounted() {
    if (!this.artworkGL)
      this.artworkGL = new ArtworkGL({
        canvas: this.$refs.canvas,
      });
    this.pageTransition(this.$route.name);
  },
  watch: {
    "$route.name": function (to, from) {
      this.pageTransition(to);
    },
  },
  methods: {
    pageTransition(to) {
      setTimeout(() => {
        this.artworkGL.deformation(to);
      }, 800);
    },
  },
};
</script>
<style>
.artwork {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
}
</style>
