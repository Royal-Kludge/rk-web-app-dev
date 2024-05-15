<template>
    <div style="min-width: 210px;width: 240px;">
        <MainMeun />
    </div>
    <div class="flex-1">
        <div class="d-flex flex-column h-100">
            <div>
                <Nav />
            </div>
            <div class="d-flex jc-center ai-center flex-1">
                <Key />
            </div>
            <div class="d-flex jc-center">
                <div style="height: 320px;overflow: hidden;">
                    <Fun />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import MainMeun from "./mainMenu.vue";
import Key from "./key.vue";
import Nav from "./nav.vue";
import Fun from "./fun.vue";
</script>
<style scoped lang="scss"></style>