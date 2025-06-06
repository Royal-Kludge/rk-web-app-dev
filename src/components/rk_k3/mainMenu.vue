<template>
    <div class="bg-grey d-flex flex-column jc-between h-100">
        <div class="d-flex flex-column flex-1">
            <div class="d-flex flex-column h-100">
                <div class="p-3 bg-white-1 fw-b fs-xxl">{{ $t("key.title") }}</div>
                <div style="height: 65vh">
                    <el-scrollbar>
                        <div v-for="item in (state.profileList as Array<Profile>)"
                            class="module_box d-flex p-3 my-2 text-grey-1 jc-between"
                            :class="{ 'module_active': item.index === useProfile.profile?.index }">
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
                        </div>
                    </el-scrollbar>
                </div>
            </div>
            <el-dialog v-model="useProfile.state.nameEditorDisplay" top="30vh" width="680px" :lock-scroll="true"
                :before-close="useProfile.handleEditClose">
                <div class="d-flex ai-center">
                    <el-input v-model="useProfile.state.name" placeholder="Please input" maxlength="10" />
                </div>
                <div class="d-flex jc-end">
                    <div class="py-1 px-4 but-green text-white c-p mt-4" @click="saveRenameProfile">
                        {{ $t('macro.but_7') }}
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="bg-white" style="height: 46px;">
            <div class="d-flex jc-center text-white">
                <div class="d-flex py-1 m-2 px-3 but-blue c-p" @click="newProfile">
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
        <!-- <div class="d-flex jc-center">
            <div class="box p-3 d-flex ai-center jc-center fs-xxl" :class="{ active: 5 === meunid }"
                @click="useMenu.setMeunid(5)">
                <img src="@/assets/images/menu/mouse/set.png" />
                <span class="ml-2">{{ $t("home.menu_5") }}</span>
            </div>
        </div> -->
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useProfileStore } from "@/stores/rk_k3/profileStore";
import type { UploadProps } from 'element-plus'
import { storeToRefs } from "pinia";
import { onMounted, onBeforeUnmount } from "vue";
import { Profile } from '@/mouse/beiying/rk_k3/profiles';
import { useKeyStore } from "@/stores/rk_k3/keyStore";
import { useSpeedStore } from "@/stores/rk_k3/speedStore";
import { usePropertyStore } from "@/stores/rk_k3/propertyStore";
import { mouse } from "@/mouse/beiying/mouse";
import type { RK_K3 } from "@/mouse/beiying/rk_k3/rk_k3";
import { useMenuStore } from "@/stores/rk_k3/menuStore";

const useMenu = useMenuStore();
const { meunid } = storeToRefs(useMenu);

const rk_k3 = ref<RK_K3>();

const useProfile = useProfileStore();
const useKey = useKeyStore();
const useSpeed = useSpeedStore();
const useProperty = usePropertyStore();
const { state } = storeToRefs(useProfile);

// 页面加载时
onMounted(() => {
    useProfile.init();

    if (rk_k3.value == undefined || (rk_k3.value != undefined && rk_k3.value.data.isDestroy)) {
        rk_k3.value = (mouse.protocol as RK_K3);
    }
});

onBeforeUnmount(() => {
    useProfile.destroy();
});

const clickProfile = async (obj: Profile) => {
    await useProfile.clickProfile(obj);
    if (rk_k3.value != undefined) {
        await rk_k3.value.setDpi();
        await rk_k3.value.setKeyMapping(0);
        await rk_k3.value.setKeyMapping(1);
        await rk_k3.value.setKeyMapping(2);
        await rk_k3.value.setKeyMapping(3);
        await rk_k3.value.setKeyMapping(4);
        await rk_k3.value.setReportRate();
        await rk_k3.value.setDebounce();
        await rk_k3.value.setSleepTime();
    }

    useKey.refresh();
    useSpeed.refresh();
    useProperty.refresh();
}

const newProfile = async () => {
    await useProfile.newProfile();

    // useKey.refresh();
    // useSpeed.refresh();
    // useProperty.refresh();
}

const saveRenameProfile = () => {
    useProfile.renameSaveProfile();

    useKey.refresh();
    useSpeed.refresh();
    useProperty.refresh();
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        // 在这里可以处理文件内容，例如验证或转换
        useProfile.importProfile(e.target?.result)
    };
    reader.readAsText(rawFile); // 读取文件内容为文本
    return false
}
</script>
<style scoped lang="scss">
.box {
    cursor: pointer;
    width: 180px;
    border-radius: 10px 10px 0% 0% !important;

    img {
        width: 16px;
    }
}

.active {
    color: #FC5D41 !important;
    background-color: #eff1f7 !important;

    img {
        position: relative;
        left: -99999px;
        filter: drop-shadow(#FC5D41 99999px 0);
    }
}
</style>