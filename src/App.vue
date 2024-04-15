<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <RouterView />
</template>
<style>
body {
    margin: 0;
    padding: 0;
    background-color: #1C1F24;
    color: #ffffff;
    font-size: 12px;
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
