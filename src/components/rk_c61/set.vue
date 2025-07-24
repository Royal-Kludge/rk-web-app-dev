<template>
    <div class="d-flex jc-center w-100">
        <div class="d-flex flex-column ml-4 my-4" style="width: 50%;">
            <div class="bg-white p-2" style="border-radius: 10px 10px 0px 0px;line-height: 30px;">
                {{ $t("set.title") }}
            </div>
            <div class="bg-white-1" style="border-radius: 0px 0px 10px 10px;height: 95%;">
                <div class="m-5" style="border-bottom: 1px solid #E7EAF2;">
                    <div class="m-4">{{ $t("set.lang") }}</div>
                    <div class="m-4">
                        <el-select v-model="locale" placeholder="Select" style="width: 100%;"
                            @change="useLocale.setLocale(locale)">
                            <el-option v-for="item in langList" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <div class="mb-5"></div>
                </div>
                <div class="m-5">
                    <div class="m-4 d-flex flex-column">
                        <div class="w-100 text-grey-1">
                            {{ $t("set.keyboard_info") }}
                        </div>
                        <div class="w-100 bg-grey mt-3 mb-3" style="border-radius: 10px;">
                            <div class="d-flex m-3">
                                <span style="width: 132px;text-align: right;">{{ $t("set.keyboard_name") }}</span>
                                <span class="ml-4">{{ keyboard.state.deviceName }}</span>
                            </div>
                            <div class="d-flex m-3">
                                <span style="width: 132px;text-align: right;">{{ $t("set.keyboard_sn") }}</span>
                                <span class="ml-4">{{ keyboard.state.serialNo }}</span>
                            </div>
                            <div class="d-flex m-3">
                                <span style="width: 132px;text-align: right;">{{ $t("set.keyboard_version") }}</span>
                                <span class="ml-4">{{ keyboard.state.fwVersion }}</span>
                            </div>
                            <div class="d-flex m-3">
                                <span style="width: 132px;text-align: right;">{{ $t("set.keyboard_mode") }}</span>
                                <span class="ml-4">{{ keyboard.state.runMode == 0 ? "AppMode" : "BootMode" }}</span>
                            </div>
                        </div>
                        <div class="py-3 my-3 w-100 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but"
                            @click="update = true">
                            {{ $t("set.into_boot") }}
                        </div>
                        <div class="py-3 my-3 w-100 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but"
                            @click="local = true">
                            {{ $t("set.but_1") }}
                        </div>
                        <div class="py-3 my-3 w-100 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but"
                            @click="reset = true">
                            {{ $t("set.but_2") }}
                        </div>
                    </div>
                    <div class="mb-1"></div>
                    <el-dialog v-model="boot" :title="$t('set.but_4')">
                        <span>{{ $t("set.title_9") }}</span>
                        <template #footer>
                            <div class="d-flex jc-center">
                                <el-button type="primary" @click="setToBoot()">{{ $t("set.but_5") }}</el-button>
                                <el-button @click="boot = false">{{ $t("set.but_6") }}</el-button>
                            </div>
                        </template>
                    </el-dialog>
                    <el-dialog v-model="update" :title="$t('set.but_4')">
                        <span>{{ $t("set.title_8") }}</span>
                        <template #footer>
                            <div class="d-flex jc-center">
                                <el-button type="primary" @click="setToUpdate()">{{ $t("set.but_5") }}</el-button>
                                <el-button @click="update = false">{{ $t("set.but_6") }}</el-button>
                            </div>
                        </template>
                    </el-dialog>
                    <el-dialog v-model="reset" :title="$t('set.but_2')">
                        <span>{{ $t("set.title_1") }}</span>
                        <template #footer>
                            <div class="d-flex jc-center">
                                <el-button type="primary" @click="setToFactory()">{{ $t("set.but_5") }}</el-button>
                                <el-button @click="reset = false">{{ $t("set.but_6") }}</el-button>
                            </div>
                        </template>
                    </el-dialog>
                    <el-dialog v-model="local" :title="$t('set.but_1')">
                        <span>{{ $t("set.title_7") }}</span>
                        <template #footer>
                            <div class="d-flex jc-center">
                                <el-button type="primary" @click="clearLocalData()">{{ $t("set.but_5") }}</el-button>
                                <el-button @click="local = false">{{ $t("set.but_6") }}</el-button>
                            </div>
                        </template>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useLocaleStore } from "@/stores/locale";
