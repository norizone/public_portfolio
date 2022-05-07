<template>
  <section class="contact" id="contact">
    <BaseNumberHeadLine :level="1" :text="'2.contact'" />

    <div class="contact__form">
      <TheContactForm />
    </div>
  </section>
</template>

<script>
import BaseNumberHeadLine from "./BaseNumberHeadLine.vue";
import TheContactForm from "./TheContactForm.vue";
export default { components: { BaseNumberHeadLine, TheContactForm } };
</script>

<style lang="scss" scoped>
.contact {
  padding-top: vw(375, 102);
  @include media("s") {
    padding-top: 102px;
  }
  @include media("lg") {
    padding-top: vw(1366, 200);
  }
  @include media("xl") {
    padding-top: 200px;
  }
}
</style>
