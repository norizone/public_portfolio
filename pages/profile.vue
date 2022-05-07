<template>
  <div class="l-wrap">
    <ThePageCloseBtn />
    <ProfileContents />
    <ProfileContact />
    <TheFooter />
  </div>
</template>

<script>
import ProfileContents from "../components/ProfileContents.vue";
import ProfileContact from "../components/ProfileContact.vue";
import ThePageCloseBtn from "../components/ThePageCloseBtn.vue";
import TheFooter from "../components/TheFooter.vue";
export default {
  head() {
    return {
      title: "Profile" + " | ",
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
  components: { ProfileContents, ProfileContact, ThePageCloseBtn, TheFooter },
  mounted() {
    this.$store.commit("pageTransition/setWorksId", "");
    if (this.$route.hash && this.$route.hash.match(/^#.+$/)) {
      const hash = this.$route.hash;
      const id = hash.replace("#", "");
      document.getElementById(id).scrollIntoView({
        block: "start",
      });
    } else {
      window.scrollTo({ top: 0 });
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("pageTransition/startPageLoaded");
    setTimeout(() => {
      next();
    }, 300);
  },
};
</script>

<style lang="scss" scoped></style>
