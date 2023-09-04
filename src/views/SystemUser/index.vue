<script setup lang="ts">
import { rolePage, deleteUser } from '@/utils/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, onMounted, reactive } from 'vue'
interface Irecords {
  id: String
  username: String
  realName: String
  userType: Number
  email: String
  phone: String
  gender: Number
  avatar: String
  enabled: Number
  delFlag: Number
  loginIp: String
  loginDate: Number
  createBy: null
  createTime: Number
  updateBy: String
  updateTime: Number
  remark: null
}
let paramsList = ref<{
  current: Number
  size: Number
}>({
  current: 1,
  size: 5,
})
let total = ref('')
let tableData = ref<Irecords[]>()
const multipleSelection = ref<Irecords[]>([])
onMounted(() => {
  getRoleList()
})
const onEditorBoxChange = (row?: Irecords) => {}

const deleteALl = () => {
  return Promise.all(multipleSelection.value.map((m) => deleteUser(m.id))).then(
    () => {
      getRoleList()
    }
  )
}

const handleSelectionChange = (val: Irecords[]) => {
  multipleSelection.value = val
}
const handleDelete = (row: Irecords) => {
  ElMessageBox.confirm('', '确定删除吗?', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    let res = await deleteUser(row.id)
    console.log('res', res)
    if (res.code == '200') {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getRoleList()
    }
  })
}
const getRoleList = async () => {
  let { data } = await rolePage(paramsList.value)
  total.value = data.total
  tableData.value = data.records
}
</script>

<template>
  <div class="role-page">
    <el-button type="primary" @click="onEditorBoxChange">新增</el-button>
    <el-button type="danger" @click="deleteALl">删除</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      \ <el-table-column type="selection" width="35" />
      <el-table-column
        prop="username"
        label="用户姓名"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="realName"
        label="真实姓名"
        align="center"
      ></el-table-column>
      <el-table-column prop="userType" label="用户类型" align="center">
        <template #default="scope">
          {{ scope.row.userType === 0 ? '普通用户' : '超级管理员' }}
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别" align="center">
        <template #default="scope">
          {{ scope.row.gender === 1 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column prop="enabled" label="账号状态" align="center">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.enabled === 1">启用</el-tag>
          <el-tag type="success" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template #default="scope">
          <el-button size="small" @click="onEditorBoxChange(scope.row)"
            >修改</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
            v-auth="'system:user:delete'"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped></style>
