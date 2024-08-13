import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { keyboard } from '../keyboard/keyboard'
import { RK_L87, RK_L87_EVENT_DEFINE } from '../keyboard/rk_l87/rk_l87';
import { KeyCodeEnum, KeyDefineEnum } from '../keyboard/keyCode'
import { type KeyMappingData, type KeyTableData, type KeyState } from '../keyboard/interface'
import { ConnectionEventEnum, ConnectionStatusEnum, KeyMappingType, KeyMatrixLayer } from '../keyboard/enum'
import { KeyMatrix, MatrixTable } from '@/keyboard/rk_l87/keyMatrix';
import { Action, Macro, Macros } from '@/keyboard/rk_l87/macros';
import { Profile, ps } from '@/keyboard/rk_l87/profiles';
import { KeyCodeMap } from '@/keyboard/keyCode'
import fileSaver from "file-saver";
import { ElMessage } from 'element-plus'

import { storage } from '@/keyboard/storage';
import { BoardProfile, FieldEnum, PROFILE_DEFAULT_DATA } from '@/keyboard/rk_l87/boardProfile';
import { LedEffect } from '@/keyboard/rk_l87/ledEffect';
import { LedColors } from '@/keyboard/rk_l87/ledColors';
import { useI18n } from 'vue-i18n';

