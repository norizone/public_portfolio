<template>
  <section class="article" v-if="content">
    <div class="article__headline">
      <BaseHeadLine :level="1" :text="content.title_en" />
    </div>

    <div class="article__top-pic-wrap">
      <WorksArticleMockPic
        :device="'desktop'"
        :img="desktopPic"
        :title="content.title"
      />
    </div>

    <div class="article__descriptions">
      <p class="article__title">{{ content.title }}</p>
      <div class="article__comment">
        <p>
          <span
            class="inline-block"
            v-for="(tool, index) in content.use_tools"
            :key="tool.id"
          >
            {{ tool
            }}{{
              index + 1 !== content.use_tools.length ? "&nbsp;/&nbsp;" : ""
            }} </span
          ><br />
        </p>
        <p v-html="content.comment"></p>
      </div>

      <p class="article__link">
        <BaseLink :link="content.url" />
      </p>

      <dl class="article__data">
        <dt class="upper">Release</dt>
        <dd>{{ releaseDate }}</dd>
        <dt class="upper">Role</dt>
        <dd>{{ content.role }}</dd>
      </dl>
    </div>
    <div class="article__spPic-wrap">
      <template v-for="el in mobilePics">
        <WorksArticleMockPic
          :device="'mobile'"
          :key="el.id"
          v-if="el"
          :img="el"
          :title="content.title"
        />
      </template>
    </div>
  </section>
</template>

<script>
import BaseHeadLine from "./BaseHeadLine.vue";
import BaseLink from "./BaseLink.vue";
import WorksArticleMockPic from "./WorksArticleMockPic.vue";
export default {
  components: {
    BaseHeadLine,
    BaseLink,
    WorksArticleMockPic,
  },
  props: {
    content: Object,
  },
  data() {
    return {
      desktopPic: null,
      mobilePics: null,
      releaseDate: null,
    };
  },
  methods: {
    formatDate(date) {
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      return `${y}年${m}月`;
    },
  },
  created() {
    this.desktopPic = this.content.single_img_pc
      ? this.content.single_img_pc
      : "";
    this.mobilePics = {
      pic1: this.content.single_img_sp_1 ? this.content.single_img_sp_1 : "",
      pic2: this.content.single_img_sp_2 ? this.content.single_img_sp_2 : "",
    };
    this.releaseDate = this.content.creation_date
      ? this.formatDate(new Date(this.content.creation_date))
      : "";
  },
};
</script>

<style lang="scss" scoped>
.article {
  &__headline {
    padding-top: 5vh;
    margin-top: vw(375, 80);
    @include media("lg") {
      margin-top: vw(1366, 80);
      margin-left: vw(1366, 40);
      margin-right: vw(1366, 40);
      display: flex;
      justify-content: center;
    }
    @include media("xl") {
      margin-top: 80px;
      margin-left: 40px;
      margin-right: 40px;
    }
  }
  &__top-pic-wrap {
    margin-top: vw(375, 20);
    @include media("s") {
      margin-top: 20px;
    }
    @include media("lg") {
      margin-top: vw(1366, 70);
    }
    @include media("xl") {
      margin-top: 70px;
    }
  }
  &__descriptions {
    display: flex;
    flex-flow: column nowrap;
    margin-top: vw(375, 60);
    padding: 0 vw(375, 30);
    @include media("s") {
      margin-top: 60px;
    }
    @include media("lg") {
      margin-top: vw(1366, 160);
      padding: 0;
      display: grid;
      width: 100%;
      grid-template-columns: p(868, 316) 1fr;
      column-gap: vw(1366, 26);
      row-gap: vw(1366, 26);
    }
    @include media("xl") {
      column-gap: 26px;
      row-gap: 26px;
      margin-top: 160px;
    }
  }
  &__title {
    font-size: rem(18);
    line-height: lh(18, 24);
    letter-spacing: ls(40);
  }
  &__comment {
    font-size: rem(14);
    line-height: lh(14, 24);
    letter-spacing: ls(40);
    margin-top: vw(375, 26);
    text-align-last: left;
    text-align: justify;
    @include media("s") {
      margin-top: 26px;
    }
    @include media("lg") {
      margin-top: 0;
    }

    &::v-deep a {
      //動的コンテンツ用
      text-decoration: underline;
    }
  }

  &__data {
    font-size: rem(14);
    letter-spacing: ls(40);
    font-family: var(--font-en);
    display: grid;
    grid-template-columns: 5.5em 1fr;
    row-gap: 16px;
    margin-top: vw(375, 22);
    @include media("s") {
      margin-top: 22px;
    }
    @include media("lg") {
      margin-top: 0;
    }
    dt {
      width: 5.5em;
      color: var(--color-gray);
    }
  }
  &__link {
    margin-top: vw(375, 30);
    order: 5;
    @include media("s") {
      margin-top: 30px;
    }
    @include media("lg") {
      margin-top: 0;
      order: inherit;
    }
  }
  &__spPic-wrap {
    margin-top: vw(375, 82);
    display: grid;
    grid-template-columns: p(310, 150) p(310, 150);
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    @include media("s") {
      margin-top: 82px;
      justify-content: flex-start;
      column-gap: p(868, 44);
      grid-template-columns: 150px 150px;
    }
    @include media("lg") {
      margin-top: vw(1366, 130);
      grid-template-columns: p(868, 264) p(868, 264);
    }
    @include media("xl") {
      margin-top: 130px;
    }
  }
}
</style>
