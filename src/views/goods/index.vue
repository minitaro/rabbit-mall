<script setup>
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { nextTick, provide, ref, watch } from 'vue'
import { findGoodsAPI } from '@/api/goods';
import { useCartStore } from '@/stores/cart';
import GoodsImage from './components/GoodsImage.vue'
import GoodsSales from './components/GoodsSales.vue'
import GoodsService from './components/GoodsService.vue'
import GoodsSku from './components/GoodsSku.vue';
import GoodsWarn from './components/GoodsWarn.vue'
import GoodsDetail from './components/GoodsDetail.vue'
import GoodsComment from './components/GoodsComment.vue'
import GoodsHot from './components/GoodsHot.vue';
import GoodsCrumb from './components/GoodsCrumb.vue'
import GoodsRelevant from './components/GoodsRelevant.vue'
const route = useRoute()

// 商品详情
const goods = ref(null)
const loading = ref(false)
watch(() => route.params.id, 
      (newVal) => {
                    if (newVal && `/goods/${newVal}` === route.path) {
                      loading.value = true
                      findGoodsAPI(route.params.id).then(data => {
                        goods.value = null // 让商品数据为null使用v-if的组件可以重新销毁和创建
                        nextTick(() => {
                          goods.value = data.result
                          loading.value = false
                        })
                      })
                    }
                  }, 
      { immediate: true })
provide('goods', goods)

// 商品sku
let sku = {}
// 商品sku规格变化
const skuSelect = (newSku) => {
  sku = newSku
}
// 商品数量
const count = ref(1)
// 商品数量变化
const countChange = (newCount) => count.value = newCount


// 购物车信息
const cartStore = useCartStore()
// 添加sku到购物车
const addToCart = () => {
  console.log(sku)
  if (sku.skuId) {
    const { skuId, specsText: attrsText, inventory: stock } = sku
    const { id, name, price, mainPictures } = goods.value
    cartStore.addToCart(
      {
        skuId,
        attrsText,
        stock,
        id,
        name,
        price,
        nowPrice: price,
        picture: mainPictures[0],
        count: count.value,
        selected: true,
        isEffective: true
      }
    )
    ElMessage.success('成功加入购物车')
  } else {
    ElMessage.warning('请选择规格')
  }
}

// 商品详情选项标签
const activeTab = ref('GoodsDetail')
const tabs = { 
  GoodsDetail, GoodsWarn, GoodsComment
}
</script>

<template>
  <AppHeaderSticky />  <!-- 吸顶组件 -->
  <div class="goods-page">
    <div class="container" v-if="!loading && goods">
      <GoodsCrumb /> <!-- 面包屑 -->
      <!-- ---------------------------------------------------------------------------- -->
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :imageList="goods.mainPictures" />
          <GoodsSales :goods="goods" />
        </div>
        <div class="spec">
          <p class="g-name"> {{ goods.name }} </p>
          <p class="g-desc">{{ goods.desc }} </p>
          <p class="g-price">
            <span>{{ goods.oldPrice }}</span>
            <span> {{ goods.price }}</span>
          </p>
          <GoodsService :goods="goods" />
          <GoodsSku :goods="goods" @sku-select="skuSelect" />
          <div class="g-count">
            <div class="label">数量</div>
            <div class="input-number">
              <el-input-number v-model="count" :min="1" :max="goods.inventory" @change="countChange" />
            </div>
          </div>
          <div>
            <el-button class="btn" @click="addToCart">加入购物车</el-button>
          </div>
        </div>
      </div>
      <!-- ---------------------------------------------------------------------------- -->
      <GoodsRelevant /> <!-- 商品推荐 -->
      <!-- ---------------------------------------------------------------------------- -->
      <div class="goods-footer">
        <!-- 商品介绍 -->
        <div class="goods-article">
          <div class="goods-tabs">
            <nav>
              <a @click="activeTab = 'GoodsDetail'"
                :class="{ active: activeTab === 'GoodsDetail' }"
                href="javascript:;">商品详情</a>
              <a @click="activeTab = 'GoodsComment'"
                :class="{ active: activeTab === 'GoodsComment' }"
                href="javascript:;">商品评价<span>({{ goods.commentCount }})</span></a>
              <a @click="activeTab = 'GoodsWarn'"
                :class="{ active: activeTab === 'GoodsWarn' }"
                href="javascript:;">注意事项</a>
            </nav>
            <keep-alive include="GoodsDetail, GoodsWarn, GoodsComment">
              <component :is="tabs[activeTab]"></component>
            </keep-alive>
          </div>
        </div>
        <!-- ---------------------------------------------------------------------------- -->
        <!-- 商品热榜：1代表24小时热销榜 2代表周热销榜 3代表总热销榜  -->
        <div class="goods-hot"> 
          <GoodsHot :type="1" /> 
          <GoodsHot :type="2" />
          <GoodsHot :type="3" />
        </div>
      </div>
    </div>
    <div v-else class="loading"></div>
  </div>
</template>

<style scoped lang="scss">
.loading {
  height: 580px;
  width: 1240px;
  margin: 72px auto 20px;
  background: rgba(255,255,255,.9) url(@/assets/images/loading.gif) no-repeat center;
}
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
    .g-name {
      font-size: 22px;
    }
    .g-desc {
      color: #999;
      margin-top: 10px;
    }
    .g-price {
      margin-top: 10px;
      span {
        &::before {
          content: "¥";
          font-size: 14px;
        }
        &:first-child {
          color: $priceColor;
          margin-right: 10px;
          font-size: 22px;
        }
        &:last-child {
          color: #999;
          text-decoration: line-through;
          font-size: 16px;
        }
      }
    }
    .g-count {
      display: flex;
      align-items: center;
      .label {
        width: 60px;
        color: #999;
        padding-left: 10px;
      }
    }
    .btn {
      margin-top: 20px;
      width: 150px;
      height: 50px;
      border-color: $xtxColor;
      background: $xtxColor;
      color: #fff;
    }
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
    .goods-tabs {
      min-height: 600px;
      background: #fff;
      nav {
        background: #fff;
        height: 50px;
        line-height: 50px;
        display: flex;
        border-bottom: 1px solid $xtxColor;
        a {
          padding: 0 40px;
          font-size: 18px;
          position: relative;
          > span {
            color: $priceColor;
            font-size: 16px;
            margin-left: 10px;
          }
          &:hover {
            color: $xtxColor;
          }
          &.active {
            background: $xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .goods-hot {
    width: 280px;
    min-height: 1000px;
  }
}

</style>
