export const state = () => ({
  //初期値
  pageLoaded: false,
  worksId: "",
});

export const getters = {
  //変更された値を保持する
  watchPageLoaded: (state) => state.pageLoaded,
};

export const mutations = {
  //データの情報源を更新する
  startPageLoaded(state) {
    state.pageLoaded = false;
  },
  finishPageLoaded(state) {
    state.pageLoaded = true;
  },
  setWorksId(state, id) {
    state.worksId = id;
  },
};

export const actions = {};
