<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ElConfigProvider } from "element-plus";
import zhCN from "element-plus/dist/locale/zh-cn.mjs";
const locale =zhCN;
</script>

<template>
  <el-config-provider :locale="locale">
      <router-view></router-view>
  </el-config-provider>
</template>

<style scoped>
</style>
