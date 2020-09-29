<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物车</div></NavBar>

    <scroll class="content" ref="scroll"
            :probeType="3"
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="loadMore">

      <!--大的轮播图-->
      <HomeSwiper :banners="banners"></HomeSwiper>

      <HomeRecommendView :recommends="recommends"></HomeRecommendView>

      <!--本周流行-->
      <FeatureView/>
      <TabControl class="tab-control" :titles="['流行','新款','精选']"
                  @tabClick="tabClick" ref="tabControl"/>
      <GoodsList :goods="showGoods"></GoodsList>
    </scroll>

    <BackTop @click.native="backClick" v-show="isShowBackTop"/>


  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from '../../components/common/navbar/NavBar'
  import TabControl from '../../components/content/tabControl/TabControl'
  import GoodsList from '../../components/content/goods/GoodsList'
  import Scroll from '../../components/common/scroll/Scroll'
  // import BackTop from '../../components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from "../../network/home"
  import {debounce} from '../../common/utils'
  import {itemListenerMinxin, backTopMixin} from "@/common/mixin";


  export default {
    name: 'Home',
    components: {
      HomeSwiper,
      HomeRecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins: [itemListenerMinxin, backTopMixin],
    data() {
      return {
        banners:[],
        recommends: [],
        goods: {
          'pop': {page:0, list: []},
          'new': {page:0, list: []},
          'sell': {page:0, list: []},
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        saveY: 0,
      }
    },
    computed:{
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    destroyed() {
      console.log('destroyed')
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();

    },
    mounted() {

    },
    methods: {
    /*
      事件监听相关的方法
    */

    /*防抖动函数（debounce）：将被频繁调用的函数推迟到最后一次调用*/

      tabClick(index) {
        switch(index) {
          case 0: this.currentType = 'pop'; break;
          case 1: this.currentType = 'new'; break;
          case 2: this.currentType = 'sell'; break;
        }
      },

      contentScroll(position) {
        this.listenShowBackTop(position)
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },



    /*
      网络请求相关的方法
    */
      getHomeMultidata() {
         getHomeMultidata().then( res => {
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
         } )
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then( res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }


  .home-nav {
    color: #fff;
    background-color: var(--color-tint);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
  }

  .tab-control {

  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
  }



</style>
