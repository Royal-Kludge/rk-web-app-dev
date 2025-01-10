import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { mouse } from '@/mouse/mouse'
import { RK_K3, RK_K3_EVENT_DEFINE } from '@/mouse/rk_k3/rk_k3';
import { ConnectionEventEnum, ConnectionStatusEnum, ConnectionType } from '@/device/enum'
import { Profile, ps } from '@/mouse/rk_k3/profiles';
import fileSaver from "file-saver";
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n';

export const useKeyStore = defineStore('keyinfo_rk_k3', () => {
    const rk_k3 = ref<RK_K3>();
    const connectType = ref<ConnectionType>()
    const isInited = ref(false);
    const profile = ref<Profile>();
    const { t } = useI18n();

    const state = reactive({
        nameEditorDisplay: false,
        profiles: ps,
        profileList: [],
        name: '',
        isNewProfile: false,
    });

    const init = async () => {
        connectType.value = mouse.state.connectType;
        if (rk_k3.value == undefined) {
            rk_k3.value = (mouse.protocol as RK_K3);
            mouse.addEventListener("connection", connectionEventCallback);
        }
    };

    const connectionEventCallback = async (event: Event) => {
        switch (mouse.state.connectionEvent) {
            case ConnectionEventEnum.Disconnect:
            case ConnectionEventEnum.Close:
                destroy();
                break;
        }
    };

    const destroy = () => {
        if (mouse.state.ConnectionStatus != ConnectionStatusEnum.Connected) {
            mouse.removeEventListener("connection", connectionEventCallback);
            isInited.value = false;
        }
    };

    const clickProfile = async (obj: Profile) => {

    }

    const importProfile = (str: any) => {
        try {
            var p: Profile = JSON.parse(str);
            if (p.name == undefined) {
                ElMessage.error('Error parsing JSON data')
            }
            else {
                let tm = new Profile(p.name)
                tm.layers = p.layers
                tm.profile = p.profile
                tm.ledEffect = p.ledEffect
                tm.ledColors = p.ledColors
                profile.value = tm;
                ps.add(profile.value);
                saveProfile()
            }
            // 成功解析后的代码
        } catch (e) {
            // 解析出错时的代码
            ElMessage.error('Error parsing JSON data')
        }
    }

    const saveProfile = () => {
        ps.save()
    }
    const renameProfile = (obj: Profile) => {
        profile.value = obj;
        state.name = obj.name;
        state.nameEditorDisplay = true;
    };
    const deleteProfile = (obj: Profile) => {
        ps.remove(obj);
        if (ps.get().length > 0) {
            profile.value = ps.get()[0];
        } else {
            profile.value = undefined;
        }
        saveProfile();
    };

    const exportProfile = (obj: Profile) => {
        let blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
        fileSaver.saveAs(blob, `${obj.name}.rk`);
    };
    const handleEditClose = (done: () => void) => {
        done();
        state.isNewProfile = false
    };
    const renameSaveProfile = () => {
        if (profile.value != undefined) {
            profile.value.name = state.name;
            if (state.isNewProfile = true) {
                ps.add(profile.value);
            }
        }
        saveProfile();
        state.nameEditorDisplay = false
        state.isNewProfile = false
    };
    const newProfile = () => {
        let tm = new Profile(`${t("Profile.namePrefix")} ${ps.get().length + 1}`);

        state.name = tm.name;
        state.isNewProfile = true;
        renameProfile(tm)
    };
    return { connectType, profile, state, init, destroy, clickProfile, importProfile, renameProfile, deleteProfile, exportProfile, handleEditClose, renameSaveProfile, newProfile }
})