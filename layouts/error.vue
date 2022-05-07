<template>
  <section class="error">
    <BaseHeadLine :text="error.statusCode" :level="false" />
    <p class="error__text">{{ error.message }}</p>
    <div class="error__link">
      <BaseLink :link="'/'" :text="'Return to home'" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    error: { type: Object, default: null },
  },
  methods: {
    checkErrorText() {
      if (this.error.statusCode)
        error.message =
          "お探しのページはお探しのページは、見つかりませんでした。";
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  &__link {
    margin-top: 40px;
  }
}
</style>
