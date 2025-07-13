import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";
import { keyboard } from "@/keyboard/sparklink/keyboard";
import { RK_C61, RK_C61_EVENT_DEFINE } from "@/keyboard/sparklink/rk_c61/rk_c61";
import { KeyCodeEnum, KeyDefineEnum, KeyText, KeyText_Mac } from "@/common/keyCode_sparklink";
import { type KeyState, type KeyLine, type KeyInfo, type KeyCmdValue } from "@/keyboard/sparklink/interface";
import { AdvKeyTypeEnum, KeyMatrixLayer, LayoutTypeEnum, MatrixTable, OrderTypeEnum } from "@/keyboard/sparklink/enum";
import { Profile, ps } from "@/keyboard/sparklink/profiles";
import { Action, Macro, Macros } from "@/keyboard/sparklink/macros";
import { ConnectionEventEnum, ConnectionStatusEnum } from "@/device/enum";
import { KeyCodeMap } from "@/common/keyCode";
import { KeyMappingType } from "@/keyboard/sparklink/enum";
import { storage } from "@/common/storage";
import fileSaver from "file-saver";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import type { KeyTableData } from "@/keyboard/sparklink/keyTableData";
import { LOG_TYPE, Logging } from "@/common/logging";

export const useKeyStore = defineStore("keyinfo_rk_c61", () => {
    const rk_c61 = ref<RK_C61>();

    const { t } = useI18n();
    const macros = ref<Macros>();
    const macro = ref<Macro>();
    const profile = ref<Profile>();
    const keyState = ref<KeyState>();
    const keyMatrixLayer = ref<KeyMatrixLayer>(KeyMatrixLayer.FN0);
    const keyMatrixTable = ref<MatrixTable>(MatrixTable.WIN);

    const getKeyData = (index: number): KeyTableData | undefined => {
        let keyData = undefined;
        // let layer = KeyMatrixLayer.FN0;
        // let table = MatrixTable.WIN;
        // if (keyMatrixLayer.value != undefined) {
        //   layer = keyMatrixLayer.value;
        // }
        // if (keyMatrixTable.value != undefined) {
        //   table = keyMatrixTable.value;
        // }
        // if (layer in keyboard.state.keyTableData && index < keyboard.state.keyTableData[table][layer].length) {
        //   keyData = keyboard.state.keyTableData[table][layer][index];
        // }

        if (index <= keyboard.state.keyTableData.length) {
            keyData = keyboard.state.keyTableData[index];
        }

        return keyData;
    };

    const getIndex = (row: number, col: number) => {
        return row * 21 + col;
    };

    const getDefaultKeyInfo = (index: number): KeyInfo | null => {
        let ret = null;
        let row = Math.floor(index / 21);
        let col = index % 21;
        let keyInfo = keyboard.keyboardDefine?.keyLayout[row][col];
        if (keyInfo != undefined) ret = keyInfo;
        return ret;
    };

    const keyMatrix_us = [
        {
            line: 1,
            style: "space-t",
            keys: [
                { key: KeyDefineEnum.KEY_ESC, style: "key", index: getIndex(1, 0), keyData: getKeyData(getIndex(1, 0)) },
                { key: KeyDefineEnum.KEY_1, style: "key", index: getIndex(1, 1), keyData: getKeyData(getIndex(1, 1)) },
                { key: KeyDefineEnum.KEY_2, style: "key", index: getIndex(1, 2), keyData: getKeyData(getIndex(1, 2)) },
                { key: KeyDefineEnum.KEY_3, style: "key", index: getIndex(1, 3), keyData: getKeyData(getIndex(1, 3)) },
                { key: KeyDefineEnum.KEY_4, style: "key", index: getIndex(1, 4), keyData: getKeyData(getIndex(1, 4)) },
                { key: KeyDefineEnum.KEY_5, style: "key", index: getIndex(1, 5), keyData: getKeyData(getIndex(1, 5)) },
                { key: KeyDefineEnum.KEY_6, style: "key", index: getIndex(1, 6), keyData: getKeyData(getIndex(1, 6)) },
                { key: KeyDefineEnum.KEY_7, style: "key", index: getIndex(1, 7), keyData: getKeyData(getIndex(1, 7)) },
                { key: KeyDefineEnum.KEY_8, style: "key", index: getIndex(1, 8), keyData: getKeyData(getIndex(1, 8)) },
                { key: KeyDefineEnum.KEY_9, style: "key", index: getIndex(1, 9), keyData: getKeyData(getIndex(1, 9)) },
                { key: KeyDefineEnum.KEY_0, style: "key", index: getIndex(1, 10), keyData: getKeyData(getIndex(1, 10)) },
                { key: KeyDefineEnum.KEY_Underscore, style: "key", index: getIndex(1, 11), keyData: getKeyData(getIndex(1, 11)) },
                { key: KeyDefineEnum.KEY_EqualSign, style: "key", index: getIndex(1, 12), keyData: getKeyData(getIndex(1, 12)) },
                { key: KeyDefineEnum.KEY_Backspace, style: "key key2", index: getIndex(1, 13), keyData: getKeyData(getIndex(1, 13)) },
            ],
        },
        {
            line: 2,
            style: "",
            keys: [
                { key: KeyDefineEnum.KEY_TAB, style: "key key3", index: getIndex(2, 0), keyData: getKeyData(getIndex(2, 0)) },
                { key: KeyDefineEnum.KEY_Q, style: "key", index: getIndex(2, 1), keyData: getKeyData(getIndex(2, 1)) },
                { key: KeyDefineEnum.KEY_W, style: "key", index: getIndex(2, 2), keyData: getKeyData(getIndex(2, 2)) },
                { key: KeyDefineEnum.KEY_E, style: "key", index: getIndex(2, 3), keyData: getKeyData(getIndex(2, 3)) },
                { key: KeyDefineEnum.KEY_R, style: "key", index: getIndex(2, 4), keyData: getKeyData(getIndex(2, 4)) },
                { key: KeyDefineEnum.KEY_T, style: "key", index: getIndex(2, 5), keyData: getKeyData(getIndex(2, 5)) },
                { key: KeyDefineEnum.KEY_Y, style: "key", index: getIndex(2, 6), keyData: getKeyData(getIndex(2, 6)) },
                { key: KeyDefineEnum.KEY_U, style: "key", index: getIndex(2, 7), keyData: getKeyData(getIndex(2, 7)) },
                { key: KeyDefineEnum.KEY_I, style: "key", index: getIndex(2, 8), keyData: getKeyData(getIndex(2, 8)) },
                { key: KeyDefineEnum.KEY_O, style: "key", index: getIndex(2, 9), keyData: getKeyData(getIndex(2, 9)) },
                { key: KeyDefineEnum.KEY_P, style: "key", index: getIndex(2, 10), keyData: getKeyData(getIndex(2, 10)) },
                { key: KeyDefineEnum.KEY_L_Brackets, style: "key", index: getIndex(2, 11), keyData: getKeyData(getIndex(2, 11)) },
                { key: KeyDefineEnum.KEY_R_Brackets, style: "key", index: getIndex(2, 12), keyData: getKeyData(getIndex(2, 12)) },
                { key: KeyDefineEnum.KEY_CODE29, style: "key key3", index: getIndex(2, 13), keyData: getKeyData(getIndex(2, 13)) },
            ],
        },
        {
            line: 3,
            style: "",
            keys: [
                { key: KeyDefineEnum.KEY_CAPSLOCK, style: "key key2", index: getIndex(3, 0), keyData: getKeyData(getIndex(3, 0)) },
                { key: KeyDefineEnum.KEY_A, style: "key", index: getIndex(3, 1), keyData: getKeyData(getIndex(3, 1)) },
                { key: KeyDefineEnum.KEY_S, style: "key", index: getIndex(3, 2), keyData: getKeyData(getIndex(3, 2)) },
                { key: KeyDefineEnum.KEY_D, style: "key", index: getIndex(3, 3), keyData: getKeyData(getIndex(3, 3)) },
                { key: KeyDefineEnum.KEY_F, style: "key", index: getIndex(3, 4), keyData: getKeyData(getIndex(3, 4)) },
                { key: KeyDefineEnum.KEY_G, style: "key", index: getIndex(3, 5), keyData: getKeyData(getIndex(3, 5)) },
                { key: KeyDefineEnum.KEY_H, style: "key", index: getIndex(3, 6), keyData: getKeyData(getIndex(3, 6)) },
                { key: KeyDefineEnum.KEY_J, style: "key", index: getIndex(3, 7), keyData: getKeyData(getIndex(3, 7)) },
                { key: KeyDefineEnum.KEY_K, style: "key", index: getIndex(3, 8), keyData: getKeyData(getIndex(3, 8)) },
                { key: KeyDefineEnum.KEY_L, style: "key", index: getIndex(3, 9), keyData: getKeyData(getIndex(3, 9)) },
                { key: KeyDefineEnum.KEY_Semicolon, style: "key", index: getIndex(3, 10), keyData: getKeyData(getIndex(3, 10)) },
                { key: KeyDefineEnum.KEY_Quotation, style: "key", index: getIndex(3, 11), keyData: getKeyData(getIndex(3, 11)) },
                { key: KeyDefineEnum.KEY_ENTER, style: "key key2", index: getIndex(3, 13), keyData: getKeyData(getIndex(3, 13)) },
            ],
        },
        {
            line: 4,
            style: "",
            keys: [
                { key: KeyDefineEnum.SHIFT_L, style: "key key4", index: getIndex(4, 0), keyData: getKeyData(getIndex(4, 0)) },
                { key: KeyDefineEnum.KEY_Z, style: "key", index: getIndex(4, 2), keyData: getKeyData(getIndex(4, 2)) },
                { key: KeyDefineEnum.KEY_X, style: "key", index: getIndex(4, 3), keyData: getKeyData(getIndex(4, 3)) },
                { key: KeyDefineEnum.KEY_C, style: "key", index: getIndex(4, 4), keyData: getKeyData(getIndex(4, 4)) },
                { key: KeyDefineEnum.KEY_V, style: "key", index: getIndex(4, 5), keyData: getKeyData(getIndex(4, 5)) },
                { key: KeyDefineEnum.KEY_B, style: "key", index: getIndex(4, 6), keyData: getKeyData(getIndex(4, 6)) },
                { key: KeyDefineEnum.KEY_N, style: "key", index: getIndex(4, 7), keyData: getKeyData(getIndex(4, 7)) },
                { key: KeyDefineEnum.KEY_M, style: "key", index: getIndex(4, 8), keyData: getKeyData(getIndex(4, 8)) },
                { key: KeyDefineEnum.KEY_COMMA, style: "key", index: getIndex(4, 9), keyData: getKeyData(getIndex(4, 9)) },
                { key: KeyDefineEnum.KEY_PERIOD, style: "key", index: getIndex(4, 10), keyData: getKeyData(getIndex(4, 10)) },
                { key: KeyDefineEnum.KEY_Interrogation, style: "key", index: getIndex(4, 11), keyData: getKeyData(getIndex(4, 11)) },
                { key: KeyDefineEnum.SHIFT_R, style: "key key4", index: getIndex(4, 13), keyData: getKeyData(getIndex(4, 13)) },
            ],
        },
        {
            line: 5,
            style: "",
            keys: [
                { key: KeyDefineEnum.CTRL_L, style: "key key6", index: getIndex(5, 0), keyData: getKeyData(getIndex(5, 0)) },
                { key: KeyDefineEnum.WIN_L, style: "key key6", index: getIndex(5, 1), keyData: getKeyData(getIndex(5, 1)) },
                { key: KeyDefineEnum.ALT_L, style: "key key6", index: getIndex(5, 2), keyData: getKeyData(getIndex(5, 2)) },
                { key: KeyDefineEnum.KEY_SPACEBAR, style: "key key5", index: getIndex(5, 6), keyData: getKeyData(getIndex(5, 6)) },
                { key: KeyDefineEnum.ALT_R, style: "key key6", index: getIndex(5, 9), keyData: getKeyData(getIndex(5, 9)) },
                { key: KeyDefineEnum.KEY_APP, style: "key key6", index: getIndex(5, 10), keyData: getKeyData(getIndex(5, 10)) },
                { key: KeyDefineEnum.CTRL_R, style: "key key6", index: getIndex(5, 11), keyData: getKeyData(getIndex(5, 11)) },
                { key: KeyDefineEnum.SPARKLINK_FN, style: "key key6", index: getIndex(5, 12), keyData: getKeyData(getIndex(5, 12)) },
            ],
        },
    ];

    const state = reactive({
        funid: 1,
        funMenuList: [
            { id: 1, title: "key.key_1", style: "" },
            { id: 2, title: "key.key_2", style: "" },
            //{ id: 3, title: "key.key_3", style: "" },
            { id: 4, title: "key.key_4", style: "" },
            { id: 5, title: "key.key_5", style: "" },
            { id: 6, title: "key.key_6", style: "" },
            { id: 7, title: "key.key_7", style: "" },
        ],
        name: "",
        nameEditorDisplay: false,
        isNewProfile: false,
        profiles: ps,
        profileList: [],
        //MatrixLayer: keyMatrixLayer.value,
        MatrixLayers: [
            { value: KeyMatrixLayer.FN0, label: "key.layer_1" },
            { value: KeyMatrixLayer.FN1, label: "key.layer_2" },
            { value: KeyMatrixLayer.FN2, label: "key.layer_3" },
        ],
        MatrixTable: [
            { value: MatrixTable.WIN, label: "win", img: "/src/assets/images/win.png" },
            { value: MatrixTable.MAC, label: "mac", img: "/src/assets/images/mac.png" },
        ],
        //keyFunState: [] as any,
        keyState: [],
        keyFunList: [
            {
                id: 1,
                style: "",
                keys: [
                    { key: KeyDefineEnum.KEY_1, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_1], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_2, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_2], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_3, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_3], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_4, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_4], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_5, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_5], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_6, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_6], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_7, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_7], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_8, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_8], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_9, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_9], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_0, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_0], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_UpArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_UpArrow], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_DownArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_DownArrow], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_LeftArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_LeftArrow], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_RightArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_RightArrow], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_A, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_A], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_B, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_B], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_C, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_C], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_D, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_D], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_E, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_E], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_F, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_G, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_G], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_H, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_H], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_I, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_I], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_K, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_K], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_L, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_L], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_M, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_M], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_N, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_N], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_O, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_O], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_P, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_P], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_Q, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Q], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_R, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_R], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_S, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_S], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_T, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_T], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_U, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_U], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_V, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_V], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_W, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_W], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_X, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_X], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_Y, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Y], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_Z, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Z], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_Underscore, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Underscore], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_EqualSign, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_EqualSign], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_L_Brackets, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_L_Brackets], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_R_Brackets, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_R_Brackets], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_CODE29, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_CODE29], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_Semicolon, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Semicolon], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_Quotation, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Quotation], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_TILDE, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_TILDE], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_COMMA, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_COMMA], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_PERIOD, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PERIOD], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_Interrogation, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Interrogation], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_F1, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F1], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_F2, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F2], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_F3, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F3], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_F4, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F4], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_F5, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F5], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_F6, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F6], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_F7, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F7], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_F8, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F8], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_F9, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F9], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_F10, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F10], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_F11, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F11], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_F12, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F12], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_ESC, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_ESC], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_TAB, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_TAB], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_INS, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_INS], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_PAUSE, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PAUSE], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_SPACEBAR, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_SPACEBAR], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_HOME, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_HOME], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_END, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_END], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_DEL, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_DEL], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_SCRLOCK, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_SCRLOCK], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_PGDN, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PGDN], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_PGUP, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PGUP], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_CAPSLOCK, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_CAPSLOCK], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_Backspace, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Backspace], style: "key key2", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_PRINT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PRINT], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NUM_1, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_1], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NUM_2, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_2], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NUM_3, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_3], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NUM_4, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_4], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NUM_5, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_5], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NUM_6, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_6], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NUM_7, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_7], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NUM_8, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_8], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NUM_9, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_9], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NUM_0, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_0], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NUM_PLUS, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_PLUS], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NUM_MINUS, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_MINUS], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NUM_MUL, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_MUL], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NUM_DIV, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_DIV], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NUM_DOT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_DOT], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NUMLOCK, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUMLOCK], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NUM_ENTER, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_ENTER], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.CTRL_L, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.CTRL_L], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.SHIFT_L, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.SHIFT_L], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.ALT_L, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.ALT_L], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.WIN_L, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.WIN_L], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.CTRL_R, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.CTRL_R], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.SHIFT_R, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.SHIFT_R], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.ALT_R, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.ALT_R], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.WIN_R, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.WIN_R], style: "key key1", selected: false, tip: "", type: MatrixTable.WIN },
                ],
            },
            {
                id: 2,
                style: "",
                keys: [
                    { key: KeyDefineEnum.KEY_VolumI, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_VolumI], style: "key", selected: false, tip: "tip.volumI", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_VolumD, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_VolumD], style: "key", selected: false, tip: "tip.volumD", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_Mute, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Mute], style: "key", selected: false, tip: "tip.mute", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_PlayPause, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PlayPause], style: "key", selected: false, tip: "tip.paly", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_Stop, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Stop], style: "key", selected: false, tip: "tip.stop", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_PrevTr, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PrevTr], style: "key", selected: false, tip: "tip.prevTr", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_NextTr, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NextTr], style: "key", selected: false, tip: "tip.nextTr", type: MatrixTable.WIN },
                    //{ key: KeyDefineEnum.KEY_Back, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Back], style: "key", selected: false },
                    //{ key: KeyDefineEnum.KEY_Forward, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Forward], style: "key", selected: false },
                ],
            },
            {
                id: 4,
                style: "",
                keys: [
                    { key: KeyDefineEnum.KEY_Fn_01, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Fn_01], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_Fn_02, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Fn_02], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_Fn_03, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Fn_03], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_CODE131, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_CODE131], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_CODE132, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_CODE132], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_CODE133, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_CODE133], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_CODE14, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_CODE14], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                ],
            },
            {
                id: 5,
                style: "",
                keys: [
                    // { key: KeyDefineEnum.KEY_Tilde, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Tilde], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_Exclamation, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Exclamation], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_AtSign, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_AtSign], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_Sharp, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Sharp], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_Dollar, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Dollar], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_Percent, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Percent], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_Circumflex, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Circumflex], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_Ampersand, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Ampersand], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_Asterisk, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Asterisk], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_LeftParenthesis, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_LeftParenthesis], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_RightParenthesis, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_RightParenthesis], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_Underscore2, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Underscore2], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_Plus, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Plus], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_LeftBrace, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_LeftBrace], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_RightBrace, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_RightBrace], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_Pipe, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Pipe], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_Colon, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Colon], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_DoubleQuote, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_DoubleQuote], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_LessSign, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_LessSign], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_GreaterSign, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_GreaterSign], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    // { key: KeyDefineEnum.KEY_Question, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Question], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
                    //{ key: KeyDefineEnum.KEY_Power, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Power], style: "key", selected: false, tip: 'tip.power', type: MatrixTable.WIN },
                    //{ key: KeyDefineEnum.KEY_Sleep, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Sleep], style: "key", selected: false, tip: 'tip.sleep', type: MatrixTable.WIN },
                    //{ key: KeyDefineEnum.KEY_Calculator, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Calculator], style: "key", selected: false, tip: "tip.calc", type: MatrixTable.WIN },
                    //{ key: KeyDefineEnum.KEY_Email, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Email], style: "key", selected: false, tip: "tip.mail", type: MatrixTable.WIN },
                    //{ key: KeyDefineEnum.KEY_MyComputer, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_MyComputer], style: "key", selected: false, tip: "tip.computer", type: MatrixTable.WIN },
                    //{ key: KeyDefineEnum.KEY_Back, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Back], style: "key", selected: false, tip: "tip.back", type: MatrixTable.WIN },
                    //{ key: KeyDefineEnum.KEY_Forward, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Forward], style: "key", selected: false, tip: "tip.forward", type: MatrixTable.WIN },
                    //{ key: KeyDefineEnum.KEY_iStop, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_iStop], style: "key", selected: false, tip: "tip.istop", type: MatrixTable.WIN },
                    //{ key: KeyDefineEnum.KEY_Refresh, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Refresh], style: "key", selected: false, tip: "tip.refresh", type: MatrixTable.WIN },
                    //{ key: KeyDefineEnum.KEY_Favorites, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Favorites], style: "key", selected: false, tip: "tip.favorites", type: MatrixTable.WIN },
                    { key: KeyDefineEnum.KEY_Search, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Search], style: "key", selected: false, tip: "tip.search", type: MatrixTable.WIN },
                    //{ key: KeyDefineEnum.SP_BatView, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.SP_BatView], style: "key", selected: false, tip: 'tip.bat', type: MatrixTable.WIN },
                ],
            },
            // {
            //     id: 6,
            //     style: "",
            //     keys: [
            //         { key: KeyDefineEnum.KEY_LED_MODE0, text: ["light.menu_0"], style: "key", selected: false, tip: "tip.ligthoff", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_MODE1, text: ["light.menu_1"], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_MODE2, text: ["light.menu_2"], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_MODE3, text: ["light.menu_3"], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_MODE4, text: ["light.menu_4"], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_MODE5, text: ["light.menu_5"], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_MODE6, text: ["light.menu_6"], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_MODE7, text: ["light.menu_7"], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_MODE8, text: ["light.menu_8"], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_MODE9, text: ["light.menu_9"], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_MODE10, text: ["light.menu_10"], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_MODE11, text: ["light.menu_11"], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_MODE12, text: ["light.menu_12"], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_MODE13, text: ["light.menu_13"], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_MODE17, text: ["light.menu_17"], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_MODE18, text: ["light.menu_18"], style: "key", selected: false, tip: "", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_LUMINI, text: ["light.fun_1"], style: "key", selected: false, tip: "tip.brightI", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_LUMIND, text: ["light.fun_2"], style: "key", selected: false, tip: "tip.brightD", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_BREATHI, text: ["light.fun_3"], style: "key", selected: false, tip: "tip.speedI", type: MatrixTable.WIN },
            //         { key: KeyDefineEnum.KEY_LED_BREATHD, text: ["light.fun_4"], style: "key", selected: false, tip: "tip.speedD", type: MatrixTable.WIN },
            //     ],
            // },
            // {
            //     id: 7,
            //     style: "",
            //     keys: [
            //         { key: KeyDefineEnum.KEY_SysBkBrigthDec, text: [`<img class="keyimg" src="/src/assets/images/mac/brightness_d.png" />`], style: "key", selected: false, tip: "key.tip33", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_SysBkBrigthInc, text: [`<img class="keyimg keyimg1" src="/src/assets/images/mac/brightness_i.png" />`], style: "key", selected: false, tip: "key.tip34", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.MAC_F3, text: [`<img class="keyimg" src="/src/assets/images/mac/mission.png" />`], style: "key", selected: false, tip: "key.tip35", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.MAC_F4, text: [`<img class="keyimg" src="/src/assets/images/mac/launchpad.png" />`], style: "key", selected: false, tip: "key.tip36", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_LED_LUMIND, text: [`<img class="keyimg" src="/src/assets/images/mac/backlight_d.png" />`], style: "key", selected: false, tip: "key.tip37", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_LED_LUMINI, text: [`<img class="keyimg keyimg1" src="/src/assets/images/mac/backlight_i.png" />`], style: "key", selected: false, tip: "key.tip38", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_L_WIN, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" />`], style: "key key1", selected: false, tip: "Command", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_L_ALT, text: [`<img class="keyimg" src="/src/assets/images/mac/option.png" />`], style: "key key1", selected: false, tip: "Option", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_L_CTRL, text: [`<img class="keyimg" src="/src/assets/images/mac/control.png" />`], style: "key key1", selected: false, tip: "Control", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_COM_X, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" /> + X`], style: "key", selected: false, tip: "key.tip2", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_COM_C, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" /> + C`], style: "key", selected: false, tip: "key.tip3", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_COM_V, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" /> + V`], style: "key", selected: false, tip: "key.tip4", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_COM_Z, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" /> + Z`], style: "key", selected: false, tip: "key.tip5", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_SHIFT_COM_Z, text: [`<img class="keyimg" src="/src/assets/images/mac/shift.png" /> + <img class="keyimg" src="/src/assets/images/mac/command.png" /> + Z`], style: "key", selected: false, tip: "key.tip6", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_COM_A, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" /> + A`], style: "key", selected: false, tip: "key.tip7", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_COM_F, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" /> + F`], style: "key", selected: false, tip: "key.tip8", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_COM_G, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" /> + G`], style: "key", selected: false, tip: "key.tip9", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_SHIFT_COM_G, text: [`<img class="keyimg" src="/src/assets/images/mac/shift.png" /> + <img class="keyimg" src="/src/assets/images/mac/command.png" /> + G`], style: "key", selected: false, tip: "key.tip10", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_COM_H, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" /> + H`], style: "key", selected: false, tip: "key.tip11", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_OPTION_COM_H, text: [`<img class="keyimg" src="/src/assets/images/mac/option.png" /> + <img class="keyimg" src="/src/assets/images/mac/command.png" /> + H`], style: "key", selected: false, tip: "key.tip12", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_COM_M, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" /> + M`], style: "key", selected: false, tip: "key.tip13", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_OPTION_COM_M, text: [`<img class="keyimg" src="/src/assets/images/mac/option.png" /> + <img class="keyimg" src="/src/assets/images/mac/command.png" /> + M`], style: "key", selected: false, tip: "key.tip14", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_COM_O, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" /> + O`], style: "key", selected: false, tip: "key.tip15", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_COM_P, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" /> + P`], style: "key", selected: false, tip: "key.tip16", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_COM_S, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" /> + S`], style: "key", selected: false, tip: "key.tip17", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_COM_T, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" /> + T`], style: "key", selected: false, tip: "key.tip18", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_COM_W, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" /> + W`], style: "key", selected: false, tip: "key.tip19", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_OPTION_COM_W, text: [`<img class="keyimg" src="/src/assets/images/mac/option.png" /> + <img class="keyimg" src="/src/assets/images/mac/command.png" /> + W`], style: "key", selected: false, tip: "key.tip20", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_OPTION_COM_ESC, text: [`<img class="keyimg" src="/src/assets/images/mac/option.png" /> + <img class="keyimg" src="/src/assets/images/mac/command.png" /> + ESC`], style: "key", selected: false, tip: "key.tip21", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_COM_SPACEBAR, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" /> + Space`], style: "key", selected: false, tip: "key.tip22", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_OPTION_COM_SPACEBAR, text: [`<img class="keyimg" src="/src/assets/images/mac/option.png" /> + <img class="keyimg" src="/src/assets/images/mac/command.png" /> + Space`], style: "key", selected: false, tip: "key.tip23", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_CTRL_COM_SPACEBAR, text: [`<img class="keyimg" src="/src/assets/images/mac/control.png" /> + <img class="keyimg" src="/src/assets/images/mac/command.png" /> + Space`], style: "key", selected: false, tip: "key.tip24", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_CTRL_COM_F, text: [`<img class="keyimg" src="/src/assets/images/mac/control.png" /> + <img class="keyimg" src="/src/assets/images/mac/command.png" /> + F`], style: "key", selected: false, tip: "key.tip25", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_SPACEBAR, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_SPACEBAR], style: "key key2", selected: false, tip: "key.tip26", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_COM_TAB, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" /> + TAB`], style: "key", selected: false, tip: "key.tip27", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_SHIFT_COM_5, text: [`<img class="keyimg" src="/src/assets/images/mac/shift.png" /> + <img class="keyimg" src="/src/assets/images/mac/command.png" /> + 5`], style: "key", selected: false, tip: "key.tip28", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_SHIFT_COM_3, text: [`<img class="keyimg" src="/src/assets/images/mac/shift.png" /> + <img class="keyimg" src="/src/assets/images/mac/command.png" /> + 3`], style: "key", selected: false, tip: "key.tip29", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_SHIFT_COM_4, text: [`<img class="keyimg" src="/src/assets/images/mac/shift.png" /> + <img class="keyimg" src="/src/assets/images/mac/command.png" /> + 4`], style: "key", selected: false, tip: "key.tip30", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_SHIFT_COM_N, text: [`<img class="keyimg" src="/src/assets/images/mac/shift.png" /> + <img class="keyimg" src="/src/assets/images/mac/command.png" /> + N`], style: "key", selected: false, tip: "key.tip31", type: MatrixTable.MAC },
            //         { key: KeyDefineEnum.KEY_COM_COMMA, text: [`<img class="keyimg" src="/src/assets/images/mac/command.png" /> + ,`], style: "key", selected: false, tip: "key.tip32", type: MatrixTable.MAC },
            //         //{ key: KeyDefineEnum.KEY_Fn1, text: `Fn(Mac)`, style: "key", selected: false, tip: '', type: MatrixTable.MAC },
            //     ],
            // },
        ],
        keyMatrix: [],
        keyCharacters: [
            { key: KeyDefineEnum.KEY_A, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_A] },
            { key: KeyDefineEnum.KEY_B, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_B] },
            { key: KeyDefineEnum.KEY_C, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_C] },
            { key: KeyDefineEnum.KEY_D, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_D] },
            { key: KeyDefineEnum.KEY_E, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_E] },
            { key: KeyDefineEnum.KEY_F, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F] },
            { key: KeyDefineEnum.KEY_G, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_G] },
            { key: KeyDefineEnum.KEY_H, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_H] },
            { key: KeyDefineEnum.KEY_I, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_I] },
            { key: KeyDefineEnum.KEY_K, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_K] },
            { key: KeyDefineEnum.KEY_L, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_L] },
            { key: KeyDefineEnum.KEY_M, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_M] },
            { key: KeyDefineEnum.KEY_N, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_N] },
            { key: KeyDefineEnum.KEY_O, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_O] },
            { key: KeyDefineEnum.KEY_P, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_P] },
            { key: KeyDefineEnum.KEY_Q, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Q] },
            { key: KeyDefineEnum.KEY_R, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_R] },
            { key: KeyDefineEnum.KEY_S, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_S] },
            { key: KeyDefineEnum.KEY_T, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_T] },
            { key: KeyDefineEnum.KEY_U, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_U] },
            { key: KeyDefineEnum.KEY_V, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_V] },
            { key: KeyDefineEnum.KEY_W, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_W] },
            { key: KeyDefineEnum.KEY_X, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_X] },
            { key: KeyDefineEnum.KEY_Y, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Y] },
            { key: KeyDefineEnum.KEY_Z, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Z] },
            { key: KeyDefineEnum.KEY_Underscore, text: "-" },
            { key: KeyDefineEnum.KEY_EqualSign, text: "=" },
            { key: KeyDefineEnum.KEY_L_Brackets, text: "[" },
            { key: KeyDefineEnum.KEY_R_Brackets, text: "]" },
            { key: KeyDefineEnum.KEY_CODE29, text: "\\" },
            { key: KeyDefineEnum.KEY_Semicolon, text: ";" },
            { key: KeyDefineEnum.KEY_Quotation, text: "'" },
            { key: KeyDefineEnum.KEY_TILDE, text: "`" },
            { key: KeyDefineEnum.KEY_COMMA, text: "," },
            { key: KeyDefineEnum.KEY_PERIOD, text: "." },
            { key: KeyDefineEnum.KEY_Interrogation, text: "/" },
        ],
        keyModifyLeft: [
            { key: KeyDefineEnum.CTRL_L, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.CTRL_L] },
            { key: KeyDefineEnum.SHIFT_L, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.SHIFT_L] },
            { key: KeyDefineEnum.ALT_L, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.ALT_L] },
            { key: KeyDefineEnum.WIN_L, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.WIN_L] },
        ],
        keyModifyRight: [
            { key: KeyDefineEnum.CTRL_R, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.CTRL_R] },
            { key: KeyDefineEnum.SHIFT_R, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.SHIFT_R] },
            { key: KeyDefineEnum.ALT_R, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.ALT_R] },
            { key: KeyDefineEnum.WIN_R, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.WIN_R] },
        ],
        keyArrow: [
            { key: KeyDefineEnum.KEY_UpArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_UpArrow] },
            { key: KeyDefineEnum.KEY_DownArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_DownArrow] },
            { key: KeyDefineEnum.KEY_LeftArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_LeftArrow] },
            { key: KeyDefineEnum.KEY_RightArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_RightArrow] },
        ],
        keyFunction: [
            { key: KeyDefineEnum.KEY_F1, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F1] },
            { key: KeyDefineEnum.KEY_F2, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F2] },
            { key: KeyDefineEnum.KEY_F3, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F3] },
            { key: KeyDefineEnum.KEY_F4, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F4] },
            { key: KeyDefineEnum.KEY_F5, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F5] },
            { key: KeyDefineEnum.KEY_F6, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F6] },
            { key: KeyDefineEnum.KEY_F7, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F7] },
            { key: KeyDefineEnum.KEY_F8, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F8] },
            { key: KeyDefineEnum.KEY_F9, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F9] },
            { key: KeyDefineEnum.KEY_F10, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F10] },
            { key: KeyDefineEnum.KEY_F11, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F11] },
            { key: KeyDefineEnum.KEY_F12, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F12] },
            { key: KeyDefineEnum.KEY_ESC, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_ESC] },
            { key: KeyDefineEnum.KEY_TAB, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_TAB] },
            { key: KeyDefineEnum.KEY_INS, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_INS] },
            { key: KeyDefineEnum.KEY_INS, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_INS] },
            { key: KeyDefineEnum.KEY_PAUSE, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PAUSE] },
            { key: KeyDefineEnum.KEY_SPACEBAR, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_SPACEBAR] },
            { key: KeyDefineEnum.KEY_HOME, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_HOME] },
            { key: KeyDefineEnum.KEY_END, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_END] },
            { key: KeyDefineEnum.KEY_DEL, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_DEL] },
            { key: KeyDefineEnum.KEY_SCRLOCK, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_SCRLOCK] },
            { key: KeyDefineEnum.KEY_PGDN, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PGDN] },
            { key: KeyDefineEnum.KEY_PGUP, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PGUP] },
            { key: KeyDefineEnum.KEY_CAPSLOCK, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_CAPSLOCK] },
            { key: KeyDefineEnum.KEY_Backspace, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Backspace] },
            { key: KeyDefineEnum.KEY_PRINT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PRINT] },
        ],
        keyNumboard: [
            { key: KeyDefineEnum.KEY_NUM_1, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_1] },
            { key: KeyDefineEnum.KEY_NUM_2, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_2] },
            { key: KeyDefineEnum.KEY_NUM_3, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_3] },
            { key: KeyDefineEnum.KEY_NUM_4, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_4] },
            { key: KeyDefineEnum.KEY_NUM_5, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_5] },
            { key: KeyDefineEnum.KEY_NUM_6, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_6] },
            { key: KeyDefineEnum.KEY_NUM_7, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_7] },
            { key: KeyDefineEnum.KEY_NUM_8, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_8] },
            { key: KeyDefineEnum.KEY_NUM_9, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_9] },
            { key: KeyDefineEnum.KEY_NUM_0, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_0] },
            { key: KeyDefineEnum.KEY_NUM_PLUS, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_PLUS] },
            { key: KeyDefineEnum.KEY_NUM_MINUS, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_MINUS] },
            { key: KeyDefineEnum.KEY_NUM_MUL, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_MUL] },
            { key: KeyDefineEnum.KEY_NUM_DIV, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_DIV] },
            { key: KeyDefineEnum.KEY_NUM_DOT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_DOT] },
            { key: KeyDefineEnum.KEY_NUMLOCK, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUMLOCK] },
            { key: KeyDefineEnum.KEY_NUM_ENTER, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_ENTER] },
        ],
        mediaKeyOptions: [
            { key: KeyDefineEnum.KEY_Media, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Media] },
            { key: KeyDefineEnum.KEY_NextTr, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NextTr] },
            { key: KeyDefineEnum.KEY_PrevTr, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PrevTr] },
            { key: KeyDefineEnum.KEY_Stop, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Stop] },
            { key: KeyDefineEnum.KEY_PlayPause, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PlayPause] },
            { key: KeyDefineEnum.KEY_Mute, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Mute] },
            { key: KeyDefineEnum.KEY_VolumI, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_VolumI] },
            { key: KeyDefineEnum.KEY_VolumD, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_VolumD] },
            { key: KeyDefineEnum.KEY_BrigthInc, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_BrigthInc] },
            { key: KeyDefineEnum.KEY_BrigthDec, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_BrigthDec] },
        ],
        shortcutsKeyOptions: [
            { key: KeyDefineEnum.KEY_MyComputer, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_MyComputer] },
            { key: KeyDefineEnum.KEY_Calculator, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Calculator] },
        ],
        macroDialogShow: false,
        combineKeyDialogShow: false,
        mediaKeyDialogShow: false,
        shortcutsKeyDialogShow: false,
        macros: macros,
        cycleTypes: [
            { value: 1, label: "Cycles", strKey: "key.type_1" },
            { value: 2, label: "Cycle to any key pressed", strKey: "key.type_2" },
            { value: 4, label: "Cycle to any key released", strKey: "key.type_3" },
        ],
        cycleType: 1,
        cycleCount: 1,
        keyStr: "",
        mediaKey: KeyDefineEnum.KEY_Media,
        shortcutsKey: KeyDefineEnum.KEY_MyComputer,
        keyHid: 0x00,
        shiftKey: false,
        ctrlKey: false,
        winKey: false,
        altKey: false,
    });

    const WASD = [getIndex(2, 2), getIndex(3, 1), getIndex(3, 2), getIndex(3, 3)];
    const DIGIT = [getIndex(1, 1), getIndex(1, 2), getIndex(1, 3), getIndex(1, 4), getIndex(1, 5), getIndex(1, 6), getIndex(1, 7), getIndex(1, 8), getIndex(1, 9), getIndex(1, 10)];
    const LETTER = [getIndex(2, 1),
                    getIndex(2, 2),
                    getIndex(2, 3),
                    getIndex(2, 4),
                    getIndex(2, 5),
                    getIndex(2, 6),
                    getIndex(2, 7),
                    getIndex(2, 8),
                    getIndex(2, 9),
                    getIndex(2, 10),
                    getIndex(3, 1),
                    getIndex(3, 2),
                    getIndex(3, 3),
                    getIndex(3, 4),
                    getIndex(3, 5),
                    getIndex(3, 6),
                    getIndex(3, 7),
                    getIndex(3, 8),
                    getIndex(3, 9),
                    getIndex(4, 2),
                    getIndex(4, 3),
                    getIndex(4, 4),
                    getIndex(4, 5),
                    getIndex(4, 6),
                    getIndex(4, 7),
                    getIndex(4, 8)];

    const isAnyKeyChecked = (): boolean => {
        if (rk_c61.value != undefined) {
            return rk_c61.value.data.keyInfoData.getKeyCheckedCount() > 0;
        }

        return false;
    };

    const isInited = ref(false);

    const setFunid = (id: number) => {
        state.funid = id;
        let keyCode = getSelectedFun();
        if (keyCode != undefined) {
            setUnselected(keyCode);
        }
    };

    const init = async () => {
        if (keyboard.keyboardDefine != undefined) {
            state.keyMatrix.splice(0, state.keyMatrix.length);

            let tmp: Array<KeyLine> | undefined = undefined;

            switch (keyboard.keyboardDefine.name) {
                case "RK-C61":
                    tmp = keyMatrix_us;
                    break;
            }

            if (tmp != undefined) {
                let index: number = 0;
                for (index = 0; index < tmp.length; index++) {
                    (state.keyMatrix as Array<KeyLine>).push(tmp[index]);
                }
            }
        }

        if (rk_c61.value == undefined) {
            rk_c61.value = keyboard.protocol as RK_C61;
            let index: any;
            if (state.keyState.length > 0) {
                state.keyState.splice(0, state.keyState.length);
            }
            for (index in keyboard.state.keyTableData) {
                (state.keyState as Array<KeyState>).push({
                    selected: false,
                    isHover: false,
                    index: Number(index),
                    keyData: keyboard.state.keyTableData[Number(index)],
                });
            }

            keyboard.addEventListener("connection", connectionEventCallback);
        }

        if (rk_c61.value != undefined && !isInited.value) {
            isInited.value = true;
        }
    };

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
            //rk_c61.value.removeEventListener(RK_C61_EVENT_DEFINE.OnKeyMatrixGotten, keyMatrixGotten, false);
        }

        if (keyboard.state.ConnectionStatus != ConnectionStatusEnum.Connected) {
            keyboard.removeEventListener("connection", connectionEventCallback);
            isInited.value = false;
            rk_c61.value = undefined;
        }
    };

    const refresh = () => {
        let line, key: any;
        for (line in state.keyMatrix) {
            for (key in (state.keyMatrix[line] as KeyLine).keys) {
                let keyData = (state.keyMatrix[line] as KeyLine).keys[key].keyData;
                if (keyData == undefined) continue;
                //KeyMatrixData.value[keyMatrixTable.value][keyMatrixLayer.value]?.fillKeyMappingData((state.keyMatrix[line] as KeyLine).keys[key].index, keyData.keyMappingData);
                keySetStr(keyData);
            }
        }

        if (state.profileList.length > 0) {
            state.profileList.splice(0, state.profileList.length);
        }

        let i: number;
        for (i = 0; i < ps.list.length; i++) {
            (state.profileList as Array<Profile>).push(ps.list[i]);
        }
    };

    const getSelectedFun = (): KeyDefineEnum | undefined => {
        for (var i = 0; i < state.keyFunList.length; i++) {
            for (var j = 0; j < state.keyFunList[i].keys.length; j++) {
                if (state.keyFunList[i].keys[j].selected && state.funid == state.keyFunList[i].id) {
                    return state.keyFunList[i].keys[j].key;
                }
            }
        }
        return undefined;
    };

    const isFunSelected = (keyCode: KeyDefineEnum): string => {
        let style: string = "";
        for (var i = 0; i < state.keyFunList.length; i++) {
            for (var j = 0; j < state.keyFunList[i].keys.length; j++) {
                if (state.keyFunList[i].keys[j].key == keyCode && state.keyFunList[i].keys[j].selected) {
                    style = "selected";
                    break;
                }
            }
        }
        return style;
    };

    const setSelected = (keyCode: KeyDefineEnum) => {
        for (var i = 0; i < state.keyFunList.length; i++) {
            for (var j = 0; j < state.keyFunList[i].keys.length; j++) {
                if (state.keyFunList[i].keys[j].key == keyCode) {
                    state.keyFunList[i].keys[j].selected = true;
                } else {
                    state.keyFunList[i].keys[j].selected = false;
                }
            }
        }
    };

    const setUnselected = (keyCode: KeyDefineEnum) => {
        for (var i = 0; i < state.keyFunList.length; i++) {
            for (var j = 0; j < state.keyFunList[i].keys.length; j++) {
                if (state.keyFunList[i].keys[j].key == keyCode) {
                    state.keyFunList[i].keys[j].selected = false;
                }
            }
        }
    };

    const unSelected = (): void => {
        let i: any;
        for (i in state.keyState) {
            (state.keyState as Array<KeyState>)[i].selected = false;
            let keyData = (state.keyState as Array<KeyState>)[i].keyData;
            if (keyData != undefined) {
                keyData.keyInfo.isCheck = false;
            }
        }
    };

    const selected = (): void => {
        let i: any;
        for (i in state.keyState) {
            (state.keyState as Array<KeyState>)[i].selected = true;
            let keyData = (state.keyState as Array<KeyState>)[i].keyData;
            if (keyData != undefined) {
                keyData.keyInfo.isCheck = true;
            }
        }
    };

    const keyHover = (index: number, isHover: boolean) => {
        let keyState = (state.keyState as Array<KeyState>)[index];
        keyState.isHover = isHover;
    }

    const isKeyHover = (index: number): boolean => {
        let keyState = (state.keyState as Array<KeyState>)[index];
        return keyState.isHover;
    }

    const saveProfile = () => {
        ps.save();
    };

    const keySetStr = (keyData: KeyTableData) => {
        let layout: any = keyMatrixLayer.value;
        let keyCode = keyData.getLayoutMapping(layout as LayoutTypeEnum);
        //let keyText = KeyText;
        keyData.keyStr.splice(0, keyData.keyStr.length);
        if (KeyText[keyCode] != undefined) {
            for (let i = 0; i < KeyText[keyCode].length; i++) {
                keyData.keyStr.push(KeyText[keyCode][i].valueOf());
            }
        }
    };

    const mapping = (keyCode: KeyDefineEnum, table: MatrixTable) => {
        let key = undefined;
        let i: number = 0;
        for (i = 0; i < state.keyState.length; i++) {
            if ((state.keyState as Array<KeyState>)[i].selected) {
                key = (state.keyState as Array<KeyState>)[i];
                break;
            }
        }

        setSelected(keyCode);

        if (key != undefined) {
            let layout: any = keyMatrixLayer.value;
            key.keyData.setLayoutMapping(keyCode, layout as LayoutTypeEnum);
            if (keyboard.keyboardDefine != undefined) {
                keySetStr(key.keyData);
            }
            rk_c61.value?.setKeyValues([
                {
                    keyCode: key.keyData.keyInfo.keyValue,
                    value: key.keyData.getLayoutMapping(layout as LayoutTypeEnum),
                    layout: layout as LayoutTypeEnum
                }]);
            unSelected();
            setUnselected(keyCode);
        }

        saveProfile();
    };

    const keySetToDefaultAll = () => {
        let index: any;
        let keyCmdValues = new Array<KeyCmdValue>();
        let layout: any = keyMatrixLayer.value;
        for (index in state.keyState) {
            let kState = state.keyState[index] as KeyState;
            let keyInfo = getDefaultKeyInfo(index);

            if (keyInfo != null) {
                kState.keyData.setKeyInfo(keyInfo);
                keyCmdValues.push({
                    keyCode: kState.keyData.keyInfo.keyValue,
                    value: kState.keyData.getLayoutMapping(layout as LayoutTypeEnum),
                    layout: layout as LayoutTypeEnum
                });
            }
            kState.selected = false;
            // KeyMatrixData.value[keyMatrixTable.value][keyMatrixLayer.value]?.setKeyMapping(index, kState.KeyData.keyMappingData);
            // if (profile.value != undefined) {
            //   profile.value.keyTypes[keyMatrixTable.value][keyMatrixLayer.value][key.index] = MatrixTable.WIN;
            // }
        }
        //rk_c61.value?.setKeyMatrix(keyMatrixLayer.value, keyMatrixTable.value, 0);

        rk_c61.value?.setKeyValues(keyCmdValues);
        saveProfile();
    };

    // const fillKeyMappingData = (code: number): KeyMappingData => {
    //     return {
    //         keyStr: keyboard.keyboardDefine == undefined ? [""] : keyboard.keyboardDefine.keyText[code],
    //         keyCode: code & 0x0000ffff,
    //         keyMappingType: code >> 24,
    //         keyMappingPara: (code >> 16) & 0xff,
    //         keyRaw: code,
    //     };
    // };

    const keySetToDefault = (index: number) => {
        if (state.keyState.length <= 0 || index >= 999) {
            return "";
        }

        let kState = (state.keyState as Array<KeyState>)[index];
        let keyInfo = getDefaultKeyInfo(index);
        let layout: any = keyMatrixLayer.value;

        if (keyInfo != null) {
            kState.keyData.setKeyInfo(keyInfo);
            rk_c61.value?.setKeyValues([
                {
                    keyCode: kState.keyData.keyInfo.keyValue,
                    value: kState.keyData.getLayoutMapping(layout as LayoutTypeEnum),
                    layout: layout as LayoutTypeEnum
                }]);
        }
        // KeyMatrixData.value[keyMatrixTable.value][keyMatrixLayer.value]?.setKeyMapping(index, kState.KeyData.keyMappingData);
        // rk_c61.value?.setKeyMatrix(keyMatrixLayer.value, keyMatrixTable.value, 0);
    };

    const keyClick = (index: number) => {
        if (state.keyState.length <= 0 || index >= 999) return "";
        let key = (state.keyState as Array<KeyState>)[index];
        let isSelected = key.selected;
        key.selected = !isSelected;
        keyState.value = key.selected ? key : undefined;

        let keyCode = getSelectedFun();
        if (keyCode != undefined) {
            let layout: any = keyMatrixLayer.value;
            key.keyData.setLayoutMapping(keyCode, layout as LayoutTypeEnum);
            rk_c61.value?.setKeyValues([{
                keyCode: key.keyData.keyInfo.keyValue,
                value: key.keyData.getLayoutMapping(layout as LayoutTypeEnum),
                layout: layout as LayoutTypeEnum
            }]);
            //key.KeyData.keyMappingData.keyStr = keyboard.keyboardDefine.keyText[keyCode];
            // let table = getSelectedTable();
            // if (profile.value != undefined) {
            //   profile.value.keyTypes[keyMatrixTable.value][keyMatrixLayer.value][key.index] = table;
            // }
            //keySetStr(key.KeyData);

            // KeyMatrixData.value[keyMatrixTable.value][keyMatrixLayer.value]?.setKeyMapping(key.index, key.KeyData.keyMappingData);
            // rk_c61.value?.setKeyMatrix(keyMatrixLayer.value, keyMatrixTable.value, 0);

            saveProfile();
            unSelected();
            setUnselected(keyCode);
        }
    };

    const keybgColor = (key: KeyTableData | undefined): string => {
        let c = "";
        if (key != undefined) {
            let advKeyType = key.keyInfo.advanceKeyType;
            switch (advKeyType) {
                case AdvKeyTypeEnum.MACRO:
                    c = "key_remapped";
                    break;
                default:
                    let layout: any = keyMatrixLayer.value;
                    c = key.isRemaped(getDefaultKeyInfo(key.index), layout as LayoutTypeEnum) ? "" : "key_remapped";
                    break;
            }
        }
        return c;
    };

    const onKeyDown = (event: KeyboardEvent) => {
        console.log("Key pressed:", `${event.key} | ${event.code} | ${event.keyCode}`);
        event.preventDefault();
        state.keyStr = KeyCodeMap[event.code].key;
        state.keyHid = KeyCodeMap[event.code].hid;
    };

    const keyColor = (key: KeyTableData | undefined): string => {
        return key == undefined ? "" : "bg-white";
    };

    const isSelected = (index: number): string => {
        if (state.keyState.length <= 0 || index >= 999) return "";
        return !(state.keyState as Array<KeyState>)[index].selected ? "" : "selected";
    };

    const isCombinKey = (keyData: KeyTableData | undefined): boolean => {
        if (keyData == undefined) return false;
        let layout: any = keyMatrixLayer.value;
        return keyData.isCombinKey(layout);
        // let mapping = keyData.keyMappingData;
        // if (mapping.keyMappingType == KeyMappingType.KeyBoard && mapping.keyMappingPara > 0) {
        //     let keyText = KeyText;
        //     //let keyType = profile.value?.keyTypes[keyMatrixTable.value][keyMatrixLayer.value][keyData.index];

        //     // if (keyType == MatrixTable.WIN && keyboard.keyboardDefine != undefined) {
        //     //   keyText = keyboard.keyboardDefine.keyText;
        //     // } else if (keyType == MatrixTable.MAC) {
        //     //   keyText = KeyText_Mac;
        //     // }

        //     return keyText[mapping.keyRaw] == undefined;
        // }

        // return false;
    };

    const keyText = (keyData: KeyTableData | undefined): String => {
        if (keyData == undefined) return "";

        // let keyType = profile.value?.keyTypes[keyMatrixTable.value][keyMatrixLayer.value][keyData.index];
        // if (keyType != null && keyType != undefined && keyType == MatrixTable.MAC) {
        //   return keyData.keyMappingData.keyStr[0];
        // }

        let keyStr = "";
        let texts = [];
        let layout: any = keyMatrixLayer.value;
        let keyCode = keyData.getLayoutMapping(layout as LayoutTypeEnum);
        if (keyCode == KeyDefineEnum.SPARKLINK_FN) {
            keyStr = ``;
        } else {
            let keyMappingType: KeyMappingType = keyCode >> 12;
            switch (keyMappingType) {
                case KeyMappingType.MultiAndMix:
                    keyData.keyStr = ['MultiAndMix'];
                    keyStr = `${keyStr}${keyData.keyStr[0]}`;
                    break;
                case KeyMappingType.Mouse:
                case KeyMappingType.SparkLinkKbFun:
                case KeyMappingType.KeyBoard:
                case KeyMappingType.Consumer:
                case KeyMappingType.GameControls:
                case KeyMappingType.SportControls:
                case KeyMappingType.VRControls:
                case KeyMappingType.GenericDesktop:
                    if (keyCode > 0) {
                        let strs = KeyText[keyCode];
                        if (strs != undefined) {
                            for (let index = 0; index < strs.length; index++) {
                                texts.push(strs[index]);
                                keyStr = `${keyStr}${strs[index]}`;
                            }
                        } else {
                            Logging.console(LOG_TYPE.ERROR, `Cant find text for the KeyCode[${keyCode}]`);
                        }
                    }
                    break;
            }
        }
        if (texts.length == 4) {
            keyStr = `<div class='d-flex'>
      <div>
          <div>${texts[1]}</div>
          <div>${texts[0]}</div>
      </div>
      <div class='ml-3'>
          <div>${texts[3]}</div>
          <div>${texts[2]}</div>
      </div>
      </div>`;
        } else if (texts.length == 3) {
            keyStr = `<div class='d-flex'>
      <div>
          <div>${texts[1]}</div>
          <div>${texts[0]}</div>
      </div>
      <div class='ml-3'>
          <div>&nbsp;</div>
          <div>${texts[2]}</div>
      </div>
      </div>`;
        } else if (texts.length == 2) {
            keyStr = `<div class='d-flex'>
      <div>
          <div>${texts[0]}</div>
          <div>&nbsp;</div>
      </div>
        <div class='ml-3'>
          <div>&nbsp;</div>
          <div>${texts[1]}</div>
      </div>
      </div>`;
        }

        return keyStr;
    };

    const keyTipText = (keyData: KeyTableData | undefined): String => {
        if (keyData == undefined) return "";
        if (isCombinKey(keyData)) return keyData.keyStr[0];
        return "";
    };

    const keySetMacro = (index: number) => {
        if (state.keyState.length <= 0 || index >= 999) {
            return "";
        }

        if (rk_c61.value != undefined && macros.value == undefined) {
            macros.value = rk_c61.value.data.macros;
        }

        macro.value = macros.value?.get()[0];
        keyState.value = (state.keyState as Array<KeyState>)[index];
        state.macroDialogShow = true;
    };

    const confirmSetMacro = () => {
        if (keyState.value != undefined && macro.value != undefined) {
            // let mapping = keyState.value.KeyData.keyMappingData;
            // mapping.keyCode = (state.cycleCount << 8) | macro.value?.index;
            // mapping.keyStr = [macro.value?.name];
            // mapping.keyMappingType = KeyMappingType.Macro;
            // mapping.keyMappingPara = state.cycleType;

            keyState.value.keyData.setMacro(macro.value);

            // KeyMatrixData.value[keyMatrixTable.value][keyMatrixLayer.value]?.setKeyMapping(keyState.value.index, mapping);
            // rk_c61.value?.setKeyMatrix(keyMatrixLayer.value, keyMatrixTable.value, 0);
            saveProfile();
        }

        state.macroDialogShow = false;
    };

    const isMacroSelected = (obj: Macro): string => {
        return obj.index == macro.value?.index ? "module_active2" : "";
    };

    const clickMacro = (obj: Macro) => {
        macro.value = obj;
        state.cycleType = 1;
        state.cycleCount = macro.value.repeat;
    };

    const getKeyMatrix = async () => {
        unSelected();
        refresh();
    };

    const keyMatrixChange = async () => {
        await getKeyMatrix();
        // rk_m87.value?.data?.boardProfile?.setFieldValue(FieldEnum.WinMacMode, keyMatrixTable.value);
        // rk_m87.value?.setProfile(0);
    }


    const selectWASD = () => {
        for (let i = 0; i < WASD.length; i++) {
            (state.keyState as Array<KeyState>)[WASD[i]].selected = true;
            (state.keyState as Array<KeyState>)[WASD[i]].keyData.keyInfo.isCheck = true;
        }
    };

    const selectDIGIT = () => {
        for (let i = 0; i < DIGIT.length; i++) {
            (state.keyState as Array<KeyState>)[DIGIT[i]].selected = true;
            (state.keyState as Array<KeyState>)[DIGIT[i]].keyData.keyInfo.isCheck = true;
        }
    };

    const selectLETTER = () => {
        for (let i = 0; i < LETTER.length; i++) {
            (state.keyState as Array<KeyState>)[LETTER[i]].selected = true;
            (state.keyState as Array<KeyState>)[LETTER[i]].keyData.keyInfo.isCheck = true;
        }
    };

    // const itemText = (item: any) => {
    //     if (item == null) return ''
    //     if (item.type == MatrixTable.MAC) return item.text[0] as string;
    //     if (item.tip != '') return t(item.text[0] as string);
    //     if ((item.key >> 24) == 8) return t(item.text[0] as string);

    //     let str = '';
    //     let i = 0;
    //     let texts = [];
    //     for (i = 0; i < item.text.length; i++) {
    //         str = `${str}${item.text[i]}`
    //         if (item.text[i] != '' && item.text[i] != undefined) {
    //             texts.push(item.text[i])
    //         }
    //     }
    //     if (texts.length == 4) {
    //         str = `<div class='d-flex'>
    //     <div>
    //         <div>${texts[1]}</div>
    //         <div>${texts[0]}</div>
    //     </div>
    //     <div class='ml-3'>
    //         <div>${texts[3]}</div>
    //         <div>${texts[2]}</div>
    //     </div>
    //     </div>`
    //     } else if (texts.length == 3) {
    //         str = `<div class='d-flex'>
    //     <div>
    //         <div>${texts[1]}</div>
    //         <div>${texts[0]}</div>
    //     </div>
    //     <div class='ml-3'>
    //         <div>&nbsp;</div>
    //         <div>${texts[2]}</div>
    //     </div>
    //     </div>`
    //     } else if (texts.length == 2) {
    //         str = `<div class='d-flex'>
    //     <div>
    //         <div>${texts[0]}</div>
    //         <div>&nbsp;</div>
    //     </div>
    //       <div class='ml-3'>
    //         <div>&nbsp;</div>
    //         <div>${texts[1]}</div>
    //     </div>
    //     </div>`
    //     }
    //     return str;
    // }

    const updateKeyInfo = () => {
        if (rk_c61.value != undefined) {
            for (let row = 0; row < 6; row++) {
                for (let col = 0; col < 21; col++) {
                    let keyInfo = rk_c61.value.data.keyInfoData.getKeyInfo(row, col);
                    if (keyInfo != null) {
                        (state.keyState as Array<KeyState>)[getIndex(row, col)].keyData.keyInfo = keyInfo;
                    }
                }
            }
        }
    };

    const setToFactory = async () => {
        if (rk_c61.value != undefined) {
            await rk_c61.value.cmd(OrderTypeEnum.RestoreFactory, 0xff);
        }
    };

    return {
        profile,
        state,
        keyState,
        keyMatrixLayer,
        keyMatrixTable,
        init,
        destroy,
        setFunid,
        isFunSelected,
        setUnselected,
        unSelected,
        selected,
        mapping,
        saveProfile,
        getKeyMatrix,
        keyMatrixChange,
        refresh,
        keySetToDefaultAll,
        keySetToDefault,
        keyClick,
        keybgColor,
        onKeyDown,
        keyColor,
        isSelected,
        keyHover,
        isKeyHover,
        isCombinKey,
        keyText,
        keyTipText,
        keySetMacro,
        confirmSetMacro,
        isMacroSelected,
        clickMacro,
        isAnyKeyChecked,
        selectWASD,
        selectDIGIT,
        selectLETTER,
        //itemText,
        updateKeyInfo,
        setToFactory
    };
});
