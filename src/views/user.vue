<template>
  <div>
    <div style="display: flex">
      <el-input
        v-model="name"
        placeholder="请输入名称"
        class="w300"
        style="width: 300px"
      />
      <el-input
        v-model="address"
        placeholder="请输入地址"
        class="w300 ml5"
        style="width: 300px; margin: 0 10px 0 10px"
      />
      <el-button type="primary" class="ml5" @click="load">
        <el-icon style="vertical-align: middle">
          <Search />
        </el-icon>
        <span style="vertical-align: middle"> 搜索 </span>
      </el-button>
      <el-button type="warning" class="ml5" @click="reset">
        <el-icon style="vertical-align: middle">
          <RefreshLeft />
        </el-icon>
        <span style="vertical-align: middle"> 重置 </span>
      </el-button>
      <el-button type="warning" class="ml5" @click="reset">
        <el-icon style="vertical-align: middle">
          <Plus />
        </el-icon>
        <span style="vertical-align: middle"> 新增 </span>
      </el-button>
    </div>
    <div style="margin: 10px 0">
      <el-table
        :data="state.tableData"
        stripe
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="" label="头像" width="70px">
          <el-avatar
                :src="avatar"
                :size="40"
                style="margin-top: 8px"
              />
        </el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="操作" width="200px">
          <el-button type="primary">
            编辑
          </el-button>
          <el-button type="primary">
            删除
          </el-button>
          
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        style="margin: 10px"
      />
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { Search, RefreshLeft, Plus } from "@element-plus/icons-vue";
import { useUserStore } from "../stores/user";
import request from "../utils/request";
const name = ref();
const address = ref();
const username = ref();
const email = ref();
const pageNum = ref(1);
const pageSize = ref(10);
const avatar=ref()
const total=ref()
const state = reactive({
  // 表单数据就是数据，数据中每一个元素存储一个对象
  tableData: [],
});
const load = () => {
  request
    .get("/user/page", {
      params: {
        name: name.value,
        username: username.value,
        address: address.value,
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        email:email.value
      },
    })
    .then((res) => {
      state.tableData = res.data.records;
      total.value=res.data.total
    });
};
load();
</script>