<script setup lang="ts">
import asider from './components/asider.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="layout-page">
    <div class="common-layout">
      <el-container>
        <!-- <el-aside> -->
        <!-- 左侧 -->
        <section class="system-slideMenu">
          <asider></asider>
        </section>
        <!-- </el-aside> -->
        <el-container>
          <!-- 右侧 -->
          <el-header>Header</el-header>
          <el-main>
            <!-- 加key为路径避免缓存 -->
            <RouterView />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.system-slideMenu {
  width: 200px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
  height: 100vh;
  background: #545c64;
  border: 1px solid #545c64;
  transition: width 0.6s;
}
</style>