export const useKeyStore = defineStore('keyinfo', () => {
  const rk_l87 = ref<RK_L87>();

  const { t } = useI18n();

  const macros = ref<Macros>();
  const macro = ref<Macro>();
  const keyState = ref<KeyState>();
  const profile = ref<Profile>();
  const keyMatrixLayer = ref<KeyMatrixLayer>(KeyMatrixLayer.Nomal);

  const KeyMatrixData = ref<Record<number, KeyMatrix>>({});

  const getKeyData = (index: number): KeyTableData | undefined => {
    let keyData = undefined;
    let layer = KeyMatrixLayer.Nomal
    if (keyMatrixLayer.value != undefined) {
      layer = keyMatrixLayer.value;
    }
    if (layer in keyboard.state.keyTableData &&
      index < keyboard.state.keyTableData[layer].length) {
      keyData = keyboard.state.keyTableData[layer][index];
    }
    return keyData;
  }

  const getIndex = (l: number, c: number) => {
    return l + 6 * c;
  }

  const state = reactive({
    funid: 1,
    funMenuList: [
      { id: 1, title: 'key.key_1', style: '' },
      { id: 2, title: 'key.key_2', style: '' },
      { id: 3, title: 'key.key_3', style: '' },
      { id: 4, title: 'key.key_4', style: '' },
      { id: 5, title: 'key.key_5', style: '' },
      { id: 6, title: 'key.key_6', style: '' },
    ],
    name: '',
    nameEditorDisplay: false,
    isNewProfile: false,
    profiles: ps,
    profileList: [],
    //MatrixLayer: keyMatrixLayer.value,
    MatrixLayers: [
      { value: KeyMatrixLayer.Nomal, label: 'key.layer_1' },
      { value: KeyMatrixLayer.FN1, label: 'key.layer_2' },
      { value: KeyMatrixLayer.FN2, label: 'key.layer_3' },
      { value: KeyMatrixLayer.Tap, label: 'key.layer_4' },
    ],
    keyFunState: [] as any,
    keyState: [],
    keyFunList: [{
      id: 1,
      style: "",
      keys: [{ key: KeyDefineEnum.KEY_1, text: '1', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_2, text: '2', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_3, text: '3', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_4, text: '4', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_5, text: '5', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_6, text: '6', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_7, text: '7', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_8, text: '8', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_9, text: '9', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_0, text: '0', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_UpArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_UpArrow], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_DownArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_DownArrow], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_LeftArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_LeftArrow], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_RightArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_RightArrow], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_A, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_A], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_B, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_B], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_C, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_C], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_D, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_D], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_E, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_E], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_F, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_G, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_G], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_H, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_H], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_I, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_I], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_K, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_K], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_L, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_L], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_M, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_M], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_N, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_N], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_O, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_O], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_P, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_P], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_Q, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Q], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_R, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_R], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_S, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_S], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_T, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_T], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_U, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_U], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_V, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_V], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_W, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_W], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_X, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_X], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_Y, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Y], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_Z, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Z], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_Underscore, text: '-', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_EqualSign, text: '=', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_L_Brackets, text: '[', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_R_Brackets, text: ']', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_CODE29, text: '\\', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_Semicolon, text: ';', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_Quotation, text: '\'', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_TILDE, text: '`', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_COMMA, text: ',', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_PERIOD, text: '.', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_Interrogation, text: '/', style: "key", selected: false },
      { key: KeyDefineEnum.KEY_F1, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F1], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_F2, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F2], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_F3, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F3], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_F4, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F4], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_F5, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F5], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_F6, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F6], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_F7, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F7], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_F8, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F8], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_F9, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F9], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_F10, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F10], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_F11, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F11], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_F12, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F12], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_ESC, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_ESC], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_TAB, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_TAB], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_INS, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_INS], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_PAUSE, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PAUSE], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_SPACEBAR, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_SPACEBAR], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_HOME, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_HOME], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_END, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_END], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_DEL, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_DEL], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_SCRLOCK, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_SCRLOCK], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_PGDN, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PGDN], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_PGUP, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PGUP], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_CAPSLOCK, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_CAPSLOCK], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_Backspace, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Backspace], style: "key key2", selected: false },
      { key: KeyDefineEnum.KEY_PRINT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PRINT], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_NUM_1, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_1], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_NUM_2, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_2], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_NUM_3, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_3], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_NUM_4, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_4], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_NUM_5, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_5], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_NUM_6, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_6], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_NUM_7, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_7], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_NUM_8, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_8], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_NUM_9, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_9], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_NUM_0, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_0], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_NUM_PLUS, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_PLUS], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_NUM_MINUS, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_MINUS], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_NUM_MUL, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_MUL], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_NUM_DIV, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_DIV], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_NUM_DOT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_DOT], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_NUMLOCK, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUMLOCK], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_NUM_ENTER, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_ENTER], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_L_CTRL, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_L_CTRL], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_L_SHIFT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_L_SHIFT], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_L_ALT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_L_ALT], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_L_WIN, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_L_WIN], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_R_CTRL, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_R_CTRL], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_R_SHIFT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_R_SHIFT], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_R_ALT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_R_ALT], style: "key key1", selected: false },
      { key: KeyDefineEnum.KEY_R_WIN, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_R_WIN], style: "key key1", selected: false }
      ],
    },
    {
      id: 4,
      style: "",
      keys: [{ key: KeyDefineEnum.KEY_Fn1, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Fn1], style: "key", selected: false },
      { key: KeyDefineEnum.KEY_Fn2, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Fn2], style: "key", selected: false },
      ],
    }],
    keyMatrix: [
      {
        line: 1,
        style: "space-t",
        keys: [{ key: KeyDefineEnum.KEY_ESC, style: 'key', index: getIndex(0, 0), keyData: getKeyData(getIndex(0, 0)) },
        { key: KeyDefineEnum.KEY_F1, style: 'key space-l', index: getIndex(0, 1), keyData: getKeyData(getIndex(0, 1)) },
        { key: KeyDefineEnum.KEY_F2, style: 'key', index: getIndex(0, 2), keyData: getKeyData(getIndex(0, 2)) },
        { key: KeyDefineEnum.KEY_F3, style: 'key', index: getIndex(0, 3), keyData: getKeyData(getIndex(0, 3)) },
        { key: KeyDefineEnum.KEY_F4, style: 'key', index: getIndex(0, 4), keyData: getKeyData(getIndex(0, 4)) },
        { key: KeyDefineEnum.KEY_F5, style: 'key space-l', index: getIndex(0, 5), keyData: getKeyData(getIndex(0, 5)) },
        { key: KeyDefineEnum.KEY_F6, style: 'key', index: getIndex(0, 6), keyData: getKeyData(getIndex(0, 6)) },
        { key: KeyDefineEnum.KEY_F7, style: 'key', index: getIndex(0, 7), keyData: getKeyData(getIndex(0, 7)) },
        { key: KeyDefineEnum.KEY_F8, style: 'key', index: getIndex(0, 8), keyData: getKeyData(getIndex(0, 8)) },
        { key: KeyDefineEnum.KEY_F9, style: 'key space-l', index: getIndex(0, 9), keyData: getKeyData(getIndex(0, 9)) },
        { key: KeyDefineEnum.KEY_F10, style: 'key', index: getIndex(0, 10), keyData: getKeyData(getIndex(0, 10)) },
        { key: KeyDefineEnum.KEY_F11, style: 'key', index: getIndex(0, 11), keyData: getKeyData(getIndex(0, 11)) },
        { key: KeyDefineEnum.KEY_F12, style: 'key', index: getIndex(0, 12), keyData: getKeyData(getIndex(0, 12)) },
        { key: KeyDefineEnum.KEY_Calculator, style: 'key space-l', index: getIndex(0, 13), keyData: getKeyData(getIndex(0, 13)) },
        { key: KeyDefineEnum.KEY_PRINT, style: 'key space-l', index: getIndex(0, 14), keyData: getKeyData(getIndex(0, 14)) },
        { key: KeyDefineEnum.KEY_SCRLOCK, style: 'key', index: getIndex(0, 15), keyData: getKeyData(getIndex(0, 15)) },
        { key: KeyDefineEnum.KEY_PAUSE, style: 'key', index: getIndex(0, 16), keyData: getKeyData(getIndex(0, 16)) }
        ]
      },
      {
        line: 2,
        style: "space-t",
        keys: [{ key: KeyDefineEnum.KEY_TILDE, style: 'key', index: getIndex(1, 0), keyData: getKeyData(getIndex(1, 0)) },
        { key: KeyDefineEnum.KEY_1, style: 'key', index: getIndex(1, 1), keyData: getKeyData(getIndex(1, 1)) },
        { key: KeyDefineEnum.KEY_2, style: 'key', index: getIndex(1, 2), keyData: getKeyData(getIndex(1, 2)) },
        { key: KeyDefineEnum.KEY_3, style: 'key', index: getIndex(1, 3), keyData: getKeyData(getIndex(1, 3)) },
        { key: KeyDefineEnum.KEY_4, style: 'key', index: getIndex(1, 4), keyData: getKeyData(getIndex(1, 4)) },
        { key: KeyDefineEnum.KEY_5, style: 'key', index: getIndex(1, 5), keyData: getKeyData(getIndex(1, 5)) },
        { key: KeyDefineEnum.KEY_6, style: 'key', index: getIndex(1, 6), keyData: getKeyData(getIndex(1, 6)) },
        { key: KeyDefineEnum.KEY_7, style: 'key', index: getIndex(1, 7), keyData: getKeyData(getIndex(1, 7)) },
        { key: KeyDefineEnum.KEY_8, style: 'key', index: getIndex(1, 8), keyData: getKeyData(getIndex(1, 8)) },
        { key: KeyDefineEnum.KEY_9, style: 'key', index: getIndex(1, 9), keyData: getKeyData(getIndex(1, 9)) },
        { key: KeyDefineEnum.KEY_0, style: 'key', index: getIndex(1, 10), keyData: getKeyData(getIndex(1, 10)) },
        { key: KeyDefineEnum.KEY_Underscore, style: 'key', index: getIndex(1, 11), keyData: getKeyData(getIndex(1, 11)) },
        { key: KeyDefineEnum.KEY_EqualSign, style: 'key', index: getIndex(1, 12), keyData: getKeyData(getIndex(1, 12)) },
        { key: KeyDefineEnum.KEY_Backspace, style: 'key key2', index: getIndex(1, 13), keyData: getKeyData(getIndex(1, 13)) },
        { key: KeyDefineEnum.KEY_INS, style: 'key space-l', index: getIndex(1, 14), keyData: getKeyData(getIndex(1, 14)) },
        { key: KeyDefineEnum.KEY_HOME, style: 'key', index: getIndex(1, 15), keyData: getKeyData(getIndex(1, 15)) },
        { key: KeyDefineEnum.KEY_PGUP, style: 'key', index: getIndex(1, 16), keyData: getKeyData(getIndex(1, 16)) }
        ]
      },
      {
        line: 3,
        style: "",
        keys: [{ key: KeyDefineEnum.KEY_TAB, style: 'key key3', index: getIndex(2, 0), keyData: getKeyData(getIndex(2, 0)) },
        { key: KeyDefineEnum.KEY_Q, style: 'key', index: getIndex(2, 1), keyData: getKeyData(getIndex(2, 1)) },
        { key: KeyDefineEnum.KEY_W, style: 'key', index: getIndex(2, 2), keyData: getKeyData(getIndex(2, 2)) },
        { key: KeyDefineEnum.KEY_E, style: 'key', index: getIndex(2, 3), keyData: getKeyData(getIndex(2, 3)) },
        { key: KeyDefineEnum.KEY_R, style: 'key', index: getIndex(2, 4), keyData: getKeyData(getIndex(2, 4)) },
        { key: KeyDefineEnum.KEY_T, style: 'key', index: getIndex(2, 5), keyData: getKeyData(getIndex(2, 5)) },
        { key: KeyDefineEnum.KEY_Y, style: 'key', index: getIndex(2, 6), keyData: getKeyData(getIndex(2, 6)) },
        { key: KeyDefineEnum.KEY_U, style: 'key', index: getIndex(2, 7), keyData: getKeyData(getIndex(2, 7)) },
        { key: KeyDefineEnum.KEY_I, style: 'key', index: getIndex(2, 8), keyData: getKeyData(getIndex(2, 8)) },
        { key: KeyDefineEnum.KEY_O, style: 'key', index: getIndex(2, 9), keyData: getKeyData(getIndex(2, 9)) },
        { key: KeyDefineEnum.KEY_P, style: 'key', index: getIndex(2, 10), keyData: getKeyData(getIndex(2, 10)) },
        { key: KeyDefineEnum.KEY_L_Brackets, style: 'key', index: getIndex(2, 11), keyData: getKeyData(getIndex(2, 11)) },
        { key: KeyDefineEnum.KEY_R_Brackets, style: 'key', index: getIndex(2, 12), keyData: getKeyData(getIndex(2, 12)) },
        { key: KeyDefineEnum.KEY_CODE29, style: 'key key3', index: getIndex(2, 13), keyData: getKeyData(getIndex(2, 13)) },
        { key: KeyDefineEnum.KEY_DEL, style: 'key space-l', index: getIndex(2, 14), keyData: getKeyData(getIndex(2, 14)) },
        { key: KeyDefineEnum.KEY_END, style: 'key', index: getIndex(2, 15), keyData: getKeyData(getIndex(2, 15)) },
        { key: KeyDefineEnum.KEY_PGDN, style: 'key', index: getIndex(2, 16), keyData: getKeyData(getIndex(2, 16)) }
        ]
      },
      {
        line: 4,
        style: "",
        keys: [{ key: KeyDefineEnum.KEY_CAPSLOCK, style: 'key key2', index: getIndex(3, 0), keyData: getKeyData(getIndex(3, 0)) },
        { key: KeyDefineEnum.KEY_A, style: 'key', index: getIndex(3, 1), keyData: getKeyData(getIndex(3, 1)) },
        { key: KeyDefineEnum.KEY_S, style: 'key', index: getIndex(3, 2), keyData: getKeyData(getIndex(3, 2)) },
        { key: KeyDefineEnum.KEY_D, style: 'key', index: getIndex(3, 3), keyData: getKeyData(getIndex(3, 3)) },
        { key: KeyDefineEnum.KEY_F, style: 'key', index: getIndex(3, 4), keyData: getKeyData(getIndex(3, 4)) },
        { key: KeyDefineEnum.KEY_G, style: 'key', index: getIndex(3, 5), keyData: getKeyData(getIndex(3, 5)) },
        { key: KeyDefineEnum.KEY_H, style: 'key', index: getIndex(3, 6), keyData: getKeyData(getIndex(3, 6)) },
        { key: KeyDefineEnum.KEY_J, style: 'key', index: getIndex(3, 7), keyData: getKeyData(getIndex(3, 7)) },
        { key: KeyDefineEnum.KEY_K, style: 'key', index: getIndex(3, 8), keyData: getKeyData(getIndex(3, 8)) },
        { key: KeyDefineEnum.KEY_L, style: 'key', index: getIndex(3, 9), keyData: getKeyData(getIndex(3, 9)) },
        { key: KeyDefineEnum.KEY_Semicolon, style: 'key', index: getIndex(3, 10), keyData: getKeyData(getIndex(3, 10)) },
        { key: KeyDefineEnum.KEY_Quotation, style: 'key', index: getIndex(3, 11), keyData: getKeyData(getIndex(3, 11)) },
        { key: KeyDefineEnum.KEY_ENTER, style: 'key key2', index: getIndex(3, 13), keyData: getKeyData(getIndex(3, 13)) },
        ]
      },
      {
        line: 5,
        style: "",
        keys: [{ key: KeyDefineEnum.SHIFT_L, style: 'key key4', index: getIndex(4, 0), keyData: getKeyData(getIndex(4, 0)) },
        { key: KeyDefineEnum.KEY_Z, style: 'key', index: getIndex(4, 1), keyData: getKeyData(getIndex(4, 1)) },
        { key: KeyDefineEnum.KEY_X, style: 'key', index: getIndex(4, 2), keyData: getKeyData(getIndex(4, 2)) },
        { key: KeyDefineEnum.KEY_C, style: 'key', index: getIndex(4, 3), keyData: getKeyData(getIndex(4, 3)) },
        { key: KeyDefineEnum.KEY_V, style: 'key', index: getIndex(4, 4), keyData: getKeyData(getIndex(4, 4)) },
        { key: KeyDefineEnum.KEY_B, style: 'key', index: getIndex(4, 5), keyData: getKeyData(getIndex(4, 5)) },
        { key: KeyDefineEnum.KEY_N, style: 'key', index: getIndex(4, 6), keyData: getKeyData(getIndex(4, 6)) },
        { key: KeyDefineEnum.KEY_M, style: 'key', index: getIndex(4, 7), keyData: getKeyData(getIndex(4, 7)) },
        { key: KeyDefineEnum.KEY_COMMA, style: 'key', index: getIndex(4, 8), keyData: getKeyData(getIndex(4, 8)) },
        { key: KeyDefineEnum.KEY_PERIOD, style: 'key', index: getIndex(4, 9), keyData: getKeyData(getIndex(4, 9)) },
        { key: KeyDefineEnum.KEY_Interrogation, style: 'key', index: getIndex(4, 10), keyData: getKeyData(getIndex(4, 10)) },
        { key: KeyDefineEnum.SHIFT_R, style: 'key key4', index: getIndex(4, 13), keyData: getKeyData(getIndex(4, 13)) },
        { key: KeyDefineEnum.KEY_UpArrow, style: 'key space-l3', index: getIndex(4, 15), keyData: getKeyData(getIndex(4, 15)) },
        ]
      },
      {
        line: 6,
        style: "",
        keys: [{ key: KeyDefineEnum.CTRL_L, style: 'key key6', index: getIndex(5, 0), keyData: getKeyData(getIndex(5, 0)) },
        { key: KeyDefineEnum.WIN_L, style: 'key key6', index: getIndex(5, 1), keyData: getKeyData(getIndex(5, 1)) },
        { key: KeyDefineEnum.ALT_L, style: 'key key6', index: getIndex(5, 2), keyData: getKeyData(getIndex(5, 2)) },
        { key: KeyDefineEnum.KEY_SPACEBAR, style: 'key key5', index: getIndex(5, 5), keyData: getKeyData(getIndex(5, 5)) },
        { key: KeyDefineEnum.ALT_R, style: 'key key6', index: getIndex(5, 8), keyData: getKeyData(getIndex(5, 8)) },
        { key: KeyDefineEnum.KEY_Fn1, style: 'key key6', index: getIndex(5, 9), keyData: getKeyData(getIndex(5, 9)) },
        { key: KeyDefineEnum.KEY_APP, style: 'key key6', index: getIndex(5, 10), keyData: getKeyData(getIndex(5, 10)) },
        { key: KeyDefineEnum.CTRL_R, style: 'key key6', index: getIndex(5, 13), keyData: getKeyData(getIndex(5, 13)) },
        { key: KeyDefineEnum.KEY_LeftArrow, style: 'key space-l', index: getIndex(5, 14), keyData: getKeyData(getIndex(5, 14)) },
        { key: KeyDefineEnum.KEY_DownArrow, style: 'key', index: getIndex(5, 15), keyData: getKeyData(getIndex(5, 15)) },
        { key: KeyDefineEnum.KEY_RightArrow, style: 'key', index: getIndex(5, 16), keyData: getKeyData(getIndex(5, 16)) }
        ]
      },
    ],
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
      { key: KeyDefineEnum.KEY_Underscore, text: '-' },
      { key: KeyDefineEnum.KEY_EqualSign, text: '=' },
      { key: KeyDefineEnum.KEY_L_Brackets, text: '[' },
      { key: KeyDefineEnum.KEY_R_Brackets, text: ']' },
      { key: KeyDefineEnum.KEY_CODE29, text: '\\' },
      { key: KeyDefineEnum.KEY_Semicolon, text: ';' },
      { key: KeyDefineEnum.KEY_Quotation, text: '\'' },
      { key: KeyDefineEnum.KEY_TILDE, text: '`' },
      { key: KeyDefineEnum.KEY_COMMA, text: ',' },
      { key: KeyDefineEnum.KEY_PERIOD, text: '.' },
      { key: KeyDefineEnum.KEY_Interrogation, text: '/' }
    ],
    keyModifyLeft: [
      { key: KeyDefineEnum.KEY_L_CTRL, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_L_CTRL] },
      { key: KeyDefineEnum.KEY_L_SHIFT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_L_SHIFT] },
      { key: KeyDefineEnum.KEY_L_ALT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_L_ALT] },
      { key: KeyDefineEnum.KEY_L_WIN, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_L_WIN] }
    ],
    keyModifyRight: [
      { key: KeyDefineEnum.KEY_R_CTRL, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_R_CTRL] },
      { key: KeyDefineEnum.KEY_R_SHIFT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_R_SHIFT] },
      { key: KeyDefineEnum.KEY_R_ALT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_R_ALT] },
      { key: KeyDefineEnum.KEY_R_WIN, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_R_WIN] }
    ],
    keyArrow: [
      { key: KeyDefineEnum.KEY_UpArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_UpArrow] },
      { key: KeyDefineEnum.KEY_DownArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_DownArrow] },
      { key: KeyDefineEnum.KEY_LeftArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_LeftArrow] },
      { key: KeyDefineEnum.KEY_RightArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_RightArrow] }
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
      { key: KeyDefineEnum.KEY_PRINT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PRINT] }
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
      { key: KeyDefineEnum.KEY_NUM_ENTER, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_ENTER] }
    ],
    mediaKeyOptions: [
      { key: KeyDefineEnum.KEY_Media, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Media] },
      { key: KeyDefineEnum.KEY_NextTr, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NextTr] },
      { key: KeyDefineEnum.KEY_PrevTr, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PrevTr] },
      { key: KeyDefineEnum.KEY_Stop, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Stop] },
      { key: KeyDefineEnum.KEY_PlayPause, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PlayPause] },
      { key: KeyDefineEnum.KEY_Mute, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Mute] },
      { key: KeyDefineEnum.KEY_VolumI, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_VolumI] },
      { key: KeyDefineEnum.KEY_VolumD, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_VolumD] }
    ],
    macroDialogShow: false,
    combineKeyDialogShow: false,
    mediaKeyDialogShow: false,
    macros: macros,
    cycleTypes: [
      { value: 1, label: 'Cycles', strKey: 'key.type_1' },
      { value: 2, label: 'Cycle to any key pressed', strKey: 'key.type_2' },
      { value: 4, label: 'Cycle to any key released', strKey: 'key.type_3' },
    ],
    cycleType: 1,
    cycleCount: 1,
    keyStr: "",
    mediaKey: KeyDefineEnum.KEY_Media,
    keyHid: 0x00,
    shiftKey: false,
    ctrlKey: false,
    winKey: false,
    altKey: false
  });

  const isInited = ref(false);

  const setFunid = (id: number) => {
    state.funid = id;
  }

  const init = async () => {
    if (rk_l87.value == undefined) {
      rk_l87.value = (keyboard.protocol as RK_L87);
      let index: any;
      if (keyMatrixLayer.value in keyboard.state.keyTableData) {
        if (state.keyState.length > 0) {
          state.keyState.splice(0, state.keyState.length);
        }
        for (index in keyboard.state.keyTableData[keyMatrixLayer.value]) {
          (state.keyState as Array<KeyState>).push({
            selected: false,
            index: Number(index),
            KeyData: keyboard.state.keyTableData[keyMatrixLayer.value][Number(index)]
          });
        }
      }

      keyboard.addEventListener("connection", connectionEventCallback);

      initFunState();
      getProfiles();

      //await rk_l87.value?.setKeyMatrix(layer, MatrixTable.WIN, 0);
      //await rk_l87.value?.setProfile(0);
      //await rk_l87.value?.setLedEffect(0);
      //await rk_l87.value?.setLedColors(0);
    }

    if (rk_l87.value != undefined && !isInited.value) {
      rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnKeyMatrixGotten, keyMatrixGotten, false);
      macros.value = rk_l87.value.data.macros;
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
    if (rk_l87.value != undefined) {
      rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnKeyMatrixGotten, keyMatrixGotten, false);
    }

    if (keyboard.state.ConnectionStatus != ConnectionStatusEnum.Connected) {
      keyboard.removeEventListener("connection", connectionEventCallback);
      isInited.value = false;
      rk_l87.value = undefined;
    }
  };

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
  };

  const exportProfile = (obj: Profile) => {
    let blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
    fileSaver.saveAs(blob, `${obj.name}.rk`);
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

  const renameProfile = (obj: Profile) => {
    profile.value = obj;
    state.name = obj.name;
    state.nameEditorDisplay = true;
  };

  const handleEditClose = (done: () => void) => {
    // if (profile.value != undefined) {
    //   profile.value.name = state.name;
    // }
    done();
    //saveProfile();
    state.isNewProfile = false
  };

  const getProfiles = () => {
    if (rk_l87.value != undefined) {
      ps.init(t("Profile.default"));
      if (ps.curIndex == undefined) ps.curIndex = 0;
      profile.value = ps.get()[ps.curIndex];
      if (keyboard.keyboardDefine != undefined) {
        let index: any;
        for (index in keyboard.keyboardDefine.keyMatrixLayer) {
          let layer = keyboard.keyboardDefine.keyMatrixLayer[index];
          rk_l87.value.data.keyMatrixs[layer] = new KeyMatrix(new DataView(new Uint8Array(Object.values(profile.value.get(layer))).buffer));
        }
      }

      if (profile.value.profile != undefined) {
        if (rk_l87.value.data.boardProfile != undefined) {
          rk_l87.value.data.boardProfile.buffer = new DataView(new Uint8Array(Object.values(profile.value.profile)).buffer);
        } else {
          rk_l87.value.data.boardProfile = new BoardProfile(new DataView(new Uint8Array(Object.values(profile.value.profile)).buffer));
        }
      }

      if (profile.value.ledEffect != undefined) {
        if (rk_l87.value.data.ledEffect != undefined) {
          rk_l87.value.data.ledEffect.buffer = new DataView(new Uint8Array(Object.values(profile.value.ledEffect)).buffer);
        } else {
          rk_l87.value.data.ledEffect = new LedEffect(new DataView(new Uint8Array(Object.values(profile.value.ledEffect)).buffer));
        }
      }

      if (profile.value.ledColors != undefined) {
        if (rk_l87.value.data.ledColors != undefined) {
          rk_l87.value.data.ledColors.buffer = new DataView(new Uint8Array(Object.values(profile.value.ledColors)).buffer);
        } else {
          rk_l87.value.data.ledColors = new LedColors(new DataView(new Uint8Array(Object.values(profile.value.ledColors)).buffer));
        }
      }

      KeyMatrixData.value = rk_l87.value.data.keyMatrixs;
    }
    refresh();
  }

  const clickProfile = async (obj: Profile) => {
    keyMatrixLayer.value = KeyMatrixLayer.Nomal
    profile.value = ps.find(obj);
    if (profile.value != undefined && keyboard.keyboardDefine != undefined) {
      let index: any;
      ps.curIndex = profile.value?.index;
      for (index in keyboard.keyboardDefine.keyMatrixLayer) {
        let layer = keyboard.keyboardDefine.keyMatrixLayer[index];
        KeyMatrixData.value[layer] = new KeyMatrix(new DataView(new Uint8Array(Object.values(profile.value.get(layer))).buffer));
        await rk_l87.value?.setKeyMatrix(layer, MatrixTable.WIN, 0);
      }
      refresh()
    }

    if (profile.value?.profile != undefined && rk_l87.value != undefined && rk_l87.value.data.boardProfile != undefined) {
      rk_l87.value.data.boardProfile.buffer = new DataView(new Uint8Array(Object.values(profile.value.profile)).buffer);
    }
    if (profile.value?.ledEffect != undefined && rk_l87.value != undefined && rk_l87.value.data.ledEffect != undefined) {
      rk_l87.value.data.ledEffect.buffer = new DataView(new Uint8Array(Object.values(profile.value.ledEffect)).buffer);
    }
    if (profile.value?.ledColors != undefined && rk_l87.value != undefined && rk_l87.value.data.ledColors != null) {
      rk_l87.value.data.ledColors.buffer = new DataView(new Uint8Array(Object.values(profile.value?.ledColors)).buffer);
    }

    unSelected();
    saveProfile();
  }

  const deleteProfile = (obj: Profile) => {
    ps.remove(obj);
    if (ps.get().length > 0) {
      profile.value = ps.get()[0];
    } else {
      profile.value = undefined;
    }
    saveProfile();
  };

  const saveProfile = () => {
    if (profile.value != undefined) {
      const dataView = new DataView(KeyMatrixData.value[keyMatrixLayer.value].buffer.buffer)
      profile.value.add(keyMatrixLayer.value, new Uint8Array(dataView.buffer, dataView.byteOffset, dataView.byteLength));
      refresh()
    }
    if (rk_l87.value?.data.boardProfile != undefined) {
      const dataView = new DataView(rk_l87.value?.data.boardProfile.buffer.buffer)
      profile.value?.setProfile(new Uint8Array(dataView.buffer, dataView.byteOffset, dataView.byteLength))
    }
    if (rk_l87.value?.data.ledEffect != undefined) {
      const dataView = new DataView(rk_l87.value?.data.ledEffect.buffer.buffer)
      profile.value?.setledEffect(new Uint8Array(dataView.buffer, dataView.byteOffset, dataView.byteLength))

    }
    if (rk_l87.value?.data.ledColors != undefined) {
      const dataView = new DataView(rk_l87.value?.data.ledColors.buffer.buffer)
      profile.value?.setledColors(new Uint8Array(dataView.buffer, dataView.byteOffset, dataView.byteLength))
    }
    ps.save()
  }

  const newProfile = () => {
    let tm = new Profile(`${t("Profile.namePrefix")} ${ps.get().length + 1}`);
    // let layer: any;
    // for (layer in keyboard.keyboardDefine?.keyLayout) {
    //   tm.add(layer, new Uint8Array(512))
    //   KeyMatrixData.value[layer].buffer = new DataView(tm.layers[layer].buffer);
    //   let layout = keyboard.keyboardDefine?.keyLayout[layer];
    //   if (layout != undefined) {
    //     for (let j = 0; j < layout.length; j++) {
    //       KeyMatrixData.value[layer].setKeyMappingRaw(j, layout[j]);
    //     }
    //   }
    // }

    // tm.ledColors = new Uint8Array(512);

    // if (rk_l87.value != undefined && rk_l87.value.data.boardProfile != undefined) {
    //   tm.profile = new Uint8Array(PROFILE_DEFAULT_DATA.buffer, 0, PROFILE_DEFAULT_DATA.buffer.byteLength);
    // }

    // if (rk_l87.value != undefined && rk_l87.value.data.ledEffect != undefined) {
    //   tm.ledEffect = new Uint8Array(rk_l87.value.data.ledEffect.buffer.buffer, 0, rk_l87.value.data.ledEffect.buffer.byteLength);
    // }

    //profile.value = tm;
    // ps.add(tm);

    // saveProfile()

    state.name = tm.name;
    state.isNewProfile = true;
    renameProfile(tm)
  };

  const getKeyMatrixNomal = () => {
    keyMatrixLayer.value = KeyMatrixLayer.Nomal
    refresh();
  }
  const getKeyMatrix = async () => {
    unSelected();
    refresh()
    getKeyFunMatrix()
  }

  const setSelected = (keyCode: KeyDefineEnum) => {
    for (var i = 0; i < state.keyFunState.length; i++) {
      if (state.keyFunState[i].key === keyCode) {
        state.keyFunState[i].selected = true;
      }
      else state.keyFunState[i].selected = false;
    }
  }

  const getKeyFunMatrix = () => {
    for (var i = 0; i < state.funMenuList.length; i++) {
      if (state.funMenuList[i].id == 4 && keyMatrixLayer.value == KeyMatrixLayer.Tap) {
        state.funMenuList[i].style = 'd-none'
      }
      else {
        state.funMenuList[i].style = ''
      }
    }
    for (var i = 0; i < state.keyFunList.length; i++) {
      if (state.keyFunList[i].id == 4 && keyMatrixLayer.value == KeyMatrixLayer.Tap) {
        state.keyFunList[i].style = 'd-none'
      }
      else {
        state.keyFunList[i].style = ''
      }
    }
  }

  const isFunSelected = (keyCode: KeyDefineEnum): string => {
    let style: string = ''
    for (var i = 0; i < state.keyFunState.length; i++) {
      if (state.keyFunState[i].key === keyCode && state.keyFunState[i].selected == true) {
        style = 'selected'
        break;
      }
    }
    return style;
  }

  const initFunState = () => {
    for (var i = 0; i < state.keyFunList.length; i++) {
      for (var j = 0; j < state.keyFunList[i].keys.length; j++) {
        state.keyFunState.push({ selected: false, key: state.keyFunList[i].keys[j].key });
      }
    }
  }

  const keyMatrixGotten = async (event: any) => {
    KeyMatrixData.value = event.detail as Record<number, KeyMatrix>;

    console.log(`Layer ${keyMatrixLayer.value}`);

    // if (rk_l87.value != undefined) {
    //   let tmp = storage.get('macro') as Macros;
    //   if (macros != undefined && tmp != null) {
    //     let ms = new Macros();
    //     for (let m of tmp.macroList) {
    //       let tm = new Macro(m.name);
    //       for (let a of m.actions) {
    //         let ta = new Action(a.key, a.delay, a.action, a.type);
    //         tm.add(ta);
    //       }
    //       ms.add(tm);
    //     }
    //     rk_l87.value.data.macros = ms;
    //     macros.value = rk_l87.value.data.macros;
    //     macro.value = macros.value.get()[0];
    //     refresh();
    //   } else {
    //     await rk_l87.value.getMacros();
    //   }
    // }
  }

  const refresh = () => {
    let line, key: any;
    for (line in state.keyMatrix) {
      for (key in state.keyMatrix[line].keys) {
        let keyData = state.keyMatrix[line].keys[key].keyData;
        if (keyData == undefined) continue;
        KeyMatrixData.value[keyMatrixLayer.value]?.fillKeyMappingData(state.keyMatrix[line].keys[key].index, keyData.keyMappingData);
        keySetStr(keyData);
      }
    }

    if (state.profileList.length > 0) {
      state.profileList.splice(0, state.profileList.length);
    }

    let i: number
    for (i = 0; i < ps.list.length; i++) {
      (state.profileList as Array<Profile>).push(ps.list[i]);
    }
  }

  const refreshKeyMatrixData = () => {
    let key: any;
    let index: any;
    if (keyboard.keyboardDefine != undefined) {
      for (index in keyboard.keyboardDefine.keyMatrixLayer) {
        let layer = keyboard.keyboardDefine.keyMatrixLayer[index];
        for (key in keyboard.state.keyTableData[layer]) {
          let keyData = keyboard.state.keyTableData[layer][key];
          KeyMatrixData.value[layer].setKeyMapping(keyData.index, keyData.keyMappingData);
        }
      }
    }
  }

  const setToFactory = async () => {
    if (rk_l87.value != undefined) {
      keyboard.loadDefaultValue(keyboard.state.keyTableData, keyboard.state.lightInfo);
      refreshKeyMatrixData();
      await rk_l87.value.setFactory();
      storage.clear();
      getProfiles();
      await rk_l87.value.setProfile(0);
      if (keyboard.keyboardDefine != undefined) {
        let index: any;
        for (index in keyboard.keyboardDefine.keyMatrixLayer) {
          let layer = keyboard.keyboardDefine.keyMatrixLayer[index];
          await rk_l87.value.setKeyMatrix(layer, MatrixTable.WIN, 0);
        }
      }
    }
  }

  const keySetStr = (keyData: KeyTableData) => {
    let mapping = keyData.keyMappingData;
    switch (mapping.keyMappingType) {
      case KeyMappingType.KeyBoard:
        if (keyboard.keyboardDefine != undefined) {
          mapping.keyStr = '';
          if (mapping.keyMappingPara > 0) {
            let add = mapping.keyCode > 0 ? ' + ' : '';
            mapping.keyStr = `${keyboard.keyboardDefine.keyText[mapping.keyRaw]}${add}`;
          }
          mapping.keyStr = `${mapping.keyStr}${keyboard.keyboardDefine.keyText[mapping.keyCode]}`;
        }
        break;
      case KeyMappingType.Mousue:
      case KeyMappingType.Media:
      case KeyMappingType.DPIKey:
      case KeyMappingType.ProfileSwitch:
      case KeyMappingType.SpecialFun:
      case KeyMappingType.LightSwitch:
      case KeyMappingType.ReportRate:
      case KeyMappingType.FnKey:
      case KeyMappingType.LodKey:
        if (keyboard.keyboardDefine != undefined && keyboard.keyboardDefine.keyText[mapping.keyRaw] != undefined) {
          mapping.keyStr = `${keyboard.keyboardDefine.keyText[mapping.keyRaw]}`;
        } else {
          mapping.keyStr = 'Unknow';
        }
        break;
      case KeyMappingType.Custom:
        mapping.keyStr = `Define ${mapping.keyCode}`;
        break;
      case KeyMappingType.Macro:
        if (macros.value != undefined) {
          mapping.keyStr = macros.value.get()[mapping.keyCode & 0xFF].name;
        }
        break;
      default:
        mapping.keyStr = `Unknow`;
        break;
    }
  };

  const keyText = (keyData: KeyTableData | undefined): String => {
    return keyData == undefined ? '' : keyData.keyMappingData.keyStr;
  };

  const keyColor = (key: KeyTableData | undefined): string => {
    return key == undefined ? '' : 'bg-white';
  };

  const keybgColor = (key: KeyTableData | undefined): string => {
    let c = '';
    if (key != undefined) {
      let mapping = key.keyMappingData;
      switch (mapping.keyMappingType) {
        case KeyMappingType.Macro:
          c = 'key_remapped';
          break;
        default:
          c = key.keyCode == mapping.keyRaw ? '' : 'key_remapped';
          break;
      }
    }
    return c;
  };

  const isSelected = (index: number): string => {
    if (state.keyState.length <= 0 || index >= 999) return '';
    return !(state.keyState as Array<KeyState>)[index].selected ? '' : 'selected';
  }

  const keyClick = (index: number) => {
    if (state.keyState.length <= 0 || index >= 999) return '';
    let isSelected = (state.keyState as Array<KeyState>)[index].selected;
    (state.keyState as Array<KeyState>)[index].selected = !isSelected;
  }

  const unSelected = (): void => {
    let i: any;
    for (i in state.keyState) {
      (state.keyState as Array<KeyState>)[i].selected = false;
    }
  }

  const mapping = (keyCode: KeyDefineEnum) => {
    //let key = undefined;
    let i: any;
    for (i in state.keyState) {
      if ((state.keyState as Array<KeyState>)[i].selected) {
        //key = (state.keyState as Array<KeyState>)[i];
        break;
      }
    }

    if ((state.keyState as Array<KeyState>)[i] != undefined) {
      let key = (state.keyState as Array<KeyState>)[i];
      key.KeyData.keyMappingData.keyRaw = keyCode;
      key.KeyData.keyMappingData.keyCode = keyCode & 0x0000FFFF;
      key.KeyData.keyMappingData.keyMappingType = keyCode >> 24;
      key.KeyData.keyMappingData.keyMappingPara = (keyCode >> 16) & 0xFF;
      if (keyboard.keyboardDefine != undefined) {
        key.KeyData.keyMappingData.keyStr = keyboard.keyboardDefine.keyText[keyCode];
      }
      KeyMatrixData.value[keyMatrixLayer.value]?.setKeyMapping(key.index, key.KeyData.keyMappingData);
      rk_l87.value?.setKeyMatrix(keyMatrixLayer.value, MatrixTable.WIN, 0);
    }
    setSelected(keyCode);
    saveProfile()
  }
  const keySetToDefaultAll = () => {
    let index: any;
    for (index in state.keyState) {
      let kState = state.keyState[index] as KeyState;
      let code = keyboard.keyboardDefine?.keyLayout[keyMatrixLayer.value][index] as number;
      let key: KeyTableData = {
        keyStr: keyboard.keyboardDefine?.keyText[code] as string,
        keyCode: code,
        index: index,
        keyMappingData: fillKeyMappingData(code),

      }
      kState.KeyData = key
      KeyMatrixData.value[keyMatrixLayer.value]?.setKeyMapping(index, kState.KeyData.keyMappingData);
    }
    rk_l87.value?.setKeyMatrix(keyMatrixLayer.value, MatrixTable.WIN, 0);
    saveProfile()
  }

  const fillKeyMappingData = (code: number): KeyMappingData => {
    return {
      keyStr: keyboard.keyboardDefine?.keyText[code] as string,
      keyCode: code & 0x0000FFFF,
      keyMappingType: code >> 24,
      keyMappingPara: (code >> 16) & 0xFF,
      keyRaw: code
    }
  }

  const keySetToDefault = (index: number) => {
    if (state.keyState.length <= 0 || index >= 999) {
      return '';
    }

    let kState = (state.keyState as Array<KeyState>)[index];
    let code = keyboard.keyboardDefine?.keyLayout[keyMatrixLayer.value][index] as number;
    let key: KeyTableData = {
      keyStr: keyboard.keyboardDefine?.keyText[code] as string,
      keyCode: code,
      index: index,
      keyMappingData: fillKeyMappingData(code),

    }
    kState.KeyData = key

    KeyMatrixData.value[keyMatrixLayer.value]?.setKeyMapping(index, kState.KeyData.keyMappingData);
    rk_l87.value?.setKeyMatrix(keyMatrixLayer.value, MatrixTable.WIN, 0);
  }

  const keySetMacro = (index: number) => {
    if (state.keyState.length <= 0 || index >= 999) {
      return '';
    }

    if (rk_l87.value != undefined && macros.value == undefined) {
      macros.value = rk_l87.value.data.macros;
    }

    macro.value = macros.value?.get()[0];
    keyState.value = (state.keyState as Array<KeyState>)[index];
    state.macroDialogShow = true;
  }

  const isMacroSelected = (obj: Macro): string => {
    return obj.index == macro.value?.index ? 'module_active2' : '';
  }

  const clickMacro = (obj: Macro) => {
    macro.value = obj;
  }

  const confirmSetMacro = () => {
    if (keyState.value != undefined && macro.value != undefined) {
      let mapping = keyState.value.KeyData.keyMappingData;
      mapping.keyCode = state.cycleCount << 8 | macro.value?.index;
      mapping.keyStr = macro.value?.name;
      mapping.keyMappingType = KeyMappingType.Macro;
      mapping.keyMappingPara = state.cycleType;
      KeyMatrixData.value[keyMatrixLayer.value]?.setKeyMapping(keyState.value.index, mapping);
      rk_l87.value?.setKeyMatrix(keyMatrixLayer.value, MatrixTable.WIN, 0);
      saveProfile()
    }

    state.macroDialogShow = false;
  }

  const setCombineKey = (index: number) => {
    if (state.keyState.length <= 0 || index >= 999) {
      return '';
    }
    keyState.value = (state.keyState as Array<KeyState>)[index];
    state.combineKeyDialogShow = true;
    state.keyStr = "";
    state.keyHid = 0x00;
    state.shiftKey = false;
    state.ctrlKey = false;
    state.winKey = false;
    state.altKey = false;
  }

  const onKeyDown = (event: KeyboardEvent) => {
    console.log('Key pressed:', `${event.key} | ${event.code} | ${event.keyCode}`);
    event.preventDefault();
    state.keyStr = KeyCodeMap[event.code].key;
    state.keyHid = KeyCodeMap[event.code].hid;
  }

  const confirmSetCombineKey = async () => {
    if (keyState.value != undefined && macro.value != undefined) {
      let mapping = keyState.value.KeyData.keyMappingData;

      mapping.keyMappingType = KeyMappingType.KeyBoard;
      mapping.keyCode = state.keyHid;

      let combine = "";
      if (state.shiftKey) {
        combine = combine + "Shift + ";
        mapping.keyCode = mapping.keyCode | KeyDefineEnum.KEY_L_SHIFT;
      }
      if (state.ctrlKey) {
        combine = combine + "Ctrl + ";
        mapping.keyCode = mapping.keyCode | KeyDefineEnum.KEY_L_CTRL;
      }
      if (state.winKey) {
        combine = combine + "Win + ";
        mapping.keyCode = mapping.keyCode | KeyDefineEnum.KEY_L_WIN;
      }
      if (state.altKey) {
        combine = combine + "Alt + ";
        mapping.keyCode = mapping.keyCode | KeyDefineEnum.KEY_L_ALT;
      }
      combine = combine + state.keyStr;
      mapping.keyStr = combine;
      mapping.keyMappingPara = (mapping.keyCode & 0x00FF0000) >> 16;
      mapping.keyRaw = 0xFFFFFFFF & (mapping.keyMappingType << 24) && (mapping.keyMappingPara << 16) && mapping.keyCode;
      KeyMatrixData.value[keyMatrixLayer.value]?.setKeyMapping(keyState.value.index, mapping);
      await rk_l87.value?.setKeyMatrix(KeyMatrixLayer.Nomal, MatrixTable.WIN, 0);
      saveProfile()
    }

    state.combineKeyDialogShow = false;
  }

  const setMediaKey = (index: number) => {
    if (state.keyState.length <= 0 || index >= 999) {
      return '';
    }
    state.mediaKey = KeyDefineEnum.KEY_Media;
    keyState.value = (state.keyState as Array<KeyState>)[index];
    state.mediaKeyDialogShow = true;
  }

  const confirmMediaKey = (keyCode: KeyDefineEnum) => {
    if (keyState.value != undefined && keyCode > 0) {
      keyState.value.KeyData.keyMappingData.keyRaw = keyCode;
      keyState.value.KeyData.keyMappingData.keyCode = keyCode & 0x0000FFFF;
      keyState.value.KeyData.keyMappingData.keyMappingType = keyCode >> 24;
      keyState.value.KeyData.keyMappingData.keyMappingPara = (keyCode >> 16) & 0xFF;
      if (keyboard.keyboardDefine != undefined) {
        keyState.value.KeyData.keyMappingData.keyStr = keyboard.keyboardDefine.keyText[keyCode];
      }
      KeyMatrixData.value[keyMatrixLayer.value]?.setKeyMapping(keyState.value.index, keyState.value.KeyData.keyMappingData);
      rk_l87.value?.setKeyMatrix(keyMatrixLayer.value, MatrixTable.WIN, 0);
    }

    state.mediaKeyDialogShow = false;
  }
  return { profile, state, keyMatrixLayer, keyClick, keyColor, isSelected, keybgColor, keyText, keySetToDefault, keySetMacro, mapping, isFunSelected, isMacroSelected, clickMacro, confirmSetMacro, setCombineKey, confirmMediaKey, setMediaKey, confirmSetCombineKey, getKeyMatrix, clickProfile, deleteProfile, onKeyDown, newProfile, handleEditClose, renameProfile, exportProfile, importProfile, init, destroy, getKeyMatrixNomal, saveProfile, keySetToDefaultAll, refresh, refreshKeyMatrixData, setToFactory, unSelected, renameSaveProfile, setFunid }
})