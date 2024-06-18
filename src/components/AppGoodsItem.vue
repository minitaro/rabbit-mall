<script setup>
defineProps({
  goods: {
    type: Object,
    default: () => ({})
  },
  isLink: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <RouterLink v-if="isLink" :to="`/goods/${goods.id}`" class="goods-item">
    <img v-lazy-img="goods.picture" alt="" />
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
  </RouterLink>
  <a v-else href="javascript:;" class='goods-item'>
    <img v-lazy-img="goods.picture" alt="">
    <p class="name ellipsis">{{goods.name}}</p>
    <p class="desc ellipsis">{{goods.desc}}</p>
    <p class="price">&yen;{{goods.price}}</p>
  </a>
</template>

<style lang="scss" scoped>
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  transition: all .5s;
  @include hoverShadow;
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: $priceColor;
    font-size: 20px;
  }
}
</style>