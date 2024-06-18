<script setup>
import { ElMessage } from 'element-plus'
import { reactive, onMounted, ref, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createOrderAPI, repurchaseOrderAPI, submitOrderAPI } from '@/api/order';
import { addAddressAPI, editAddressAPI, deleteAddressAPI } from '@/api/address';
import { Form, Field } from 'vee-validate'
import schema from '@/utils/schema.js'
import { DELIVERY_TIME_TYPE, PAY_TYPE } from '@/constants/order.js'
import { useCartStore } from '@/stores/cart.js'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const address = ref(null)              // 送货地址

const dialogTableVisible = ref(false)  // 是否显示切换列表
const addressSelected = ref(null)      // 切换列表被选中的地址
// 显示送货地址切换列表
const addressSwitch = () => {
  addressSelected.value = null
  dialogTableVisible.value = true
}
// 提交送货地址切换
const switchSubmit = () => {
  address.value = addressSelected.value
  orderParams.addressId = address.value?.id
  dialogTableVisible.value = false
}
// 删除切换列表中的送货地址
const addressDelete = async (id) => {
  await deleteAddressAPI(id)
  ElMessage.success('删除收货地址成功')
  addressSelected.value = null
  getOrder()
}


const dialogFormVisible = ref(false)   // 是否显示地址编辑表单
const formRef = ref(null)              // 地址编辑表单
const form = reactive({
  receiver: null,
  contact: null,
  provinceCode: null,
  cityCode: null,
  countyCode: null,
  address: null,
  postalCode: null,
  addressTags: null,
  isDefault: 1,
  fullLocation: null
})
// 编辑（修改/添加）收货地址
const addressEdit = (address) => {
  dialogFormVisible.value = true
  if (address.id) Object.keys(address).forEach(key => form[key] = address[key])
  else Object.keys(form).forEach(key => form[key] = key === 'isDefault' ? 1 : null)
}
// 选择送货地址
const addressChange = (address) => {
  form.provinceCode = address.provinceCode
  form.cityCode = address.cityCode
  form.countyCode = address.countyCode
  form.fullLocation = address.fullLocation
}
// 提交地址编辑表单
const editSubmit = async () => {
  const valid = await formRef.value.validate()
  if (!valid) return
  if (form.id) {
    await editAddressAPI(form)
    ElMessage.success('修改收货地址成功')
    dialogFormVisible.value = false
    getOrder()
  } else {
    await addAddressAPI(form)
    ElMessage.success('添加收货地址成功')
    dialogFormVisible.value = false
    getOrder()
  }
}


// 订单
const order = ref(null)
// 订单信息表单
const orderParams = reactive({
  deliveryTimeType: 1,
  payType: 1,
  payChannel: 1,
  buyerMessage: '',
  goods: [],
  addressId: ''
})
// 生成订单
const getOrder = async () => {
  const data = route.query.orderId ? await repurchaseOrderAPI(route.query.orderId) : await createOrderAPI()
  order.value = null
  nextTick(() => {
    order.value = data.result
    address.value = null 
    const addressDefault = order.value.userAddresses.find(item => item.isDefault === 0)
    if (addressDefault) address.value = addressDefault
    else if (order.value.userAddresses.length) address.value = order.value.userAddresses[0]
    orderParams.addressId = address.value?.id
    orderParams.goods = order.value.goods.map(({ skuId, count }) => ({ skuId, count }))
  })
  
}
onMounted(() => getOrder())
// 提交订单信息表单
const submitOrder = () => {
  if (!orderParams.addressId) return ElMessage.warning('亲，请选择收货地址')
  submitOrderAPI(orderParams).then(data => {
    ElMessage.success('提交订单成功')
    router.push(`/pay?orderId=${data.result.id}`)
    cartStore.findCartList()
  })
}
</script>



