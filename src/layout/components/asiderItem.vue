<script setup lang="ts">
import { type } from 'os'
import { computed, toRefs, ref } from 'vue'
const handleOpen = () => {}
const handleClose = () => {}
const { data } = defineProps({
  data: { type: Object, required: true },
})
const hasChildren = computed(() => {
  return Array.isArray(data.children) && data.children.length > 0
})
</script>

<template>
  <div class="asiderItem">
    <!--如果有子级-->
    <el-sub-menu :index="data.path" v-if="hasChildren">
      <template #title>{{ data.name }}</template>
      <el-menu-item-group>
        <asiderItem
          v-for="item in data.children"
          :key="item.id"
          :data="item"
        ></asiderItem>
      </el-menu-item-group>
    </el-sub-menu>

    <!--没有子级-->
    <el-menu-item :index="data.path" v-else>
      {{ data.name }}
    </el-menu-item>
  </div>
</template>

<style lang="scss" scoped></style>
