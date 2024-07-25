<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMenuStore } from "./stores/menuStore";
import { storeToRefs } from "pinia";
const useMenu = useMenuStore();
const { name } = storeToRefs(useMenu);
</script>

<template>
  <el-container class="p-a w-100 h-100">
    <el-header class="header">
      <div class="d-flex ai-center h-100 ml-4">
        <span style="word-wrap: break-word;font-size: 56px; font-weight: bold;font-family:'Microsoft YaHei';" v-html="name"></span>
      </div>
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>
<style>
.el-header {
  --el-header-padding: 0px !important;
}

.el-main {
  --el-main-padding: 0px !important;
}

.header {
  z-index: 999;
  height: 120px !important;
  background: #fdfdfe;
  box-shadow: 0px 0px 24px 0px #e9ebf3;
}

body {
  margin: 0;
  padding: 0;
  background-color: #eff1f7;
  color: #6a6a77;
  font-size: 16px;
  font-family: "思源黑体";
}

@font-face {
  font-family: "思源黑体";
  src: url("assets/css/SourceHanSansCN-Normal.otf");
  font-style: normal;
}

#app {
  margin: 0 auto;
  width: 100%;
}
</style>
