<template>
    <div class="bg-grey d-flex flex-column jc-between h-100">
        <div class="d-flex flex-column flex-1">
            <div class="d-flex flex-column h-100">
                <div class="p-3 bg-white-1 fw-b fs-xxl">{{ $t("key.title") }}</div>
                <div style="height: 75vh">
                    <el-scrollbar>
                        <div v-for="item in state.proflies.list"
                            class="module_box d-flex p-3 my-2 text-grey-1 jc-between"
                            :class="{ 'module_active': item.index === state.proflies.curIndex }">
                            <div style="padding-left: 16%;width: 100%" class="d-flex" @click="clickProfile(item)">
                                <div class="d-flex">
                                    <span class="pr-4 d-flex ai-center">
                                        <img src="../../assets/images/dot.png" />
                                    </span>
                                    <span>
                                        <!-- {{ item.isDefault ? $t("Profile.default") : item.name }} -->
                                          {{ $t("Profile.namePrefix") }} {{ `${item.index + 1}` }}
                                    </span>
                                </div>
                            </div>
                            <!--<div>
                                <el-dropdown>
                                    <el-icon :size="18" color="#ffffff">
                                        <MoreFilled />
                                    </el-icon>
                                    <template #dropdown>
                                        <el-dropdown-menu style="padding: 0px;">
                                            <el-dropdown-item @click="useProfile.renameProfile(item)"
                                                v-if="!item.isDefault">
                                                <img src="../../assets/images/title/edit.png" class="img-title" />
                                                {{ $t("key.but_4") }}
                                            </el-dropdown-item>
                                            <el-dropdown-item @click="useProfile.deleteProfile(item)"
                                                v-if="!item.isDefault">
                                                <img src="../../assets/images/title/del.png" class="img-title" />
                                                {{ $t("key.but_5") }}
                                            </el-dropdown-item>
                                            <el-dropdown-item @click="useProfile.exportProfile(item)">
                                                <img src="../../assets/images/title/export.png" class="img-title" />
                                                {{ $t("key.but_6") }}
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                            -->
                        </div>
                    </el-scrollbar>
                </div>
            </div>
            <el-dialog v-model="state.nameEditorDisplay" top="30vh" width="680px" :lock-scroll="true"
                :before-close="useProfile.handleEditClose">
                <div class="d-flex ai-center">
                    <el-input v-model="state.name" placeholder="Please input" maxlength="10" />
                </div>
                <div class="d-flex jc-end">
                    <div class="py-1 px-4 but-green text-white c-p mt-4" @click="useProfile.renameSaveProfile">
                        {{ $t('macro.but_7') }}
                    </div>
                </div>
            </el-dialog>
        </div>
        <!--<div class="bg-white" style="height: 46px;">
            <div class="d-flex jc-center text-white">
                <div class="d-flex py-1 m-2 px-3 but-blue c-p" @click="useProfile.newProfile()">
                    <img src="../../assets/images/title/new.png" class="img-but" />{{ $t("key.but_1") }}
                </div>
                <div class="d-flex py-1 m-2 px-3 but-green c-p">
                    <el-upload :before-upload="beforeAvatarUpload" :show-file-list="false">
                        <img src="../../assets/images/title/import.png" class="img-but" />
                        {{ $t("key.but_2") }}
                    </el-upload>
                </div>
            </div>
        </div>
        -->
    </div>
</template>
<script setup lang="ts">
import { useProfileStore } from "@/stores/rk_c61/profileStore";
import type { UploadProps } from 'element-plus'
import { uselightStore } from "@/stores/rk_c61/lightStore";
import { useKeyStore } from "@/stores/rk_c61/keyStore";
import { Profile } from '@/keyboard/sparklink/profiles';
import { storeToRefs } from "pinia";
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { RK_C61 } from "@/keyboard/sparklink/rk_c61/rk_c61";
import { keyboard } from "@/keyboard/sparklink/keyboard";

const useProfile = useProfileStore();
const useLight = uselightStore();
const useKey = useKeyStore();

const { state } = storeToRefs(useProfile);

const rk_c61 = ref<RK_C61>();

onMounted(async () => {
    useProfile.init();
    if (rk_c61.value == undefined) {
        rk_c61.value = keyboard.protocol as RK_C61;
    }
});

const clickProfile = async (obj: Profile) => {
    await useProfile.clickProfile(obj);
    useKey.updateKeyInfo();
    await useLight.refresh()
    //await useLight.saveBoardProfileToDevice()
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    console.log(rawFile)
    // if (rawFile.type !== 'application/json') {
    //     ElMessage.error('File format error')
    //     return false
    // }
    const reader = new FileReader();
    reader.onload = (e) => {
        // 在这里可以处理文件内容，例如验证或转换
        //useKey.importProfile(e.target?.result)
    };
    reader.readAsText(rawFile); // 读取文件内容为文本
    return false
}
</script>
<style scoped lang="scss"></style>