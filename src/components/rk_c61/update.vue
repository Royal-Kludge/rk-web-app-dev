<template>
    <div class="d-flex ai-cetner jc-center">
        <div class="m-2 d-flex flex-column">
            <div class="w-100 text-grey-1">
                {{ $t("set.keyboard_info") }}
            </div>
            <div class="w-100 bg-grey mt-3 mb-3" style="border-radius: 10px;">
                <div class="d-flex m-3">
                    <span style="width: 132px;text-align: right;">{{ $t("set.keyboard_name") }}</span>
                    <span class="ml-4 mr-5">{{ keyboardInfo.name }}</span>
                </div>
                <div class="d-flex m-3">
                    <span style="width: 132px;text-align: right;">{{ $t("set.keyboard_sn") }}</span>
                    <span class="ml-4 mr-5">{{ keyboardInfo.sn }}</span>
                </div>
                <div class="d-flex m-3">
                    <span style="width: 132px;text-align: right;">{{ $t("set.keyboard_version") }}</span>
                    <span class="ml-4 mr-5">{{ keyboardInfo.varsion }}</span>
                </div>
                <div class="d-flex m-3">
                    <span style="width: 132px;text-align: right;">{{ $t("set.keyboard_mode") }}</span>
                    <span class="ml-4 mr-5">{{ keyboardInfo.mode == 0 ? "AppMode" : "BootMode" }}</span>
                </div>
            </div>
        </div>
        <div class="m-2 d-flex flex-column">
            <div class="w-100 text-grey-1">
                {{ $t('set.offline') }}
            </div>
            <div class="w-100 bg-grey mt-3 mb-3" style="border-radius: 10px;">
                <el-upload ref="upload" v-model:file-list="fileList" class="m-3" :limit="1" :on-exceed="handleExceed"
                    :on-change="StartReadFile" :auto-upload="false" :disabled="updateType != UpdateTypeEnum.None">
                    <template #trigger>
                        <el-button class="m-3" type="primary" :disabled="updateType != UpdateTypeEnum.None">{{ $t('set.but_10') }}</el-button>
                    </template>
                    <div style="display: inline-flex; justify-content: flex-start; align-items: center; margin-left: 10px">
                        <el-button @click="useUpdate.offlineUpdateStart()" :disabled="updateType != UpdateTypeEnum.None">{{ $t('set.but_11') }}</el-button>
                        <el-progress v-if="updateType  == UpdateTypeEnum.Offline" color="blue" class="ml-3"
                            style="width: 160px; margin-left: 10px; border-radius: 3px" :percentage="upgradeProgress"
                            :height="6"></el-progress>
                    </div>

                    <template #tip>
                        <div class="m-3">
                            {{ $t('set.title_11') }}
                        </div>
                    </template>
                </el-upload>
            </div>
        </div>
    </div>
    <el-dialog v-model="successDialog" :title="$t('set.but_4')">
        <span>{{ $t('set.title_12') }}</span>
        <template #footer>
            <div class="d-flex jc-center">
                <el-button type="primary" @click="useUpdate.reboot()">{{ $t('set.confirm') }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { genFileId } from 'element-plus';
import { ref,computed } from 'vue';
import { LOG_TYPE, Logging } from '@/common/logging';
import { UpdateTypeEnum } from '@/keyboard/sparklink/enum';
import tool from "@/keyboard/sparklink/tool";
import { storeToRefs } from "pinia";
import { useUpdateStore } from "@/stores/rk_c61/updateStore";

// 文件列表
const fileList = ref([]);
// 引用上传组件实例
const upload = ref<any>(null);;

// 是否存在固件
const hasFW = computed(() => {
    if (fwData.value.length > 0) {
        return true;
    }

    return false;
});

const useUpdate = useUpdateStore();
const { updateType, upgradeProgress, fwSize, fwData, successDialog, keyboardInfo } = storeToRefs(useUpdate);

// 处理文件超出限制时的逻辑
const handleExceed = (files: any) => {
    if (upload.value != null) {
        upload.value.clearFiles();
        const file = files[0];
        file.uid = genFileId();
        upload.value.handleStart(file);
    }
};

const StartReadFile = (file: any) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
        // 读取到的结果是 ArrayBuffer
        const arrayBuffer = event.target.result;
        // 将 ArrayBuffer 转换为 Uint8Array
        const uint8Array = new Uint8Array(arrayBuffer);
        fwData.value = [];
        fwData.value = tool.padFirmwareDataTo512(uint8Array);
        fwSize.value = fwData.value.length;
        Logging.console(LOG_TYPE.INFO, `固件：${fwData.value}`);
        Logging.console(LOG_TYPE.INFO, `固件大小：${fwSize.value}`);
    };
    reader.readAsArrayBuffer(file.raw);
};
</script>