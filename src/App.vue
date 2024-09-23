<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMenuStore } from "./stores/menuStore";
import { useSetStore } from "./stores/setStore";
import { useLocaleStore } from "./stores/locale";
import { storeToRefs } from "pinia";

const useLocale = useLocaleStore();
const { locale } = storeToRefs(useLocale);
const setStore = useSetStore();
const { langList } = storeToRefs(setStore);

const useMenu = useMenuStore();
const { name } = storeToRefs(useMenu);
</script>

<template>
  <el-container class="p-a w-100 h-100">
    <el-header class="header d-flex jc-between">
      <div class="d-flex ai-center h-100 ml-4">
        <span style="word-wrap: break-word;font-size: 32px; font-weight: bold;font-family:'Microsoft YaHei';"
          v-html="name"></span>
      </div>
      <div class="d-flex ai-center mr-4">
        <el-select v-model="locale" placeholder="Select" style="width: 100%;" @change="useLocale.setLocale(locale)">
          <el-option v-for="item in langList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
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

.tip_font {
  font-size: 15px !important;
}

.tip_font2 {
  font-size: 18px !important;
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
