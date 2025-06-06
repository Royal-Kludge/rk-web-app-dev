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
                        <div class="py-3 my-3 w-100 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but"
                            @click="local = true">
                            {{ $t("set.but_1") }}
                        </div>
                        <div class="py-3 my-3 w-100 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but"
                            @click="reSet = true">
                            {{ $t("set.but_2") }}
                        </div>
                        <div class="py-3 my-3 w-100 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but" 
                            @click="checkDongle(true)" v-if="useKey.connectType == ConnectionType.Dongle">
                            {{ $t("set.but_7") }}(<span>{{ VerTipsDongle }}</span>)
                        </div>
                        <div class="py-3 my-3 w-100 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but"
                            @click="checkMouse(true)" v-if="useKey.connectType == ConnectionType.USB">
                            {{ $t("set.but_4") }}(<span>{{ VerTips }}</span>)
                        </div>
                        <div class="w-100 text-grey-1 text-center" v-if="useKey.connectType == ConnectionType.USB">
                            Version:{{ ver }}
                        </div>
                        <div class="w-100 text-grey-1 text-center" v-if="useKey.connectType == ConnectionType.Dongle">
                            Version:{{ verDongle }}
                        </div>
                    </div>
                    <div class="mb-1"></div>
                    <el-dialog v-model="reSet" :title="$t('set.but_2')">
                        <span>{{ $t("set.title_1") }}</span>
                        <template #footer>
                            <div class="d-flex jc-center">
                                <el-button @click="setToFactory()">{{ $t("set.but_5") }}</el-button>
                                <el-button type="primary" @click="reSet = false">{{ $t("set.but_6") }}</el-button>
                            </div>
                        </template>
                    </el-dialog>
                    <el-dialog v-model="local" :title="$t('set.but_1')">
                        <span>{{ $t("set.title_7") }}</span>
                        <template #footer>
                            <div class="d-flex jc-center">
                                <el-button @click="clearLocalData()">{{ $t("set.but_5") }}</el-button>
                                <el-button type="primary" @click="local = false">{{ $t("set.but_6") }}</el-button>
                            </div>
                        </template>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useSetStore } from "@/stores/setStore";
import { useKeyStore } from "@/stores/rk_k3/keyStore";
import { usePropertyStore } from "@/stores/rk_k3/propertyStore";
import { useSpeedStore } from "@/stores/rk_k3/speedStore";
import { useProfileStore } from "@/stores/rk_k3/profileStore";
import { useLocaleStore } from "@/stores/locale";
import { storeToRefs } from "pinia";
import { storage } from '@/common/storage';
import { useI18n } from 'vue-i18n';
import axios from 'axios'
import { mouse } from '@/mouse/beiying/mouse'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import { ConnectionType } from '@/device/enum';

// 解构出t方法
const { t } = useI18n();
const useLocale = useLocaleStore();
const { locale } = storeToRefs(useLocale);
const setStore = useSetStore();
const { langList } = storeToRefs(setStore);
const useKey = useKeyStore();
const useProperty = usePropertyStore();
const useSpeed = useSpeedStore();
const useProfile = useProfileStore();

const reSet = ref(false);
const ver = ref(mouse.state.fwVersion);
const version = ref(mouse.state.fwVersion);
const verDongle = ref(mouse.state.dongleFwVersion);
const versionDongle = ref(mouse.state.dongleFwVersion);
const mouseVer = ref();
const dongleVer = ref();
const local = ref(false);
const VerTips = computed(() => (ver.value !== version.value ? t('set.title_3') + ':' + version.value : t('set.title_2')))
const VerTipsDongle = computed(() => (verDongle.value !== versionDongle.value ? t('set.title_3') + ':' + version.value : t('set.title_2')))

const getVer = () => {
    let pid = mouse.mouseDefine?.productId;
    axios.get('/down/work/RKWEB/firmware/K3/K3(533)_firmware.json').then(response => {
            // 请求成功处理
            mouseVer.value = response.data.mouse;
            dongleVer.value = response.data.dongle;

            version.value = mouseVer.value.version;
            versionDongle.value = dongleVer.value.version;
            checkVer()
        }).catch(error => {
            // 请求失败处理   
            console.error(error);
        });
}

const checkVer = (flag: boolean = false) => {
    if (useKey.connectType == ConnectionType.USB) {
        if (ver.value !== version.value) {
        let msg = "";

        if (ver.value !== version.value) {
            msg = `Mouse ${t('set.title_3')}:${version.value}`;
        }

        ElMessageBox.alert(msg, t('set.but_4'), {
            confirmButtonText: 'OK',
            callback: (action: Action) => {
                if (action === 'confirm') {
                    if (ver.value !== version.value) updateMouse();
                    if (verDongle.value !== versionDongle.value) updateDongle();
                }
            },
        })
    } else if (flag == true) {
        ElMessage({
            type: 'info',
            message: t("set.title_2"),
        })
    }
    } else {
        if (verDongle.value !== versionDongle.value) {
            let msg = "";

            if (verDongle.value !== versionDongle.value) {
                msg = `Dongle ${t('set.title_3')}:${versionDongle.value}`;
            }

            ElMessageBox.alert(msg, t('set.but_4'), {
                confirmButtonText: 'OK',
                callback: (action: Action) => {
                    if (action === 'confirm') {
                        if (ver.value !== version.value) updateMouse();
                        if (verDongle.value !== versionDongle.value) updateDongle();
                    }
                },
            })
        } else if (flag == true) {
            ElMessage({
                type: 'info',
                message: t("set.title_2"),
            })
        }
    }

}

const checkMouse = (flag: boolean = false) => {
    if (ver.value !== version.value) {
        ElMessageBox.alert(`${t('set.title_3')}:${version.value}`, t('set.but_4'), {
            confirmButtonText: 'OK',
            callback: (action: Action) => {
                if (action === 'confirm') {
                    updateMouse();
                }
            },
        })
    } else if (flag == true) {
        ElMessage({
            type: 'info',
            message: t("set.title_2"),
        })
    }
}

const checkDongle = (flag: boolean = false) => {
    if (verDongle.value !== versionDongle.value) {
        ElMessageBox.alert(`${t('set.title_3')}:${version.value}`, t('set.but_4'), {
            confirmButtonText: 'OK',
            callback: (action: Action) => {
                if (action === 'confirm') {
                    updateDongle();
                }
            },
        })
    } else if (flag == true) {
        ElMessage({
            type: 'info',
            message: t("set.title_2"),
        })
    }
}

const updateMouse = () => {
    ElMessage({
        type: 'info',
        message: t("set.title_4"),
    })
    window.open(mouseVer.value.url, '_blank')// 新窗口打开外连接
}

const updateDongle = () => {
    ElMessage({
        type: 'info',
        message: t("set.title_4"),
    })
    window.open(dongleVer.value.url, '_blank')// 新窗口打开外连接
}

onMounted(async () => {
    await useKey.init();
    getVer();
});

onBeforeUnmount(() => {
    useKey.destroy();
});

const setToFactory = async () => {
    await useKey.setToFactory();
    useKey.refresh();
    useProperty.refresh();
    useSpeed.refresh();
    useProfile.saveProfile();
    reSet.value = false;
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