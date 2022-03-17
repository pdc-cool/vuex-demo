import { createStore } from 'vuex';

import priceModule from './modules/price';
import productModule from './modules/product';

import { INCREMENT_PLUS } from './mutation-types';

const store = createStore({
  state: () => ({
    count: 0,
  }),
  mutations: {
    [INCREMENT_PLUS](state) {
      state.count++;
    },
  },
  actions: {
    asyncUpdateCount({ commit, state }) {
      console.log('----count---', state.count);

      setTimeout(() => {
        commit(INCREMENT_PLUS);
        console.log('----asyncUpdateCount count----', state.count);
      }, 1000);
    },
  },
  modules: {
    priceModule,
    productModule,
  },
});

export default store;
