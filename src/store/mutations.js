
import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutationtypes'

export default  {
  ADD_COUNTER(payload) {
    payload.count++;
  },
  ADD_TO_CART(state, payload) {
    state.cartList.push(payload)
  }
}
