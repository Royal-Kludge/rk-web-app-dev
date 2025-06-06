<template>
    <div class="bg-grey d-flex flex-column jc-between h-100">
        <div class="d-flex flex-column flex-1">
            <div class="d-flex flex-column h-100">
                <div class="p-3 bg-white-1 fw-b fs-xxl">{{ $t("key.title") }}</div>
                <div style="height: 75vh">
                    <el-scrollbar>
                        <div v-for="item in (state.profileList as Array<Profile>)"
                            class="module_box d-flex p-3 my-2 text-grey-1 jc-between"
                            :class="{ 'module_active': item.index === useKey.profile?.index }">
                            <div style="padding-left: 16%;width: 100%" class="d-flex" @click="clickProfile(item)">
                                <div class="d-flex">
                                    <span class="pr-4 d-flex ai-center">
                                        <img src="../../assets/images/dot.png" />
                                    </span>
                                    <span>
                                        {{ item.isDefault ? $t("Profile.default") : item.name }}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <el-dropdown>
                                    <el-icon :size="18" color="#ffffff">
                                        <MoreFilled />
                                    </el-icon>
                                    <template #dropdown>
                                        <el-dropdown-menu style="padding: 0px;">
                                            <el-dropdown-item @click="useKey.renameProfile(item)"
                                                v-if="!item.isDefault">
                                                <img src="../../assets/images/title/edit.png" class="img-title" />
                                                {{ $t("key.but_4") }}
                                            </el-dropdown-item>
                                            <el-dropdown-item @click="useKey.deleteProfile(item)"
                                                v-if="!item.isDefault">
                                                <img src="../../assets/images/title/del.png" class="img-title" />
                                                {{ $t("key.but_5") }}
                                            </el-dropdown-item>
                                            <el-dropdown-item @click="useKey.exportProfile(item)">
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
            <el-dialog v-model="useKey.state.nameEditorDisplay" top="30vh" width="680px" :lock-scroll="true"
                :before-close="useKey.handleEditClose">
                <div class="d-flex ai-center">
                    <el-input v-model="useKey.state.name" placeholder="Please input" maxlength="10" />
                </div>
                <div class="d-flex jc-end">
                    <div class="py-1 px-4 but-green text-white c-p mt-4" @click="useKey.renameSaveProfile">
                        {{ $t('macro.but_7') }}
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="bg-white" style="height: 46px;">
            <div class="d-flex jc-center text-white">
                <div class="d-flex py-1 m-2 px-3 but-blue c-p" @click="useKey.newProfile()">
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
    </div>
</template>
<script setup lang="ts">
import { useKeyStore } from "@/stores/rk_s98/keyStore";
import type { UploadProps } from 'element-plus'
import { uselightStore } from "@/stores/rk_s98/lightStore";
import { Profile } from '@/keyboard/beiying/rk_s98/profiles';
import { storeToRefs } from "pinia";

const useKey = useKeyStore();
const useLight = uselightStore();

const { state } = storeToRefs(useKey);

const clickProfile = async (obj: Profile) => {
    await useKey.clickProfile(obj)
    await useLight.refresh()
    await useLight.saveBoardProfileToDevice()
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
        useKey.importProfile(e.target?.result)
    };
    reader.readAsText(rawFile); // 读取文件内容为文本
    return false
}
</script>
<style scoped lang="scss"></style>