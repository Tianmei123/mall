



<template>
<div id="detail">
  <DetailNavBar class="detailNavbar" @titleClick="titleClick" ref="nav"/>
  <scroll class="content" ref="scroll"
          @scroll="contentScroll"
          :probeType="3">
    <div>{{$store.state.cartList.length}}</div>
    <detail-swiper this.:top-images="topImages"/>
    <DetailBaseInfo :goods="goods"/>
    <DetailShopInfo :shop="shop"/>
    <DetailGoodsInfo :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
    <DetailParamInfo ref="params" :param-info="paramInfo"/>
    <DetailCommentInfo ref="comment" :comment-info="commentInfo"/>
    <GoodsList ref="recommend" :goods="recommends "/>
  </scroll>
  <BackTop @click.native="backClick" v-show="isShowBackTop"/>
  <DetailBottomBar @addCart="addToCart"/>
</div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from '../../components/common/scroll/Scroll'
  import GoodsList from '../../components/content/goods/GoodsList'

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from '../../network/detail'
  import {itemListenerMinxin, backTopMixin} from "@/common/mixin";
  import {debounce} from "@/common/utils";



  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      DetailBottomBar,
      GoodsList,
    },
    mixins: [itemListenerMinxin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex: 0
      }
    },
    created() {
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(res => {

        const data = res.result

        this.topImages = data.itemInfo.topImages

        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        this.shop  = new Shop(data.shopInfo)

        this.detailInfo = data.detailInfo;

        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      getRecommend().then(res => {
        this.recommends = res.data.list

      })

      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      })
    },
    mounted() {

    },
    methods: {
      detailImageLoad() {
        this.newRefresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      contentScroll(position) {
          const positionY = -position.y
          let length = this.themeTopYs.length
        for(let i=0; i<length; i++) {
          // if(this.currentIndex !== i && ((i < length-1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length-1 && positionY > this.themeTopYs[i]))) {
          //   this.currentIndex = i;
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }

          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
              this.currentIndex = i;
              this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        this.listenShowBackTop(position)

      },

      addToCart() {
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        this.$store.dispatch('addCart', product)
      }
    },
    // watch: {
    //   detailInfo() {
    //     this.imagesLength = this.detailInfo.detailImages[0].list.length
    //   }
    // }


  }
</script>

<style scoped>
/*#detail {*/
/*  position: relative;*/
/*  z-index: 9;*/
/*  background-color: #fff;*/
/*  height: 100vh;*/
/*}*/


#detail {

  height: 100vh;

  position: relative;

  z-index: 1;

  background-color: #fff;

}



.content {

  position: absolute;

  top: 44px;

  bottom: 60px;

}

.detailNavbar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

/*.content {*/
/*  height: calc(100% - 44px)*/
/*}*/

</style>
