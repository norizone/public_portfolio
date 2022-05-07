<template>
  <div class="contact">
    <nuxt-link to="/profile/#contact" title="contact"><MailSvg /></nuxt-link>
  </div>
</template>
<script>
import MailSvg from "@/assets/image/common/mail.svg?inline";
export default {
  components: {
    MailSvg,
  },
};
</script>
<style lang="scss" scoped>
.contact {
  position: fixed;
  bottom: 32px;
  right: vw(375, 18);
  font-family: var(--font-en);
  letter-spacing: ls(40);
  font-weight: var(--font-regular);
  @include media("lg") {
    right: vw(1366, 62);
    bottom: 82px;
  }
  @include media("xl") {
    right: rem(62);
  }
}
</style>
