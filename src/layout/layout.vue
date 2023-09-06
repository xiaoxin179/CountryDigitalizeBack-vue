<script setup>
import { RouterView } from "vue-router";
import router from "@/router";
import { ElMessage } from "element-plus";
import { useUserStore } from "../stores/user";
import { User, Lock,Setting } from '@element-plus/icons-vue'
const store = useUserStore();
// 退出登录
const logout = () => {
  localStorage.removeItem("back_user");
  window.location.reload();
};

</script>

<template>
  <div>
    <div
      style="
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ccc;
        background-color: aliceblue;
      "
    >
      <div style="display: flex">
        <div
          style="
            width: 300px;
            color: dodgerblue;
            font-weight: bold;
            text-align: center;
            font-size: 20px;
          "
        >
          乡村振兴数字化综合服务平台
        </div>
        <div style="flex: 1; display: flex">
          <div style="flex: 1"></div>
          <div style="width: 200px; text-align: right; padding-right: 20px">
            <el-dropdown>
              <el-avatar
                :src="store.back_user.avatar"
                :size="40"
                style="margin-top: 8px"
              />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    ><div @click="router.push('/person')">
                      个人信息
                    </div></el-dropdown-item
                  >
                  <el-dropdown-item
                    ><div @click="router.push('/password')">
                      修改密码
                    </div></el-dropdown-item
                  >
                  <el-dropdown-item
                    ><div @click="logout">退出登录</div></el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>

    <div style="display: flex">
      <div
        style="
          width: 200px;
          min-height: calc(100vh - 60px);
          border-right: 1px solid #ccc;
        "
      >
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>静态资源管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">文化小镇</el-menu-item>
              <el-menu-item index="1-2">生态闵宁</el-menu-item>
              <el-menu-item index="1-3">组织建设</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><User /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="router.push('/user')">农户管理</el-menu-item>
              <el-menu-item index="2-2" @click="router.push('/user')">管理员管理</el-menu-item>
              <el-menu-item index="2-3">外部用户管理</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </div>

      <div style="flex: 1; padding: 10px">
        <RouterView />
      </div>
    </div>
  </div>
</template>
