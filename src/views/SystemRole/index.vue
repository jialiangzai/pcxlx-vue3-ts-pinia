<script setup lang="ts">
import { captchaImg, roleDelete } from '@/utils/api/role.ts'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, onMounted, reactive } from 'vue'
import RoleEditorDialog from './RoleEditorDialog.vue'
interface iData {
  id: String
  roleName: String
  rolePerm: String
  unitId: String
  dataPrivileges: Number
  enabled: String
  createBy: null
  createTime: Number
  updateBy: null
  updateTime: null
  descript: null
}
let multipleSelection = ref<iData[]>([])
let total = ref('')
let current = ref(1)
let size = ref(5)
let tableData = ref([])
let editorDialog = reactive<{
  show: Boolean
  id: String
}>({
  show: false,
  id: '',
})
const onEditorBoxChange = (row: iData) => {
  // 弹层数据
  Object.assign(editorDialog, {
    show: true,
    id: row?.id,
  })
}
const deleteALl = () => {
  return Promise.all(
    multipleSelection.value.map(({ id }) => {
      roleDelete(id)
    })
  ).then(() => {
    getRoleList(current.value)
  })
}
const handleSelectionChange = (val: iData[]) => {
  multipleSelection.value = val
}

const handleDelete = (index: Number, row: iData) => {
  ElMessageBox.confirm('', '确定删除吗？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    let res = await roleDelete(row.id)
    if (res.code == '200') {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getRoleList(current.value)
    } else {
      ElMessage(res.msg)
    }
  })
}
const getRoleList = async (current) => {
  let { data } = await captchaImg({
    current,
    size: size.value,
  })
  total.value = data.total
  tableData.value = data.records
}
onMounted(() => {
  getRoleList(current.value)
})
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
      <el-table-column type="selection" width="55" />
      <el-table-column
        prop="roleName"
        label="角色名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="rolePerm"
        label="权限字符"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="enabled"
        label="是否启用"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
      ></el-table-column>
      <el-table-column align="center">
        <template #default="scope">
          <el-button size="small" @click="onEditorBoxChange(scope.row)"
            >修改</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            v-auth="'system:role:delete'"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹层 -->
    <RoleEditorDialog
      v-if="editorDialog.show"
      v-model:show="editorDialog.show"
      :id="editorDialog.id"
      @change="getRoleList"
    ></RoleEditorDialog>
  </div>
</template>

<style lang="scss" scoped></style>
