<script setup>
defineProps({
  subCategoryList: {
    type: Array,
    default: () => []
  }
})
</script> 



<template>
  <div class="sub-list">
    <h3>全部分类</h3>
      <ul>
        <li v-for="item in subCategoryList" :key="item.id">
          <RouterLink :to="`/category/sub/${item.id}`">
            <img v-lazy-img="item.picture" />
            <p>{{ item.name }}</p>
          </RouterLink>
        </li>
      </ul>
  </div>
</template>



<style scoped lang="scss">
.sub-list {
  margin-top: 20px;
  background-color: #fff;
  ul {
    display: flex;
    padding: 0 32px;
    flex-wrap: wrap;
    li {
      width: 168px;
      height: 160px;
      a {
        text-align: center;
        display: block;
        font-size: 16px;
        img {
          width: 100px;
          height: 100px;
        }
        p {
          line-height: 40px;
        }
        &:hover {
          color: $xtxColor;
        }
      }
    }
  }
}
</style>