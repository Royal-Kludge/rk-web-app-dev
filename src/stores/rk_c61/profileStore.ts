import { Profiles, type Profile } from "@/keyboard/sparklink/profiles";
import { defineStore } from "pinia";
import { reactive, ref } from 'vue';

export const useProfileStore = defineStore('profileStore_rk_c61', () => {

    const profile = ref<Profile>();
    const ps = ref<Profiles>();

    const state = reactive({
        name: '',
        nameEditorDisplay: false,
        profileList: []
    })

    const init = async () => {

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

    return { profile, state, init, newProfile, renameProfile, deleteProfile, exportProfile, handleEditClose, renameSaveProfile }
});