<template>
  <div class="form" id="js-scrollTarget">
    <transition name="fade" mode="out-in">
      <p v-if="sendSuccess">お問い合わせありがとうございました</p>
    </transition>
    <transition name="fade" mode="out-in">
      <section v-if="!sendSuccess">
        <div
          class="form__field"
          :class="{ sending: !sendBtn }"
          v-for="(form, index) in forms"
          :key="form.id"
        >
          <TheContactInput
            @changeValue="changeValue"
            @changeError="changeError"
            :indexNumber="index"
            :value="form.value"
            :type="form.type"
            :label="form.label"
            :requireValue="form.requireValue"
            :nameLabel="form.nameLabel"
            :placeholder="form.placeholder"
            :autocomplete="form.autocomplete"
            :errorText="form.errorText"
          />
        </div>
        <button
          v-if="sendBtn"
          type="submit"
          class="form__btn"
          @click="sendMail"
        >
          <span class="upper">send message</span><ArrowSvg />
        </button>

        <p v-if="!sendBtn" class="form__btn">
          <span class="upper">sending</span><LoadSvg />
        </p>

        <p class="form__send-error" v-if="sendError">
          送信できませんでした<br />もう一度お試し下さい
        </p>
      </section>
    </transition>
  </div>
</template>

<script>
import TheContactInput from "./TheContactInput.vue";
import ArrowSvg from "@/assets/image/common/doubleArrow.svg?inline";
import LoadSvg from "@/assets/image/common/load.svg?inline";
import "scroll-behavior-polyfill";
export default {
  components: { TheContactInput, ArrowSvg, LoadSvg },
  data() {
    return {
      forms: [
        {
          value: "",
          errorText: "",
          label: "name",
          type: "text",
          nameLabel: "name",
          autocomplete: "name",
          requireValue: true,
        },
        {
          value: "",
          errorText: "",
          label: "mail address",
          type: "email",
          nameLabel: "email",
          autocomplete: "email",
          requireValue: true,
        },
        {
          value: "",
          errorText: "",
          label: "message",
          type: "textarea",
          nameLabel: "text",
          requireValue: true,
        },
      ],
      sendError: false,
      sendSuccess: false,
      sendBtn: true,
    };
  },
  methods: {
    changeValue(index, newValueForm) {
      //送信用value書き換え
      this.forms[index].value = newValueForm;
    },
    changeError(index, newError) {
      this.forms[index].errorText = newError;
    },

    windowScroll() {
      //エラーがある場合はfind最初のエラー部分までスクロールで戻す
      const errorTargetIndex = this.forms.findIndex((el) => el.errorText);
      const fieldTarget = document.querySelectorAll(".field")[errorTargetIndex];
      const targetPosition = fieldTarget.getBoundingClientRect().top;
      const windowScroll = window.pageYOffset; //スクロールイ位置
      const margin = window.innerHeight / 2;
      const scrollValue = windowScroll + targetPosition - margin;
      window.scrollTo({
        top: scrollValue,
        left: 0,
        behavior: "smooth",
      });
    },

    sendMail() {
      //axiosで値を渡す json形式
      let validate = this.forms.every((el) => {
        //必須を持ち値が空じゃなく入力errorが無いもの
        return (
          (el.requireValue && el.value && !el.errorText) || !el.requireValue
        );
      });
      if (validate) {
        let sendData = [];
        new Promise((resolve) => {
          sendData = this.forms.map((el) => {
            return { name: el.nameLabel, label: el.label, value: el.value };
          });
          resolve();
        }).then(() => {
          this.sendBtn = false;
          this.$axios
            .$post(this.$config.sendMailURL, sendData, {
              withCredentials: true,
            })
            .then((res) => {
              this.sendBtn = true;
              this.sendSuccess = true;
              // valueを初期化
              this.forms.forEach((el) => {
                el.value = "";
              });
            })
            .catch((error) => {
              this.sendBtn = true;
              this.sendError = true;
            });
        });
      } else {
        this.forms.map((el) => {
          if (el.requireValue && el.value == "") {
            if (!el.errorText) {
              el.errorText = "入力して下さい";
            }
          }
        });
        this.windowScroll();
      }
    },
  }, // end-method

  watch: {
    sendSuccess() {
      if (this.sendSuccess) {
        setTimeout(() => {
          this.sendSuccess = false;
        }, 3000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin-left: vw(375, 30);
  position: relative;
  z-index: 0;
  margin-top: vw(375, 26);
  @include media("s") {
    margin-top: rem(26);
    margin-left: rem(30);
  }
  @include media("lg") {
    margin-top: vw(1366, 76);
    margin-left: 0;
  }
  @include media("xl") {
    margin-top: rem(76);
  }
  &__field {
    &.sending {
      pointer-events: none;
    }
  }
  &__btn {
    font-size: vw(375, 28);
    font-family: var(--font-en);
    letter-spacing: ls(20);
    font-weight: var(--font-bold);
    margin-top: vw(375, 20);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: max-content;
    margin-left: auto;
    margin-right: auto;

    @include media("s") {
      margin-top: 20px;
      font-size: rem(28);
    }
    @include media("lg") {
      font-size: vw(1366, 40);
      margin-top: vw(1366, 20);
    }
    @include media("xl") {
      font-size: rem(40);
      margin-top: rem(20);
      padding-left: rem(110);
    }
    & svg {
      width: vw(375, 16);
      margin-left: vw(375, 10);
      height: auto;
      @include media("s") {
        width: rem(16);
        margin-left: rem(10);
      }
      @include media("lg") {
        width: vw(1366, 20);
        margin-left: vw(1366, 22);
      }
      @include media("xxl") {
        width: rem(20);
        margin-left: rem(22);
      }
    }
  }
  &__send-error {
    text-align: center;
    color: var(--color-error);
    margin-top: 10px;
    font-size: rem(13);
    @include media("lg") {
      font-size: rem(15);
    }
  }
}
</style>
