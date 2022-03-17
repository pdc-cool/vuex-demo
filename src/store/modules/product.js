import { PRODUCT_INCREMENT_PLUS } from '../mutation-types';

const productModule = {
  namespaced: true,
  state: () => ({
    number: 10,
  }),
  mutations: {
    [PRODUCT_INCREMENT_PLUS](state, number) {
      state.number += number;
    },
  },
  actions: {
    asyncUpdate({ state, rootState }) {
      state.number++;
      console.log('----rootState----', rootState);
    },
  },
};

export default productModule;
