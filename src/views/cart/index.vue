<script setup>
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart.js'
import GoodsRelevant from '@/views/goods/components/GoodsRelevant.vue'

const router = useRouter()
const cartStore = useCartStore()
// 下单结算
const checkout = () => {
  if (cartStore.selectedList.length === 0) return ElMessage.warning('请至少选中一件商品')
  return router.push('/checkout')
}
</script>



<template>
  <div class="cart-page">
    <div class="container m-top-20">
      <AppBreadcrumb separator="iconfont icon-angle-right">
        <AppBreadcrumbItem to="/">首页</AppBreadcrumbItem>
        <AppBreadcrumbItem>购物车</AppBreadcrumbItem>
      </AppBreadcrumb>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <AppCheckbox :model-value="cartStore.isAllSelected" @check-change="(selected) => cartStore.allCheck(selected)">
                全选
                </AppCheckbox>
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 商品列表 -->
          <tbody>
            <tr v-if="cartStore.validList.length === 0">
              <td colspan="6">
                <div class="cart-none">
                  <img src="@/assets/images/none.png" alt="" />
                  <p>购物车内暂时没有商品</p>
                  <div class="btn">
                    <AppButton type="primary" @click="$router.push('/')">继续逛逛</AppButton>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-for="item in cartStore.validList" :key="item.id">
              <td class="t-checkbox">
                <!-- 单选框 -->
                <AppCheckbox :model-value="item.selected" @check-change="(selected) => cartStore.singleCheck(item.skuId, selected)" />
              </td>
              <td class="t-goods">
                <div class="goods">
                  <RouterLink :to="`/goods/${item.id}`">
                    <img v-lazy-img="item.picture" alt="" />
                  </RouterLink>
                  <div>
                    <el-tooltip :content="item.name" placement="top-end">
                      <p class="name ellipsis">{{ item.name }}</p>
                    </el-tooltip>
                    <div class="cart-sku">
                      <div class="attr" v-for="attr in item.attrsText.split(' ').filter(attr => attr.length)" :key="attr">
                        <p class="ellipsis" >{{ attr }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ item.nowPrice }}</p>
                <p v-if="item.price - item.nowPrice > 0">
                  比加入购物车时降价 <span class="red">&yen;{{ item.price - item.nowPrice }}</span>
                </p>
              </td>
              <td class="tc">
                <el-input-number v-model="item.count" :min="1" :max="item.stock" @change="cartStore.countChange(item.skuId, item.count)"/>
              </td>
              <td class="tc">
                <p class="f16 red">&yen;{{ Math.round(item.nowPrice*100)*item.count/100 }}</p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p>
                  <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消" @confirm="cartStore.deleteFromCart(item.skuId)">
                    <template #reference>
                      <a href="javascript:;">删除</a>
                    </template>
                  </el-popconfirm>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <AppCheckbox :model-value="cartStore.isAllSelected" @check-change="(selected) => cartStore.allCheck(selected)">
            全选
          </AppCheckbox>
          <el-popconfirm title="确认删除选中的商品吗?" confirm-button-text="确认" cancel-button-text="取消" @confirm="cartStore.batchDeleteFromCart()">
            <template #reference>
              <a href="javascript:;">删除选中的商品</a>
            </template>
          </el-popconfirm>
          <a href="javascript:;">移入收藏夹</a>
          <!-- <a @click="batchDeleteCart(true)" href="javascript:;">清空失效商品</a> -->
        </div>
        <div class="total">
          共 {{ cartStore.validTotalCount }} 件商品，已选择 {{ cartStore.selectedTotalCount }} 件，商品合计：
          <span class="red">¥{{ cartStore.selectedTotalPrice }}</span>
          <el-button @click="checkout" type="primary">下单结算</el-button>
        </div>
      </div>
      <GoodsRelevant />
    </div>
  </div>
</template>



<style scoped lang="scss">
.cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,td{
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.tc {
  text-align: center;
}
.cart-none {
  text-align: center;
  padding: 150px 0;
  background: #fff;
  img {
    width: 180px;
  }
  p {
    color: #999999;
    padding: 20px 0;
  }
}
.red {
  color: $priceColor;
}
.green {
  color: $xtxColor
}
.f16 {
  font-size: 16px;
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .app-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
</style>