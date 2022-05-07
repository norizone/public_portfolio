<template>
  <component
    :is="isExternalLink(link) ? 'a' : 'nuxt-link'"
    :to="!isExternalLink(link) ? link : ''"
    :href="isExternalLink(link) ? link : ''"
    :target="isExternalLink(link) ? '_blank' : ''"
    :rel="isExternalLink(link) ? 'noopener noreferrer' : ''"
    class="upper link"
    ><span>{{ text }}</span
    ><ArrowSvg v-if="isExternalLink(link)"
  /></component>
</template>
<script>
import ArrowSvg from "@/assets/image/common/arrow.svg?inline";
export default {
  components: { ArrowSvg },
  props: {
    link: { type: String, require: true, default: false },
    text: { type: String, require: false, default: "visit website" },
  },
  methods: {
    isExternalLink(link) {
      //httpsから始まるかチェック
      return /^https?:\/\//.test(link);
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.link {
  font-size: rem(16);
  letter-spacing: ls(40);
  font-family: var(--font-en);
  font-weight: var(--font-regular);
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  span {
    margin-right: 1em;
  }
}
</style>
