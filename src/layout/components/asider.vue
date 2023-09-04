<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import asiderItem from './asiderItem.vue'
import menuStore from '@/stores/menu.ts'
let router = useRouter()
let menuStores = menuStore()
let authSlideMenuList = ref([])
authSlideMenuList.value = menuStores.authSlideMenuList
let activeIndex = ref('/')
watch(
  () => router.currentRoute.value.path,
  (newVal, oldVal) => {
    activeIndex.value = newVal
  },
  { immediate: true }
)
</script>

<template>
  <div class="asider-page">
    <el-scrollbar max-height="100vh">
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        class="el-menu-vertical-demo"
        :unique-opened="true"
        :collapse-transition="true"
        :default-active="activeIndex"
        router
      >
        <asiderItem
          v-for="item in authSlideMenuList"
          :key="item.id"
          :data="item"
        ></asiderItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped></style>
