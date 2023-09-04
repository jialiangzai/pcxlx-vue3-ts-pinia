<script setup lang="ts">
import { RuleForm } from '@/types/login.t'
import { ref, reactive, onMounted } from 'vue'
import { captchaImg, loginByJson } from '@/utils/api/login'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { Encrypt } from '@/utils/aes'
import useStore from '@/stores/counter'
import { useRouter } from 'vue-router'
import menuStore from '@/stores/menu'
let menuStores = menuStore()
let router = useRouter()
let store = useStore()
let key = ref(Date.now().toString())
let imgUrl = ref('')
const ruleFormRef = ref<FormInstance>()
let ruleForm = reactive<RuleForm>({
  username: 'aiwozundujiadu',
  password: 'j123456.',
  key: '',
  captcha: '',
  isReme: true,
})

const rules = reactive<FormRules<RuleForm>>({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: ['blur', 'change'],
    },
  ],
  captcha: [
    {
      required: true,
      message: '请输入验证码',
      trigger: ['blur', 'change'],
    },
    {
      max: 4,
      message: '请输入4位验证码',
      trigger: ['blur', 'change'],
    },
  ],
})
onMounted(() => {
  goImg()
})
const goImg = async () => {
  let res: BlobPart = await captchaImg({ key: key.value })
  let blob = new Blob([res], { type: 'image/png' })
  let oldUrl = URL.createObjectURL(blob)
  imgUrl.value = oldUrl
}
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      let { username, password, captcha } = ruleForm
      let res = await loginByJson({
        password: Encrypt(password),
        username: Encrypt(username),
        key: key.value,
        captcha,
      })

      if (res.code == '200') {
        await store.setToken(res.data)
        await store.getUserInfo()
        ElMessage({
          message: '登录成功',
          type: 'success',
        })
        router.push('/')
      } else {
        ElMessage({
          message: res.msg,
          type: 'error',
        })
        goImg()
      }
    } else {
      // 重置
      formEl.resetFields()
      ElMessage.error('请重新填写正确信息')
    }
  })
}
</script>

<template>
  <div class="login-page">
    <!-- <el-button type="primary" @click="goImg">图形验证码</el-button>
     -->
    <div class="form-login">
      <header>小鹿线基础框架</header>
      <div class="info-login">
        <el-form
          ref="ruleFormRef"
          size="large"
          :model="ruleForm"
          :rules="rules"
          status-icon
        >
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" clearable>
              <template #prefix>
                <el-icon size="20"><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" clearable show-password>
              <template #prefix>
                <el-icon size="20"><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="captcha" class="dfxj">
            <el-input
              v-model="ruleForm.captcha"
              clearable
              maxlength="4"
              show-word-limit
              class="input-left"
            />
            <el-image class="img-box" :src="imgUrl" @click="goImg" />
          </el-form-item>
          <el-form-item label="">
            <el-checkbox v-model="ruleForm.isReme" label="记住密码" />
          </el-form-item>
          <el-form-item>
            <el-button
              class="btn"
              type="primary"
              @click="submitForm(ruleFormRef)"
              size="large"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.form-login {
  width: 400px;
  height: 400px;
  text-align: center;
  background-color: skyblue;
  header {
    font-size: 20px;
    font-weight: 800;
    margin: 30px 0;
  }
  .info-login {
    padding: 20px;
    ::v-deep(.dfxj .el-form-item__content) {
      justify-content: space-between;
    }
    ::v-deep(.dfxj) {
      margin-bottom: 12px;
    }
  }
}
.img-box {
  width: 110px;
  height: 40px;
}
.btn {
  width: 100%;
}
::v-deep(.input-left) {
  width: 220px;
}
</style>
