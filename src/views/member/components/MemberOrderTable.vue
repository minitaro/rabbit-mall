<script setup>
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { findOrderListAPI, cancelOrderAPI, deleteOrderAPI } from '@/api/order.js'
import { ORDER_STATUS, CANCEL_REASON } from '@/constants/order.js'
import MemberOrderItem from './MemberOrderItem.vue'


// ------------------------------ 查询订单 ------------------------------
// 订单列表 
const orderList = ref([])
// 订单总数
const total = ref(0)
// 是否处于加载中
const loading = ref(false)
const getOrderList = () => {
  loading.value = true
  document.documentElement.scrollTop = 0
  findOrderListAPI(params).then(data => {
    orderList.value = data.result.items
    total.value = data.result.counts
    loading.value = false
  })
}

// ------------------------------ 查询参数 ------------------------------
// 订单状态选项
const activeName = ref(0)
// 订单查询条件
const params = reactive({
  page: 1,
  pageSize: 5,
  orderState: 0
})
// 订单状态切换
const tabChange = (state) => {
  params.page = 1
  params.orderState = state
}
// 页码切换
const pageSelect = (newPage) => {
  params.page = newPage
}
watch(params, () => getOrderList(), { immediate: true })

// ------------------------------ 取消订单 ------------------------------
// 取消订单对话框
const dialogVisible = ref(false)
// 取消订单原因
const cancelReason = ref('')
// 待取消订单
const cancelOrder = ref(null)
const handlerCancel = (order) => {
  dialogVisible.value = true
  cancelOrder.value = order
  cancelReason.value = ''
}
// 放弃取消订单
const cancelQuit = () => {
  dialogVisible.value = false
  cancelOrder.value = null
}
// 提交取消订单
const cancelSubmit = () => {
  if (!cancelReason.value) return ElMessage.warning('亲，请选择订单取消原因')
  cancelOrderAPI({
    orderId: cancelOrder.value.id,
    cancelReason: cancelReason.value
  }).then(() => {
    ElMessage.success('取消订单成功')
    dialogVisible.value = false
    getOrderList()
  })
}

// ------------------------------ 删除订单 ------------------------------
// 删除订单
const handlerDelete = (order) => {
  deleteOrderAPI(order.id).then(() => {
    ElMessage.success('删除订单成功')
    getOrderList()
  }) 
}
</script>



<template>
  <div class="member-order">
    <el-tabs v-model="activeName" type="border-card" class="demo-tabs" @tab-change="tabChange(activeName)">
      <el-tab-pane v-for="item in ORDER_STATUS" 
                   :key="item.value" 
                   :name="item.value" 
                   :label="item.desc">
        <div class="order-list">
          <div v-if="loading" class="loading"></div>
          <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
          <MemberOrderItem v-for="order in orderList" :key="order.id" :order="order"
                          @on-cancel="handlerCancel"
                          @on-delete="handlerDelete"
                          @on-confirm="handlerConfirm"
                          @on-logistics="handlerLogistics"/>
        </div>
      </el-tab-pane>
      <el-pagination v-if="total" 
                   class="pagination" 
                   background layout="prev, pager, next" 
                   @current-change="pageSelect" 
                   :page-size="params.pageSize" 
                   :current-page="params.page" 
                   :total="total"/>
    </el-tabs>
    <!-- 取消订单对话框 -->
    <el-dialog v-model="dialogVisible" title="取消订单">
      <div class="cancel-info">
        <p class="tip">请选择取消订单的原因（必选）：</p>
        <div class="btn">
          <a v-for="item in CANCEL_REASON" :key="item"
            @click="cancelReason = item" href="javascript:;"
            :class="{ active: cancelReason === item }"
          >
            {{ item }}
          </a>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelQuit">再想想</el-button>
          <el-button type="primary" @click="cancelSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>



<style scoped lang="scss">
.member-order {
  height: 100%;
  background: #fff;
}
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255,255,255,.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
.pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    a {
      width: 200px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n){
        margin-right: 0;
      }
      &:hover,&.active {
        background-color: #e3f9f4;
        border-color: $xtxColor;
      }
    }
  }
}
</style>