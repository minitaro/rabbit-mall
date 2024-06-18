<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.js'

const router = useRouter()
const userStore = useUserStore()
// 用户登出
const logout = () => {
  userStore.userLogout()
  router.push('/login')
} 
</script>

<template>
  <nav class="layout-topnav">
    <div class="container">
      <ul>
        <template v-if="userStore.userInfo.token">
          <li>
            <RouterLink to="/member">
              <i class="iconfont icon-user"></i>{{ userStore.userInfo.account }}
            </RouterLink>
          </li>
          <li>
            <el-popconfirm @confirm="logout" 
                           title="确认退出吗?" 
                           confirm-button-text="确认" 
                           cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><RouterLink to="/member/order">我的订单</RouterLink></li>
          <li><a href="javascript:;">会员中心</a></li>
        </template>
        <template v-else>
          <li><RouterLink to="/login">请先登录</RouterLink></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
          <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.layout-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: $xtxColor;
        }
      }
      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>