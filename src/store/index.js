import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  // mutations: {
    // addCart(state, payload) {
      // 方法一：
      // let oldProduct = null;
      // for(let item of state.cartList) {
      //   if(item.iid === payload.iid) {
      //     oldProduct = item;
      //   }
      // }
      //
      // if(oldProduct) {
      //   oldProduct.count++
      // }else {
      //   payload.count = 1;
      //   state.cartList.push(payload);
      // }

      // 方法二(没看懂)
      // let index = state.cartList.indexOf(payload)
      // if(index === -1) {
      //   let oldProduct = state.cartList[index]
      //   oldProduct.count += 1
      // }else {
      //   payload.count = 1;
      //   state.cartList.push(payload);
      // }


      // 方法三
    //   let oldProduct = state.cartList.find(item => item.iid === payload.iid)
    //   if(oldProduct) {
    //     oldProduct.count++;
    //   }else {
    //     payload.count = 1;
    //     state.cartList.push(payload);
    //   }
    //
    // }

  //   addCounter(payload) {
  //     payload.count++;
  //   },
  //   addToCart(state, payload) {
  //     state.cartList.push(payload)
  //   }
  // },


  actions,
})


export default store
