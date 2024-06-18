<script setup>
import { inject, reactive, ref, watch } from 'vue'
import { findCommentInfoByGoodsAPI, findCommentListByGoodsAPI } from '@/api/goods.js'
import { useLazyLoad } from '@/hooks/useLazyLoad.js'

const goods = inject('goods')
const { result, target } = useLazyLoad(() => findCommentInfoByGoodsAPI(goods.value.id).then(data => {
    data.result.tags.unshift({ title: '有图', tagCount: data.result.hasPictureCount, type: 'img'})
    data.result.tags.unshift({ title: '全部评价', tagCount: data.result.evaluateCount, type: 'all' })
    return data
}))
// 评价信息
const commentInfo = ref(result)

// 评价筛选参数
const params = reactive({
  page: 1,
  pageSize: 10,
  hasPicture: null,
  tag: null,
  sortField: null // 排序方式：praiseCount 热度  createTime 最新
})
// 评价筛选标签
const activeTagIndex = ref(0)
// 标签切换
const tagSelect = (i) => {
  if (activeTagIndex.value === i) return
  activeTagIndex.value = i
  const tag = commentInfo.value.tags[i]
  // 情况1：全部评价
  // 情况2：有图
  // 情况3：正常tag
  if (tag.type === 'all') {
    params.hasPicture = null
    params.tag = null
  } else if (tag.type === 'img') {
    params.hasPicture = true
    params.tag = null
  } else {
    params.hasPicture = null
    params.tag = tag.title
  }
  params.page = 1
}
 // 排序字段切换
const sortSelect = (sortField) => {
  params.sortField = sortField
  params.page = 1
}
// 页码切换
const pageSelect = (newPage) => params.page = newPage

// 评价列表
const commentList = ref([])
// 评价条数
const total = ref(0)
// 筛选条件改变，重新查询评价
watch(params, () => 
  findCommentListByGoodsAPI(goods.value.id, params).then(data => {
    commentList.value = data.result.items
    total.value = data.result.counts
  }), { immediate: true })

// 评价预览放大图片
const imageView = ref(null)
//  评价数据格式转换
const specsFormat = (specs) => specs.reduce((p, c) => `${p} ${c.name}: ${c.nameValue}`, '').trim()
const nicknameFormat = (nickname) => nickname.substr(0, 1) + '****' + nickname.substr(-1)

</script>



<template>
  <div class="goods-comment" ref="target">
    <!-- 评价标题 -->
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p><span>{{ commentInfo.salesCount }}</span><span>人购买</span></p>
        <p><span>{{ commentInfo.praisePercent }}</span><span>好评率</span></p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a v-for="(tag, i) in commentInfo.tags" :key="tag.title"
             :class="{ active: activeTagIndex === i }"
             @click="tagSelect(i)" href="javascript:;"
             >{{ tag.title }}({{ tag.tagCount }})</a>
        </div>
      </div>
    </div>
    <!-- 评价排序 -->
    <div class="sort" v-if="commentInfo">
      <span>排序：</span>
      <a @click="sortSelect(null)" :class="{ active: params.sortField === null }" href="javascript:;">默认</a>
      <a @click="sortSelect('createTime')" :class="{ active: params.sortField === 'createTime' }" href="javascript:;">最新</a>
      <a @click="sortSelect('praiseCount')" :class="{ active: params.sortField === 'praiseCount' }" href="javascript:;">最热</a>
    </div>
    <!-- 评价列表 -->
    <div class="comment-list" v-if="commentList">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img v-lazy-img="item.member.avatar" alt="">
          <span>{{ nicknameFormat(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i+'s'" class="iconfont icon-wjx01"></i>
            <i v-for="i in 5-item.score" :key="i+'k'" class="iconfont icon-wjx02"></i>
            <span class="attr">{{ specsFormat(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">{{ item.content }}</div>
          <!-- 评论图片 -->
          <div class="goods-comment-image" v-if="item.pictures.length">
            <div class="image-list">
              <a v-for="url in item.pictures" :key="url" 
                 :class="{ active: imageView === url }" 
                 @click="imageView = url" href="javascript:;">
                <img v-lazy-img="url" alt="">
              </a>
            </div>
            <div class="preview" v-if="imageView">
              <img v-lazy-img="imageView" alt="">
              <i @click="imageView = null" class="iconfont icon-close-new"></i>
            </div>
          </div>
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination v-if="total" 
                   class="pagination" 
                   background layout="prev, pager, next" 
                   @current-change="pageSelect" 
                   :page-size="params.pageSize" 
                   :current-page="params.page" 
                   :total="total"/>
  </div>
</template>



<style scoped lang="scss">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: $priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: $xtxColor;
            background: lighten($xtxColor, 50%);
            color: $xtxColor;
          }
          &.active {
            border-color: $xtxColor;
            background: $xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: $xtxColor;
      }
    }
  }
  .comment-list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .goods-comment-image {
        .image-list {
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;
          a {
            width: 120px;
            height: 120px;
            border:1px solid #e4e4e4;
            margin-right: 20px;
            margin-bottom: 10px;
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
            &.active {
              border: 2px solid $xtxColor;
            }
          }
        }
        .preview {
          width: 480px;
          height: 480px;
          border: 1px solid #e4e4e4;
          background: #f8f8f8;
          margin-bottom: 20px;
          position: relative;
          img {
              width: 100%;
              height: 100%;
              object-fit: contain;
          }
          i {
            position: absolute;
            right: 0;
            top: 0;
            width: 30px;
            height: 30px;
            background: rgba(0,0,0,0.2);
            color: #fff;
            text-align: center;
            line-height: 30px;
          }
        }
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    padding: 30px;
  }
}
</style>