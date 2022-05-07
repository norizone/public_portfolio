export const state = () => ({
  //初期値
  apiList: [{ topContent: true, title_en: "" }],
  loadedCount: 5,
  limit: 5,
  moreAddContent: true, //追加があるか
  keepApi: [],
});

export const getters = {
  //変更された値を保持する
  watchApiList: (state) => state.apiList,
  watchKeepApi: (state) => state.keepApi,
  watchMoreAddContent: (state) => state.moreAddContent,
  watchLoadedCount: (state) => state.loadedCount,
};

export const mutations = {
  //データの情報源を更新する
  setItems(state, list) {
    state.apiList.push(...list);
  },
  setKeepApi(state, list) {
    state.keepApi = list;
  },
  setMoreAddContent(state) {
    state.moreAddContent = false;
  },
  addLoadedCount(state, count) {
    state.loadedCount += count;
  },
};

export const actions = {
  //非同期処理や外部APIとの通信を行い、最終的にmutationを呼び出す
  async firstArticleFetch({ commit, state }) {
    // 取得先のURL
    const url = this.$config.apiURL;
    const key = this.$config.apiKey;
    await this.$axios
      .$get(
        url +
          `?orders=-publishedAt&fields=id,title_en,archive_img,use_tools&offset=0&limit=${state.loadedCount}`,
        {
          headers: { "X-MICROCMS-API-KEY": key },
        }
      )
      .then((response) => {
        commit("setItems", response["contents"]);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  //追加読み込み
  async addFetch({ commit, state }) {
    const limit = state.limit;
    const offset = state.loadedCount;
    await this.$fetchJSON("/api/list", { limit, offset }).then((response) => {
      commit("setKeepApi", response["contents"]);
      commit("setItems", response["contents"]);
      commit("addLoadedCount", response["contents"].length);
      if (response["contents"].length < limit) {
        commit("setMoreAddContent");
      }
    });
  },
};
