




<template>
  <div class="cart-list">
    <scroll class="content">
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>
      <li>neitong</li>


<!--      <li v-for="item in cartList">{{item}}</li>-->
    </scroll>

<!--    <div class="wrapper" ref="wrapper">-->
<!--      <div class="content">-->
<!--        <li v-for="item in cartList">{{item}}</li>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll'

import {mapGetters} from 'vuex'

export default {
  name: "CartList",
  computed: {
    ...mapGetters(['cartList'])
  },
  components: {
    Scroll,
  }
}
</script>

<style scoped>
  .cart-list d{
    height: calc(100% - 44px - 49px)
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
