<template>
  <div class="field">
    <p class="field__labels">
      <span class="field__label upper">{{ label }}</span>
      <strong v-if="requireValue" class="field__require">require</strong>
    </p>

    <div class="field__box-wrap">
      <textarea
        v-if="type === 'textarea'"
        class="field__box full field__textarea"
        :class="{ error: errorText }"
        name=""
        id=""
        v-model="sendValue"
      >
      </textarea>

      <input
        v-else
        :type="type"
        class="field__box full"
        @blur="inputValidation"
        :class="{ error: errorText }"
        :placeholder="placeholder"
        :name="nameLabel"
        :autocomplete="autocomplete"
        v-model="sendValue"
      />

      <p v-if="errorMessage" class="field__error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
const jsonpAdapter = require("axios-jsonp");
export default {
  props: {
    value: String,
    indexNumber: Number,
    errorText: { type: String, default: null },
    type: {
      type: String,
      default: "text",
    },
    label: String,
    requireValue: {
      type: Boolean,
      default: false,
    },
    nameLabel: String,
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    autocomplete: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      sendValue: "",
      errorMessage: "",
    };
  },

  methods: {
    inputValidation() {
      if (this.requireValue && this.value.length >= 1) {
        if (this.nameLabel === "email") {
          this.emailValidate();
        }
      }
    },

    resetValidation() {
      if (this.errorMessage) {
        this.$emit("changeError", this.indexNumber, "");
      }
    },

    emailValidate() {
      if (
        !this.value.match(
          /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
        )
      ) {
        this.$emit(
          "changeError",
          this.indexNumber,
          "メールアドレスを正しく入力して下さい"
        );
      } else {
        this.$emit("changeError", this.indexNumber, "");
      }
    },
  },

  watch: {
    sendValue(newValue, oldValue) {
      this.$emit("changeValue", this.indexNumber, this.sendValue);
    },
    value(newValue, oldValue) {
      this.sendValue = this.value;
      if (this.value.length >= 1) {
        this.resetValidation();
      }
    },
    errorText(newValue, oldValue) {
      this.errorMessage = this.errorText;
    },
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "assets/scss/_functions";
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  -moz-appearance: textfield;
}
input[type="date"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="date"]::-webkit-clear-button {
  -webkit-appearance: none;
}
input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.field {
  padding-bottom: vw(375, 36);
  @include media("s") {
    padding-bottom: rem(36);
  }
  @include media("xl") {
    width: 100%;
    max-width: 768px;
    display: grid;
    grid-template-columns: 1fr p(768, 600);
    column-gap: p(768, 20);
    padding-bottom: rem(40);
  }

  &__error {
    color: var(--color-error);
    position: absolute;
    font-size: rem(13);
    bottom: -1.4em;
    @include media("lg") {
      font-size: rem(15);
    }
  }

  &__labels {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    @include media("xl") {
      align-items: flex-start;
      flex-flow: column nowrap;
      align-items: flex-start;
    }
  }

  &__label {
    font-size: rem(14);
    letter-spacing: ls(40);
    font-family: var(--font-en);
    font-weight: var(--font-regular);
    @include media("lg") {
      font-size: rem(16);
    }
  }

  &__require {
    font-size: rem(14);
    color: var(--color-error);
    letter-spacing: ls(40);
    font-family: var(--font-en);
    font-weight: var(--font-regular);
    margin-left: 1em;
    @include media("xl") {
      margin-left: 0;
    }
  }
  &__box-wrap {
    position: relative;
    width: auto;
    margin-top: rem(7);
    @include media("xl") {
      margin-top: 0;
    }
  }

  &__box {
    background: rgba($color: #fff, $alpha: 0.5);
    transition: border;
    color: var(--color-black);
    min-height: 48px;
    padding: 0 14px;
    font-size: rem(16);
    position: relative;
    width: 100%;
    transition: border 0.2s linear, background 0.2s linear;
    @include media("lg") {
      min-height: 58px;
    }
    &:focus,
    &:focus-visible {
      outline: none;
      background: rgba($color: #fff, $alpha: 1);
    }
    &.error {
      border: 1px solid var(--color-gray);
      background: rgba($color: #fff, $alpha: 1);
    }
  }

  &__textarea {
    min-height: 224px;
    padding: 14px 14px;
    @include media("lg") {
      min-height: 200px;
    }
  }
}
</style>
