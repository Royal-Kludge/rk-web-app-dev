<template>
    <div class="bg-grey d-flex flex-column jc-between h-100">
        <div class="d-flex flex-column flex-1">
            <div class="d-flex flex-column h-100">
                <div class="p-3 bg-white-1 fw-b fs-xxl">{{ $t("key.title") }}</div>
                <div style="height: 75vh">
                    <el-scrollbar>
                        <div style="padding-left: 16%" v-for="item in useKey.state.profiles?.get()"
                            class="module_box d-flex p-3 my-2 text-grey-1 jc-between"
                            :class="{ 'module_active': item.index === useKey.profile?.index }"
                            @click="useKey.clickProfile(item)">
                            <div class="d-flex">
                                <span class="pr-4 d-flex ai-center">
                                    <img src="../../assets/images/dot.png" />
                                </span>
                                <span>
                                    {{ item.name }}
                                </span>
                            </div>
                            <div>
                                <el-dropdown>
                                    <el-icon :size="18" color="#ffffff">
                                        <MoreFilled />
                                    </el-icon>
                                    <template #dropdown>
                                        <el-dropdown-menu style="padding: 0px;">
                                            <el-dropdown-item>
                                                <img src="../../assets/images/title/edit.png" class="img-title" />
                                                {{ $t("key.but_4") }}
                                            </el-dropdown-item>
                                            <el-dropdown-item @click="useKey.deleteProfile(item)">
                                                <img src="../../assets/images/title/del.png" class="img-title" />
                                                {{ $t("key.but_5") }}
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                                <img src="../../assets/images/title/export.png" class="img-title" />
                                                {{ $t("key.but_6") }}
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
        <div class="bg-white" style="height: 46px;">
            <div class="d-flex jc-center text-white">
                <div class="d-flex py-1 m-2 px-3 but-blue">
                    <img src="../../assets/images/title/new.png" class="img-but" />{{ $t("key.but_1") }}
                </div>
                <div class="d-flex py-1 m-2 px-3 but-green">
                    <img src="../../../../src/assets/images/title/import.png" class="img-but" /> {{ $t("key.but_2") }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useKeyStore } from "@/stores/keyStore";
const useKey = useKeyStore();
</script>
<style scoped lang="scss"></style>