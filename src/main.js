import { createApp } from 'vue';
import store from './store';
import App from './App.vue';

import { CUSTOM_STR } from './store/mutation-types';

const appInstance = createApp(App);

console.log('-------store----', store);

appInstance.use(store);

window.store = store;

console.log('---- call action----');

store.dispatch('asyncUpdateCount');

store.dispatch('productModule/asyncUpdate');

store.watch(
  state => state.count,
  newVal => {
    console.log('----count---', newVal);
  }
);

store.subscribe((mutation, state) => {
  console.log('----state---', state);
  console.log('----mutation.type--', mutation.type);
  console.log('-----mutation.payload----', mutation.payload);
});

store.registerModule(['priceModule', 'customModule'], {
  state: () => ({
    pdc: '123',
  }),
  mutations: {
    [CUSTOM_STR](state, str) {
      state.pdc += str;
    },
  },
});

const isCustomModule = store.hasModule(['priceModule', 'customModule']);

console.log('----isCustomModule registerModule----', isCustomModule);

store.unregisterModule(['priceModule', 'customModule'])

const isUnregisterCustomModule = store.hasModule(['priceModule', 'customModule']);


console.log('----isCustomModule unregisterModule----', isUnregisterCustomModule);


appInstance.mount('#app');
