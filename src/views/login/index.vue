<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/schema.js'
import LoginHeader from './components/LoginHeader.vue'
import LoginFooter from './components/LoginFooter.vue'

const route = useRoute()
const router = useRouter()
// 用户信息仓库
const userStore = useUserStore() 
// 选择的登录方式
const activeTab = ref('account')
// 登录表单 
const form = ref({               
  account: 'demo',
  password: 'hm#qd@23!',
  agree: true
})
// 登录表单DOM
const formRef = ref(null)       

// 用户账号密码登录
const login = async () => {
  const valid = await formRef.value.validate()
  if (!valid) return
  const { account, password } = form.value
  await userStore.userAccountLogin({ account, password })
  ElMessage({ type: 'success', message: '登录成功' })
  router.push(route.query.redirectUrl || '/')
}
</script>



<template>
  <div>
    <LoginHeader />
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a @click="activeTab='account'" :class="{ active: activeTab === 'account' }" href="javascript:;">账户登录</a>
          <a @click="activeTab='qrcode'" :class="{ active: activeTab === 'qrcode' }" href="javascript:;">扫码登录</a>
        </nav>
        <div class="account-box" v-if="activeTab === 'account'">
          <Form ref="formRef" class="form" :validation-schema="schema" v-slot="{ errors }" autocomplete="off">
            <!-- 账号 -->
            <div class="form-item">
              <div class="input">
                <i class="iconfont icon-user"></i>
                <Field :class="{ error: errors.account }" v-model="form.account" name="account" type="text" placeholder="请输入账号" />
              </div>
              <div class="error" v-if="errors.account">
                <i class="iconfont icon-warning" />{{ errors.account }}
              </div>
            </div>
            <!-- 密码 -->
            <div class="form-item">
              <div class="input">
                <i class="iconfont icon-lock"></i>
                <Field :class="{ error: errors.password }" v-model="form.password" name="password" type="password" placeholder="请输入密码" />
              </div>
              <div class="error" v-if="errors.password">
                <i class="iconfont icon-warning" />{{ errors.password }}
              </div>
            </div>
            <!-- 协议 -->
            <div class="form-item">
              <div class="agree">
                <Field as="AppCheckbox" name="agree" v-model="form.agree" :class="{ error: errors.agree }"/>
                <span>我已同意</span>
                <a href="javascript:;">《隐私条款》</a>
                <span>和</span>
                <a href="javascript:;">《服务条款》</a>
              </div>
              <div class="error" v-if="errors.agree">
                <i class="iconfont icon-warning" />{{ errors.agree }}
              </div>
            </div>
            <a @click="login" href="javascript:;" class="btn">登录</a>
          </Form>
          <div class="action">
            <div class="url">
              <a href="javascript:;">忘记密码</a>
              <a href="javascript:;">免费注册</a>
            </div>
          </div>
        </div>
        <div class="qrcode-box" v-else-if="activeTab === 'qrcode'">
          <img src="@/assets/images/qrcode.jpg" alt="">
          <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
        </div>
      </div>
    </section>
    <LoginFooter />
  </div>
</template>



<style scoped lang="scss">
.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    nav {
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
        &.active{
          color: $xtxColor;
          font-weight: bold;
        }
      }    
    }
    .account-box {
      .form {
        padding: 0 20px 20px 20px;
        &-item {
          margin-bottom: 28px;
          .input {
            position: relative;
            height: 36px;
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
              padding-left: 44px;
              border: 1px solid #cfcdcd;
              height: 36px;
              line-height: 36px;
              width: 100%;
              &.error {
                border-color: $priceColor;
              }
              &.active,&:focus {
                border-color: $xtxColor;
              }
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
      .action {
        padding: 20px 20px;
        .url {
          display: flex;
          justify-content: space-between;
          float: right;
          display: flex;
          a {
            color: #999;
            margin-left: 10px;
          }
        }
      }
    }
    .qrcode-box {
      text-align: center;
      padding-top: 20px;
      p {
        margin-top: 20px;
        a {
          color: $xtxColor;
          font-size: 16px;
        }
      }
    }
  }
}

</style>