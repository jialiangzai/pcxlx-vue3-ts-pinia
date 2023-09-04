<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { menuPage, addRole, getRole, updateRole } from '@/utils/api/role'
import { ElTree, ElMessage } from 'element-plus'
import { dictStore } from '@/stores'

let dictStores = dictStore()

interface Isex {
  createBy: String
  createTime: Number
  id: String
  remark: String
  sort: Number
  k: String
  v: String
  typeId: String
  updateBy: String
  updateTime: Number
}
let system_global_status = ref<Isex[]>([])
let emit = defineEmits()
let props = defineProps<{
  id?: string
  show: boolean
}>()
const id = ref(props.id)
const formRef = ref(null)
let form = reactive({
  roleName: '',
  rolePerm: '',
  enabled: 1,
  descript: '',
})

let _show = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})
//控制菜单树
const permission = reactive({
  openAll: false,
  selectAll: false,
  linkage: true,
  treeList: [],
})
const treeRef = ref<InstanceType<typeof ElTree>>()
const onCancel = () => {
  _show.value = false
}
const defaultProps = {
  children: 'children',
  label: 'name',
}
const toggleTreeCollapse = (value) => {
  const nodes = treeRef.value.store.nodesMap
  for (let i in nodes) {
    nodes[i].expanded = value
  }
}
const toggleTreeChecked = (value) => {
  if (value) {
    permission.treeList.map((m) => {
      treeRef.value?.setChecked(m, true, true)
    })
  } else {
    treeRef.value?.setCheckedKeys([])
  }
}
const toggleTreeCheckedFs = (value) => {
  permission.linkage = value
}
const normalizeData = (list) => {
  // parentId 和 id 有联系 parentId为-1是一级列表
  let newArr = []
  let mapObj = {}
  list.forEach((m) => {
    mapObj[m.id] = m
  })
  list.forEach((mn) => {
    if (mn.id === '-1') {
      return newArr.push(mn)
    }
    const parObj = mapObj[mn.parentId]
    if (parObj) {
      parObj.children.push(mn)
    } else {
      newArr.push(mn)
    }
  })
  return newArr
}
const addRolehander = () => {
  let { roleName, rolePerm, enabled, descript } = form
  let params = {
    roleName,
    rolePerm,
    enabled,
    descript,
    permissionIds: treeRef.value!.getCheckedKeys(),
  }
  // 判断一下是否是添加或者编辑
  id.value ? updateRoleHan(params) : addRoleHan(params)
}
const updateRoleHan = async (params) => {
  // 拷贝一份数据
  let data = Object.assign(params, { id: id.value })
  let res = await updateRole(data)
  if (res.code == '200') {
    ElMessage({
      type: 'success',
      message: '修改成功',
    })
    _show.value = false
    emit('change')
  }
}
const addRoleHan = async (params) => {
  let res = await addRole(params)
  if (res.code == '200') {
    ElMessage({
      type: 'success',
      message: '添加成功',
    })
    _show.value = false
    emit('change')
  }
}
onBeforeMount(async () => {
  let systemData = await dictStores.resolveDictItemEnum('system_global_status')
  system_global_status.value = systemData
  let {
    data: { records },
  } = await menuPage({ current: 1, size: 1000 })

  // permission.treeList = records
  // 数据处理tree
  let treeLists = normalizeData(records)
  permission.treeList = treeLists
  if (id.value) {
    let getRoleId = await getRole(id.value)
    let { role, permissions } = getRoleId.data
    //单独修改一下数据类型
    role.enabled = role.enabled.toString()
    //表单value值
    Object.assign(form, role)
    //菜单权限id
    treeRef.value.setCheckedKeys(permissions)
  }
})
</script>

<template>
  <div class="roleEditor-page">
    <el-dialog
      :modelValue="_show"
      width="600px"
      :title="id ? '修改' : '新增'"
      :append-to-body="true"
      :destroy-on-close="true"
    >
      <el-form v-model="form" ref="formRef">
        <el-form-item label="角色名称" prop="roleName">
          <el-input placeholder="请输入角色名称" v-model="form.roleName" />
        </el-form-item>

        <el-form-item label="权限字符" prop="rolePerm">
          <el-input placeholder="请输入权限字符" v-model="form.rolePerm" />
        </el-form-item>
        <el-form-item label="状态" prop="rolePerm" label-width="68px">
          <el-radio-group v-model="form.enabled">
            <el-radio
              v-for="imm in system_global_status"
              :label="imm.v"
              :key="imm.v"
              >{{ imm.k }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <!-- start -->
        <el-form-item label="菜单权限">
          <div class="checkB">
            <el-checkbox
              v-model="permission.openAll"
              @change="toggleTreeCollapse"
            >
              展开/折叠
            </el-checkbox>

            <el-checkbox
              v-model="permission.selectAll"
              @change="toggleTreeChecked"
              >全选/全不选</el-checkbox
            >

            <el-checkbox
              v-model="permission.linkage"
              @change="toggleTreeCheckedFs"
              >父子(联动/不联动)
            </el-checkbox>
            <el-tree
              ref="treeRef"
              :data="permission.treeList"
              :check-strictly="!permission.linkage"
              show-checkbox
              node-key="id"
              :props="defaultProps"
              class="treeB"
            />
          </div>
        </el-form-item>
        <!-- end -->
        <el-form-item label="备注" prop="descript">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.descript"
            :maxlength="200"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="addRolehander">确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.checkB {
  width: 100%;
}
.treeB {
  margin-top: 0.5rem;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>
