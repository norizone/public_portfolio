<template>
  <div class="l-wrap -primary">
    <template v-if="content">
      <WorksArticleContents :content="content" />
    </template>
    <template v-if="nextContent">
      <WorksArticleNextContents :nextContent="nextContent" />
    </template>
  </div>
</template>

<script>
import WorksArticleContents from "./WorksArticleContents.vue";
import WorksArticleNextContents from "./WorksArticleNextContents.vue";

export default {
  props: {
    content: Object,
    nextContent: { type: Object, require: false, default: null },
  },
  components: { WorksArticleContents, WorksArticleNextContents },
};
</script>
