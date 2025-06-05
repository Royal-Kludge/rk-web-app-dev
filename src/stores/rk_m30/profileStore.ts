import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import fileSaver from "file-saver";
import { ElMessage } from 'element-plus'
import { mouse } from '@/mouse/beiying/mouse'
import { RK_M30 } from '@/mouse/beiying/rk_m30/rk_m30';
import { ConfigTable } from "@/mouse/beiying/rk_m30/configTable";
import { KeyTable } from "@/mouse/beiying/rk_m30/keyTable";
import { Profile, ps } from '@/mouse/beiying/rk_m30/profiles';
import { ConnectionStatusEnum } from "@/device/enum";

export const useProfileStore = defineStore('profile_rk_m30', () => {
    const rk_m30 = ref<RK_M30>();
    const isInited = ref(false);
    const profile = ref<Profile>();
    const { t } = useI18n();

    const state = reactive({
        nameEditorDisplay: false,
        profileList: [],
        name: '',
        isNewProfile: false,
        isSideKeyEnable: true
    });

    const init = async () => {
        if (rk_m30.value == undefined || (rk_m30.value != undefined && rk_m30.value.data.isDestroy)) {
            rk_m30.value = (mouse.protocol as RK_M30);
            getProfiles();
        }
    };

    const destroy = () => {
        if (mouse.state.ConnectionStatus != ConnectionStatusEnum.Connected) {
            rk_m30.value = undefined
            isInited.value = false;
        }
    };

    const getProfiles = () => {
            ps.init(t("Profile.default"));
            if (ps.curIndex == undefined) ps.curIndex = 0;
            profile.value = ps.get()[ps.curIndex];
            setProfiles();
    };

    const setProfiles = () => {
        if (rk_m30.value != undefined && profile.value != undefined) {
            if (profile.value.keyLayout)
                if (profile.value.keyTable != undefined) {
                    if (rk_m30.value.data.keys != undefined) {
                        rk_m30.value.data.keys.buffer = new DataView(profile.value.keyTable.buffer);
                    } else {
                        rk_m30.value.data.keys = new KeyTable(new DataView(profile.value.keyTable.buffer));
                    }
                }

            if (profile.value.keyLayout != undefined && rk_m30.value.data.keys != undefined) {
                rk_m30.value.data.keys.keyLayout = profile.value.keyLayout;
            }

            if (profile.value.configTable != undefined) {
                if (rk_m30.value.data.config != undefined) {
                    rk_m30.value.data.config.buffer = new DataView(profile.value.configTable.buffer);
                } else {
                    rk_m30.value.data.config = new ConfigTable(new DataView(profile.value.configTable.buffer));
                }
            }

            if (profile.value.leftSideKey != undefined) {
                rk_m30.value.data.leftSideKey = profile.value.leftSideKey;
            }

            refresh();
        }
    };

    const refresh = () => {
        if (state.profileList.length > 0) {
            state.profileList.splice(0, state.profileList.length);
        }

        let i: number
        for (i = 0; i < ps.list.length; i++) {
            (state.profileList as Array<Profile>).push(ps.list[i]);
        }

        if (profile.value != undefined && profile.value.leftSideKey != undefined) {
            state.isSideKeyEnable = profile.value.leftSideKey.isEnable;
        }
    };

    const clickProfile = async (obj: Profile) => {
        profile.value = ps.find(obj);
        setProfiles();
    };

    const importProfile = (str: any) => {
        try {
            var p: Profile = JSON.parse(str);
            if (p.name == undefined) {
                ElMessage.error('Error parsing JSON data')
            }
            else {
                let tm = new Profile(p.name);
                tm.configTable = p.configTable;
                tm.keyTable = p.keyTable;
                profile.value = tm;
                ps.add(profile.value);
                saveProfile()
            }
            // 成功解析后的代码
        } catch (e) {
            // 解析出错时的代码
            ElMessage.error('Error parsing JSON data')
        }
    };

    const saveProfile = () => {
        ps.save()
    };

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
        refresh();
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
        setProfiles();
        state.nameEditorDisplay = false
        state.isNewProfile = false
    };

    const newProfile = () => {
        let tm = new Profile(`${t("Profile.namePrefix")} ${ps.get().length + 1}`);

        state.name = tm.name;
        state.isNewProfile = true;
        renameProfile(tm);
        //clickProfile(tm);
    };

    return { profile, state, init, destroy, clickProfile, importProfile, renameProfile, deleteProfile, exportProfile, handleEditClose, renameSaveProfile, newProfile, saveProfile };
});