import { ConnectionEventEnum, ConnectionStatusEnum } from "@/device/enum";
import { OrderTypeEnum } from "@/keyboard/sparklink/enum";
import { keyboard } from "@/keyboard/sparklink/keyboard";
import { Profiles, ps, type Profile } from "@/keyboard/sparklink/profiles";
import type { RK_C61 } from "@/keyboard/sparklink/rk_c61/rk_c61";
import { defineStore } from "pinia";
import { reactive, ref } from 'vue';

export const useProfileStore = defineStore('profileStore_rk_c61', () => {

    const profile = ref<Profile>();
    const isInited = ref(false);
    const rk_c61 = ref<RK_C61>();

    const state = reactive({
        name: '',
        nameEditorDisplay: false,
        proflies: ps
    })

    const init = async () => {

        if (rk_c61.value == undefined) {
            rk_c61.value = keyboard.protocol as RK_C61;
            keyboard.addEventListener("connection", connectionEventCallback);
        }

        if (!isInited.value) {
            profile.value = state.proflies.list[state.proflies.curIndex];
            isInited.value = true;
        }
    }

    const connectionEventCallback = async (event: Event) => {
        switch (keyboard.state.connectionEvent) {
            case ConnectionEventEnum.Disconnect:
            case ConnectionEventEnum.Close:
                destroy();
                break;
        }
    };

    const destroy = () => {
        if (rk_c61.value != undefined) {

        }

        if (keyboard.state.ConnectionStatus != ConnectionStatusEnum.Connected) {
            keyboard.removeEventListener("connection", connectionEventCallback);
            isInited.value = false;
            rk_c61.value = undefined;
        }
    };

    const clickProfile = async (item: Profile) => {
        if (rk_c61.value != undefined) {
            rk_c61.value.data.performanceData = item.performanceData;
            rk_c61.value.data.lightSetting = item.lightSetting;
            rk_c61.value.data.keyInfoData.globalTouchTravel = item.performanceData.globalTouchTravel;
            rk_c61.value.data.keyInfoData.maxTouchTravel =item.performanceData.maxTouchTravel;
            for (let row = 0; row < item.keyInfoArray.length; row++) {
                for (let col = 0; col < item.keyInfoArray[row].length; col++) {
                    rk_c61.value.data.keyInfoData.updateKeyInfo(row, col, item.keyInfoArray[row][col]);
                }
            }

            await rk_c61.value.cmd(OrderTypeEnum.SwitchProfile, item.index);
        }

        state.proflies.curIndex = item.index;
        profile.value = item;
        state.proflies.save();
    }

    const newProfile = async () => {

    }

    const renameProfile = async (item: Profile) => {

    }

    const deleteProfile = async (item: Profile) => {

    }

    const exportProfile = async (item: Profile) => {

    }

    const handleEditClose = async () => {

    }

    const renameSaveProfile = async () => {

    }

    return { profile, state, init, clickProfile, newProfile, renameProfile, deleteProfile, exportProfile, handleEditClose, renameSaveProfile }
});