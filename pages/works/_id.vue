<template>
  <div>
    <ThePageCloseBtn />
    <WorksArticle :content="content" :nextContent="nextContent" />
    <TheFooter />
  </div>
</template>

<script>
import WorksArticle from "../../components/WorksArticle.vue";
import ThePageCloseBtn from "../../components/ThePageCloseBtn.vue";
import TheFooter from "../../components/TheFooter.vue";

export default {
  data() {
    return {
      content: null,
      nextContent: null,
    };
  },

  async asyncData({ app, route, $config, error }) {
    const id = route.params.id;
    if (!process.client) {
      const url = $config.apiURL;
      const key = $config.apiKey;
      const response = await app.$axios.$get(url + `?ids=${id}`, {
        headers: { "X-MICROCMS-API-KEY": key },
      });
      if (response.contents[0])
        return {
          content: response.contents[0],
        };
      if (!response.contents[0])
        error({
          statusCode: 404,
          message: "ページが見つかりませんでした。",
        });
    } else {
      const response = await app.$fetchJSON("/api/article", { id: id });
      if (response.contents[0])
        return {
          content: response.contents[0],
        };
      if (!response.contents[0])
        error({
          statusCode: 404,
          message: "ページが見つかりませんでした。",
        });
    }
  },

  head() {
    return {
      title: this.content.title + " | ",
      meta: [
        {
          hid: "og:description",
          property: "og:description",
          content: `制作実績 | ${this.content.title}`,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `https://3na3.net/works/${this.content.id}`,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.content.archive_img.url,
        },
      ],
    };
  },
  methods: {
    async getNextContent() {
      const publishedAt = this.content.publishedAt;
      await this.$fetchJSON("/api/nextPage", { publishedAt }).then((res) => {
        if (res.contents[0]) this.nextContent = res.contents[0];
        if (!res.contents[0])
          //次の記事がない場合だけ最初の記事取る
          this.getFirstContent();
      });
    },
    async getFirstContent() {
      await this.$fetchJSON("/api/firstPage", null).then((res) => {
        this.nextContent = res.contents[0];
      });
    },
    async pageContents() {
      const id = this.$route.params.id;
      await this.$fetchJSON("/api/article", { id }).then((res) => {
        this.content = res.contents[0];
      });
    },
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.getNextContent();
    this.$store.commit("pageTransition/setWorksId", this.content.id); //storeでページid保持
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("pageTransition/startPageLoaded");
    setTimeout(() => {
      next();
    }, 300);
  },

  components: { WorksArticle, ThePageCloseBtn, TheFooter },
};
</script>
