<template>
  <div>
    <div style="display: flex">
      <el-input
        v-model="name"
        placeholder="请输入用户名"
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
    </div>
    <div style="margin: 10px 0">
      <el-table :data="state.tableData" stripe border>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="isDelete" label="用户状态">
          启用
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template #default="scope">
            <el-button type="primary" @click="handleEdit(scope.row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 10px">
        <el-pagination
          @current-change="load"
          @size-change="load"
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          background
          :page-sizes="[2, 5, 10, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        />
      </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="用户信息" width="40%">
      <el-form
        :model="state.form"
        label-width="80px"
        style="padding: 0 20px"
        status-icon
      >
        <el-form-item prop="username" label="用户名">
          <el-input v-model="state.form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="name" label="姓名">
          <el-input v-model="state.form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="state.form.email" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="address" label="地址">
          <el-input
            type="textarea"
            v-model="state.form.address"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="save"> 保存 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { Search, RefreshLeft, Plus } from "@element-plus/icons-vue";
import { useUserStore } from "../stores/user";
import request from "../utils/request";
import { ElMessage } from "element-plus";

const name = ref();
const address = ref();
const username = ref();
const email = ref();
const pageNum = ref(1);
const pageSize = ref(10);
const total = ref();
const isDelete=ref()
const state = reactive({
  // 表单数据就是数据，数据中每一个元素存储一个对象
  tableData: [],
  form: {},
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
        email: email.value,
        isDelete:isDelete.value
      },
    })
    .then((res) => {
      state.tableData = res.data.records;
      total.value = res.data.total;
    });
};
load();
const reset = () => {
  name.value = "";
  address.value = "";
  load();
};
const dialogFormVisible = ref(false);
const handleEdit = (raw) => {
  dialogFormVisible.value = true;
  state.form = JSON.parse(JSON.stringify(raw));
};
// 保存方法
const save = () => {
  // valid就是校验的结果
  request.request({
      url: "/user",
      method: state.form.id ? "put" : "post",
      data: state.form,
    })
    .then((res) => {
      if (res.code === "200") {
        ElMessage.success("保存成功");
        dialogFormVisible.value = false;
        load(); // 刷新表格数据
      } else {
        ElMessage.error(res.msg);
      }
    });
};
</script>