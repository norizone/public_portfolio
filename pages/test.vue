<template></template>

<script>
export default {
  data() {
    return {
      contents: "",
    };
  },
  async asyncData(context) {
    const q = "yq26u6y8p3ad";
    context
      .$fetchJSON("/api/article", { q })
      .then((response) => {
        if (response.contents[0]) return { contents: response.contents[0] };
        if (!response.contents[0])
          error({ statusCode: 404, message: "ページが見つかりませんでした。" });
      })
      .catch((error) => {
        console.log("test-error");
        console.log(error);
      });
  },

  mounted() {
    console.log(this.contents);
    // const q = "yq26u6y8p3ad";
    // this.$fetchJSON("/api/article", { q })
    //   .then((response) => {
    //     if (response.contents[0]) this.contents = response.contents[0];
    //     if (!response.contents[0])
    //       error({ statusCode: 404, message: "ページが見つかりませんでした。" });
    //   })
    //   .then(() => {
    //     console.log(this.contents);
    //   })
    //   .catch((error) => {
    //     console.log("test-error");
    //     console.log(error);
    //   });
  },
};
</script>
