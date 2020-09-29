




<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车({{cartLength}})
      </div>
    </nav-bar>

    <CartList></CartList>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'

import CartList  from "@/views/cart/childComps/CartList";



import {mapGetters} from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
}
</script>

<style>
.nav-bar {
  background-color: var(--color-tint);
  color:#fff;
}
.cart {
  height: 100vh;
}
</style>