<template>
  <div class="checkout-page">
    <div class="container">
      <AppBreadcrumb>
        <AppBreadcrumbItem to="/">首页</AppBreadcrumbItem>
        <AppBreadcrumbItem to="/cart">购物车</AppBreadcrumbItem>
        <AppBreadcrumbItem >填写订单</AppBreadcrumbItem>
      </AppBreadcrumb>
      <div class="wrapper" v-if="order">
        <div class="content">
          <div class="checkout-title">
            <span>填写并核对订单信息</span>
          </div>
          <div class="checkout-steps">
            <div class="step-title"><h3>收货人信息</h3></div>
            <div class="step-body">
              <div class="checkout-address">
                <div class="text">
                  <div v-if="!address" class="none">您需要先添加收货地址才可提交订单。</div>
                  <ul v-else>
                    <li><span>收<i/>货<i/>人：</span>{{ address.receiver }}</li>
                    <li><span>联系方式：</span>{{ address.contact.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2') }}</li>
                    <li><span>收货地址：</span>{{ address.fullLocation.replace(/ /g,'') + address.address }}</li>
                  </ul>
                </div>
                <div class="address-btn">
                  <el-button type="primary" @click="addressEdit(address)">修改地址</el-button>
                  <el-button type="primary" @click="addressSwitch()">切换地址</el-button>
                  <el-button type="primary" @click="addressEdit({})">添加地址</el-button>
                </div>
                <div class="form-dialog">
                  <el-dialog v-model="dialogFormVisible" :title="`${form.id?'修改':'添加'}收货地址`">
                    <Form ref="formRef" class="form" :validation-schema="schema" v-slot="{ errors }" autocomplete="off">
                      <!-- 收货人 -->
                      <div class="form-item">
                        <div class="input">
                          <div class="label">收货人：</div>
                          <div class="field">
                            <input v-model="form.receiver" type="text" placeholder="请输入收货人姓名" />
                          </div>
                        </div>
                      </div>
                      <!-- 手机 -->
                      <div class="form-item">
                        <div class="input">
                          <div class="label">手机号：</div>
                          <div class="field">
                            <Field :class="{ error: errors.mobile }" v-model="form.contact" name="mobile" type="text" placeholder="请输入手机号" />
                          </div>
                        </div>
                        <div class="error" v-if="errors.mobile">
                          <i class="iconfont icon-warning" />{{ errors.mobile }}
                        </div>
                      </div>
                      <!-- 地区 -->
                      <div class="form-item">
                        <div class="input">
                          <div class="label">地区：</div>
                          <div class="field">
                            <AppArea :fullLocation="form.fullLocation" @address-change="addressChange" placeholder="请选择所在地区"/>
                          </div>
                        </div> 
                      </div>
                      <!-- 详细地址 -->
                      <div class="form-item">
                        <div class="input">
                          <div class="label">详细地址：</div>
                          <div class="field">
                            <input v-model="form.address" type="text" placeholder="请输入详细地址" />
                          </div>
                        </div>
                      </div> 
                    </Form>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="editSubmit">
                          确定
                        </el-button>
                      </span>
                    </template>
                  </el-dialog>
                </div>
                <div class="table-dialog">
                  <el-dialog v-model="dialogTableVisible" title="切换收货地址">
                    <div v-for="item in order.userAddresses" :key="item.id"
                         class="text item" :class="{ active: addressSelected && addressSelected.id === item.id }"
                         @click="addressSelected = item"
                    >
                      <ul>
                        <li><span>收<i/>货<i/>人：</span>{{ item.receiver }}</li>
                        <li><span>联系方式：</span>{{ item.contact.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2') }}</li>
                        <li><span>收货地址：</span>{{ item.fullLocation.replace(/ /g,'') + item.address }}</li>
                      </ul>
                      <el-popconfirm title="确认删除吗?" 
                                     confirm-button-text="确认" 
                                     cancel-button-text="取消"     
                                     @confirm="addressDelete(item.id)">
                        <template #reference>
                          <i class="iconfont icon-close-new"></i>
                        </template>
                      </el-popconfirm>
                    </div>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="dialogTableVisible = false">取消</el-button>
                        <el-button type="primary" @click="switchSubmit">
                          确定
                        </el-button>
                      </span>
                    </template>
                  </el-dialog>
                </div>
              </div>
            </div>
            <div class="hr"></div>
            <!-- 商品信息 -->
            <div class="step-title"><h3>商品信息</h3></div>
            <div class="step-body">
              <table class="goods">
                <thead>
                  <tr>
                    <th width="520">商品信息</th>
                    <th width="170">单价</th>
                    <th width="170">数量</th>
                    <th width="170">小计</th>
                    <th width="170">实付</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order.goods" :key="item.skuId">
                    <td>
                      <RouterLink :to="`/goods/${item.id}`" class="info">
                        <img v-lazy-img="item.picture" alt="">
                        <div class="right">
                          <p>{{ item.name }}</p>
                          <p>{{ item.attrsText }}</p>
                        </div>
                      </RouterLink>
                    </td>
                    <td>&yen;{{ item.price }}</td>
                    <td>{{ item.count }}</td>
                    <td>&yen;{{ item.totalPrice }}</td>
                    <td>&yen;{{ item.totalPayPrice }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="hr"></div>
            <!-- 配送时间 -->
            <div class="step-title"><h3>配送时间</h3></div>
            <div class="step-body">
              <div class="delivery-time">
                <a v-for="type in DELIVERY_TIME_TYPE" :key="type.value" 
                   class="btn" :class="{ active: orderParams.deliveryTimeType === type.value }"
                   @click="orderParams.deliveryTimeType = type.value" href="javascript:;" >
                  <span>{{ type.desc }}</span>
                </a>
              </div>
            </div>
            <div class="hr"></div>
            <!-- 支付方式 -->
            <div class="step-title"><h3>支付方式</h3></div>
            <div class="step-body">
              <div class="pay-type">
                <a v-for="type in PAY_TYPE" :key="type.value" 
                   class="btn" :class="{ active: orderParams.payType === type.value }"
                   @click="orderParams.payType = type.value" href="javascript:;" >
                  <span>{{ type.desc }}</span>
                </a>
              </div>
            </div>
          </div>
          <div class="checkout-summary">
            <div class="summary">
              <dl><dt>商品件数：</dt><dd>{{ order.summary.goodsCount }}件</dd></dl>
              <dl><dt>商品总价：</dt><dd>¥{{ order.summary.totalPrice }}</dd></dl>
              <dl><dt>运<i></i>费：</dt><dd>¥{{ order.summary.postFee }}</dd></dl>
            </div>
          </div>
          <div class="checkout-footer">
            <div class="footer-info">
              <div class="summary">
                <dl><dt>应付总额：</dt><dd class="price">¥{{ order.summary.totalPayPrice }}</dd></dl>
              </div>
              <div class="consignee" v-if="address">
                <span id="sendAddr">寄送至: {{ address.fullLocation.replace(/ /g,'') + address.address }}</span>
                <span id="sendMobile"> 收货人：{{ address.receiver }} {{ address.contact.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2') }}</span>
              </div>
            </div>
            <div class="footer-btn">
              <!-- 提交订单 -->
              <el-button @click="submitOrder" type="primary" size="large">提交订单</el-button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped lang="scss">
.form {
  padding: 0 20px 20px 20px;
  &-item {
    margin-bottom: 20px;
    .input {
      display: flex;
      align-items: center;
      line-height: 28px;
      .label {
        width: 180px;
        padding-right: 10px;
        text-align: right;
        color: #999;
      }
      > i {
        width: 34px;
        height: 34px;
        background: #cfcdcd;
        color: #fff;
        position: absolute;
        left: 1px;
        top: 1px;
        text-align: center;
        line-height: 34px;
        font-size: 18px;
      }
      input {
        padding-left: 5px;
        border: 1px solid #cfcdcd;
        height: 30px;
        width: 100%;
        &.error {
          border-color: $priceColor;
        }
        &.active,&:focus {
          border-color: $xtxColor;
        }
      }
      .app-area {
        vertical-align: middle;
      }
    }
    > .error {
      position: absolute;
      font-size: 12px;
      line-height: 28px;
      color: $priceColor;
      i {
        font-size: 14px;
        margin-right: 2px;
      }
    }
  }
  .agree {
    a {
      color: #069;
    }
  }
  .btn {
    display: block;
    width: 100%;
    height: 40px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    background: $xtxColor;
  }
}
.checkout-page {
  .wrapper {
    background: #fff;
    padding: 0 10px;
    .content {
      width: 1100px;
      margin: 0 auto;
      .checkout-title {
        padding: 10px 0;
        line-height: 42px;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        display: block;
      }
      .checkout-steps {
        background-color: #fff;
        padding: 0 20px;
        border: 1px solid rgb(157, 157, 157);
        .step-title {
          line-height: 40px;
          height: 40px;
          color: #333;
          margin-top: 10px;
          h3 {
            font-size: 14px;
            float: left;
          }
        }
        .step-body {
          margin-bottom: 10px;
          padding: 20px 0;
          .goods {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            .info {
              display: flex;
              text-align: left;
              img {
                width: 70px;
                height: 70px;
                margin-right: 20px;
              }
              .right {
                line-height: 24px;
                p {
                  &:last-child {
                    color: #999;
                  }
                }
              }
            }
            tr {
              th {
                background: #f5f5f5;
                font-weight: normal;
              }
              td,th {
                text-align: center;
                padding: 20px;
                border-bottom: 1px solid #f5f5f5;
                &:first-child {
                  border-left: 1px solid #f5f5f5;
                }
                &:last-child {
                  border-right: 1px solid #f5f5f5;
                }
              }
            }
          }
           
        }
        .hr {
          border-bottom: 1px solid #e6e6e6;
          height: 0;
          margin-bottom: 10px;
        }
      }
    }
  }
}
.btn {
  cursor: pointer;
  margin-right: 9px;
  padding: 5px 24px;
  border: 1px solid #ddd;
  text-align: center;
  color: #666666;
  display: inline-block;
  &.active,&:hover {
    border-color: $xtxColor;
  }
}
.summary {
  padding: 5px 20px;
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 30px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 120px;
      text-align: right;
      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.checkout-footer {
  .footer-info {
    background-color: #e3e2e2;
    text-align: right;
    .consignee {
      padding: 0 20px 10px 20px;
      line-height: 25px;
      color: #999;
      #sendAddr {
        margin-right: 20px;
      }
    }
  }
  .footer-btn {
    text-align: right;
    padding: 20px;
  }
}

.checkout-address {
  display: flex;
  align-items: flex-end;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 0 10px;
      li {
        line-height: 30px;
        word-break: break-all;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .table-dialog {
    .text {
      flex: 1;
      min-height: 90px;
      display: flex;
      align-items: center;
      &.item {
        display: flex;
        align-items: flex-start;
        border: 1px solid #f5f5f5;
        margin-bottom: 10px;
        cursor: pointer;
        i {
          opacity: 0;
          color: #666;
          transition: all .5s;
        }
        &.active,&:hover {
          border-color: $xtxColor;
          background: lighten($xtxColor,50%);
          i {
            opacity: 1;
            cursor: pointer;
          }
        }

      }
    }
  }
}
</style>