import { storeToRefs } from "pinia";
import { storage } from '@/common/storage';
import { useSetStore } from "@/stores/setStore";
import { useKeyStore } from "@/stores/rk_c61/keyStore";
import { useUpdateStore } from "@/stores/rk_c61/updateStore";
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import { keyboard } from '@/keyboard/sparklink/keyboard';
import { BL_Controls } from '@/keyboard/sparklink/enum';

// 解构出t方法
const { t } = useI18n();
const useLocale = useLocaleStore();
const { locale } = storeToRefs(useLocale);
const setStore = useSetStore();
const { langList } = storeToRefs(setStore);
const useKey = useKeyStore();
const useUpdate = useUpdateStore();

const reset = ref(false);
const version = ref(keyboard.state.fwVersion)
const url = ref()
const local = ref(false);
const update = ref(false);
const boot = ref(false);

const getVer = () => {
    let pid = keyboard.keyboardDefine?.productId;
    if (pid != undefined) {
        if (pid == 0x01A2) {
            axios.get('/down/work/RKWEB/firmware/M87/M87_firmware_en.json').then(response => {
                // 请求成功处理
                version.value = response.data.version
                url.value = response.data.url
                checkVer()
            }).catch(error => {
                // 请求失败处理   
                console.error(error);
            });
        } else if (pid == 0x01F5) {
            axios.get('/down/work/RKWEB/firmware/M87/M87_firmware_jp.json').then(response => {
                // 请求成功处理
                version.value = response.data.version
                url.value = response.data.url
                checkVer()
            }).catch(error => {
                // 请求失败处理   
                console.error(error);
            });
        } else if (pid == 0x01D6) {
            axios.get('/down/work/RKWEB/firmware/M87/M87_firmware_uk.json').then(response => {
                // 请求成功处理
                version.value = response.data.version
                url.value = response.data.url
                checkVer()
            }).catch(error => {
                // 请求失败处理   
                console.error(error);
            });
        }
    }
}

const checkVer = (flag: boolean = false) => {
    // if (useLight.connectType !== ConnectionType.USB && flag == true) {
    //     ElMessage({
    //         type: 'info',
    //         message: t("set.title_5"),
    //     })
    //     return
    // }
    // if (ver.value !== version.value && useLight.connectType == ConnectionType.USB) {
    //     ElMessageBox.alert(`${t('set.title_3')}:${version.value}`, t('set.but_4'), {
    //         confirmButtonText: 'OK',
    //         callback: (action: Action) => {
    //             if (action === 'confirm') {
    //                 updateVer();
    //             }
    //         },
    //     })
    // }
    // else if (flag == true) {
    //     ElMessage({
    //         type: 'info',
    //         message: t("set.title_2"),
    //     })
    // }
}

const setToBoot = async () => {
    if (keyboard.state.serialNo != undefined) {
        const sn_buff = [];
        for (let i = 0; i < 16; i++) {
            sn_buff[i] = keyboard.state.serialNo.charCodeAt(i);
        }

        await useUpdate.signFor(BL_Controls.BL_ERASE, sn_buff);
        boot.value = false;
    }
}

const setToUpdate = () => {
    update.value = false;
    boot.value = true;
}

const setToFactory = async () => {
    storage.clear();
    await useKey.setToFactory();
    window.location.reload();
}

const clearLocalData = () => {
    storage.clear();
    local.value = false;
    window.location.reload();
}
</script>
<style lang="scss" scoped>
:deep(.el-checkbox) {
    width: 100%;
    --el-checkbox-checked-text-color: #4743A7;
    --el-checkbox-text-color: #4743A7;
    --el-checkbox-checked-bg-color: #4743A7;
    --el-checkbox-checked-input-border-color: #ffffff;
    --el-checkbox-input-border-color-hover: #ffffff;
    --el-checkbox-checked-icon-color: transparent;
}

:deep(.el-checkbox__inner) {
    background-color: transparent;
    width: 18px;
    height: 18px;
}

.but:hover {
    background-color: #4743A7;
    color: #ffffff
}
</style>