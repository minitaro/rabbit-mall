<script setup>
defineProps({
  goods: {
    type: Object,
    default: () => ({
      salesCount: 250,
      commentCount: 450,
      collectCount: 650,
      brand: {
        name: '自有品牌'
      }
    })
  }
})
</script>



<template>
  <ul class="goods-sales">
    <li>
      <p>销量人气</p>
      <p>{{ goods.salesCount }}</p>
      <p><i class="iconfont icon-task-filling"></i>销量人气</p>
    </li>
    <li>
      <p>商品评价</p>
      <p>{{ goods.commentCount }}</p>
      <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
    </li>
    <li>
      <p>收藏人气</p>
      <p>{{ goods.collectCount }}</p>
      <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
    </li>
    <li>
      <p>品牌信息</p>
      <p>{{ goods.brand.name }}</p>
      <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
    </li>
  </ul>
</template>



<style scoped lang="scss">
.goods-sales {
  display: flex;
  width: 400px;
  align-items: center;
  text-align: center;
  height: 140px;
  li {
    flex: 1;
    position: relative;
    ~ li::after {
      position: absolute;
      top: 10px;
      left: 0;
      height: 60px;
      border-left: 1px solid #e4e4e4;
      content: "";
    }
    p {
      &:first-child {
        color: #999;
      }
      &:nth-child(2) {
        color: $priceColor;
        margin-top: 10px;
      }
      &:last-child {
        color: #666;
        margin-top: 10px;
        i {
          color: $xtxColor;
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: $xtxColor;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
