import { PRICE_INCREMENT_PLUS } from '../mutation-types';

const priceModule = {
  namespaced: true,
  state: () => ({
    price: 1.2,
  }),
  mutations: {
    [PRICE_INCREMENT_PLUS](state, price) {
      state.price += price;
    },
  },
};

export default priceModule;
