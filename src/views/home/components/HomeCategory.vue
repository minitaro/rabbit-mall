<script setup>
import { useCategoryStore } from '@/stores/category.js';
const categoryStore = useCategoryStore()
</script>



<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="top in categoryStore.categoryList" :key="top.id">
        <RouterLink :to="`/category/${top.id}`">{{ top.name }}</RouterLink>
        <template v-if="top.children">
          <RouterLink v-for="sub in top.children.slice(0,2)" 
                    :key="sub.id" 
                    :to="`/category/sub/${sub.id}`"
                    >
                  {{ sub.name }}
          </RouterLink>
        </template>
        <template v-else>
          <AppSkeleton v-for="i in 2" :key="i" 
                       class="skeleton-item" 
                       height="18px" 
                       width="50px" 
                       bgColor="rgba(255,255,255,0.2)" 
                       animated />
        </template>
        <!-- 分类弹层 -->
        <div class="layer">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="item in top.goods" :key="item.id">
              <RouterLink :to="`/goods/${item.id}`">
                <img v-lazy-img="item.picture" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">{{ item.name }}</p>
                  <p class="desc ellipsis">{{ item.desc }}</p>
                  <p class="price"><i>¥</i>{{ item.price }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;
      &:hover {
        background: $xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }
      .layer {
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 1.0);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;
        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;
          small {
            font-size: 16px;
            color: #666;
          }
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;
            &:nth-child(3n) {
              margin-right: 0;
            }
            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;
              &:hover {
                background: #e3f9f4;
              }
              img {
                width: 95px;
                height: 95px;
              }
              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;
                .name {
                  font-size: 16px;
                  color: #666;
                }
                .desc {
                  color: #999;
                }
                .price {
                  font-size: 22px;
                  color: $priceColor;
                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
.skeleton-item {
  margin-right: 5px;
  &:nth-child(5n) {
    margin-right: 0;
  }
}
</style>