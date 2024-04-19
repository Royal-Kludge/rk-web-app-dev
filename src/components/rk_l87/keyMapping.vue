<template>
    <div class="d-flex">
        <div class="d-flex flex-column">
            <div class="d-flex jc-start mr-3" v-for="line in state.keyMaxtrix">
                <div style="cursor: pointer;"
                     v-for=" key in line"
                     :class="[`d-flex key flex-column jc-center ai-center ${key.style}`, keyColor(key.keyData)]">
                    <div :class="[`d-flex`]">
                        <span>{{ keyText(key.keyData) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.key {
    border-radius: 5px;
    color: #16191d;
    font-size: 12px;
    font-weight: 100;
    width: 32px;
    height: 32px;
    margin: 1px; 
}

.split1 {
    width: 5px !important;
}

.split2 {
    width: 8px !important;
}
</style>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue';
import { keyboard } from '../../keyboard/keyboard'
import { Protocol_RK_L87 } from '../../keyboard/rk_l87';
import { KeyDefineEnum } from '../../keyboard/keyCode'
import { type KeyTableData } from '../../keyboard/interface'

const protocol = ref<Protocol_RK_L87>();

const getKeyData = (key: KeyDefineEnum): KeyTableData | undefined => {
    let keyData = undefined;
    let i: any;
    for (i in keyboard.state.keyTableData) {
        if (keyboard.state.keyTableData[i].keyCode == key) {
            keyData = keyboard.state.keyTableData[i];
            break;
        }
    }
    return keyData;
}

const state = reactive({
    keyMaxtrix: [
        [
            { key: KeyDefineEnum.KEY_ESC,           style: '',          keyData: getKeyData(KeyDefineEnum.KEY_ESC) },
            { key: KeyDefineEnum.NONE,              style: 'split1',    keyData: undefined },
            { key: KeyDefineEnum.KEY_F1,            style: '',          keyData: getKeyData(KeyDefineEnum.KEY_F1) },
            { key: KeyDefineEnum.KEY_F2,            style: '',          keyData: getKeyData(KeyDefineEnum.KEY_F2) },
            { key: KeyDefineEnum.KEY_F3,            style: '',          keyData: getKeyData(KeyDefineEnum.KEY_F3) },
            { key: KeyDefineEnum.KEY_F4,            style: '',          keyData: getKeyData(KeyDefineEnum.KEY_F4) },
            { key: KeyDefineEnum.NONE,              style: 'split1',    keyData: undefined },
            { key: KeyDefineEnum.KEY_F5,            style: '',          keyData: getKeyData(KeyDefineEnum.KEY_F5) },
            { key: KeyDefineEnum.KEY_F6,            style: '',          keyData: getKeyData(KeyDefineEnum.KEY_F6) },
            { key: KeyDefineEnum.KEY_F7,            style: '',          keyData: getKeyData(KeyDefineEnum.KEY_F7) },
            { key: KeyDefineEnum.KEY_F8,            style: '',          keyData: getKeyData(KeyDefineEnum.KEY_F8) },
            { key: KeyDefineEnum.NONE,              style: 'split1',    keyData: undefined },
            { key: KeyDefineEnum.KEY_F9,            style: '',          keyData: getKeyData(KeyDefineEnum.KEY_F9) },
            { key: KeyDefineEnum.KEY_F10,           style: '',          keyData: getKeyData(KeyDefineEnum.KEY_F10) },
            { key: KeyDefineEnum.KEY_F11,           style: '',          keyData: getKeyData(KeyDefineEnum.KEY_F11) },
            { key: KeyDefineEnum.KEY_F12,           style: '',          keyData: getKeyData(KeyDefineEnum.KEY_F12) },
            { key: KeyDefineEnum.NONE,              style: 'split1',    keyData: undefined },
            { key: KeyDefineEnum.KEY_Calculator,    style: '',          keyData: getKeyData(KeyDefineEnum.KEY_Calculator) },
            { key: KeyDefineEnum.NONE,              style: 'split2',    keyData: undefined },
            { key: KeyDefineEnum.KEY_PRINT,         style: '',          keyData: getKeyData(KeyDefineEnum.KEY_PRINT) },
            { key: KeyDefineEnum.KEY_SCRLOCK,       style: '',          keyData: getKeyData(KeyDefineEnum.KEY_SCRLOCK) },
            { key: KeyDefineEnum.KEY_PAUSE,         style: '',          keyData: getKeyData(KeyDefineEnum.KEY_PAUSE) }
        ],
        [
            { key: KeyDefineEnum.KEY_TILDE,         style: '',          keyData: getKeyData(KeyDefineEnum.KEY_TILDE) },
            { key: KeyDefineEnum.KEY_1,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_1) },
            { key: KeyDefineEnum.KEY_2,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_2) },
            { key: KeyDefineEnum.KEY_3,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_3) },
            { key: KeyDefineEnum.KEY_4,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_4) },
            { key: KeyDefineEnum.KEY_5,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_5) },
            { key: KeyDefineEnum.KEY_6,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_6) },
            { key: KeyDefineEnum.KEY_7,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_7) },
            { key: KeyDefineEnum.KEY_8,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_8) },
            { key: KeyDefineEnum.KEY_9,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_9) },
            { key: KeyDefineEnum.KEY_0,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_0) },
            { key: KeyDefineEnum.KEY_Underscore,    style: '',          keyData: getKeyData(KeyDefineEnum.KEY_Underscore) },
            { key: KeyDefineEnum.KEY_EqualSign,     style: '',          keyData: getKeyData(KeyDefineEnum.KEY_EqualSign) },
            { key: KeyDefineEnum.KEY_Backspace,     style: '',          keyData: getKeyData(KeyDefineEnum.KEY_Backspace) },
            { key: KeyDefineEnum.NONE,              style: 'split2',    keyData: undefined },
            { key: KeyDefineEnum.KEY_INS,           style: '',          keyData: getKeyData(KeyDefineEnum.KEY_INS) },
            { key: KeyDefineEnum.KEY_HOME,          style: '',          keyData: getKeyData(KeyDefineEnum.KEY_HOME) },
            { key: KeyDefineEnum.KEY_PGUP,          style: '',          keyData: getKeyData(KeyDefineEnum.KEY_PGUP) }
        ],
        [
            { key: KeyDefineEnum.KEY_TAB,           style: '',          keyData: getKeyData(KeyDefineEnum.KEY_TAB) },
            { key: KeyDefineEnum.KEY_Q,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_Q) },
            { key: KeyDefineEnum.KEY_W,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_W) },
            { key: KeyDefineEnum.KEY_E,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_E) },
            { key: KeyDefineEnum.KEY_R,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_R) },
            { key: KeyDefineEnum.KEY_T,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_T) },
            { key: KeyDefineEnum.KEY_Y,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_Y) },
            { key: KeyDefineEnum.KEY_U,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_U) },
            { key: KeyDefineEnum.KEY_I,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_I) },
            { key: KeyDefineEnum.KEY_O,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_O) },
            { key: KeyDefineEnum.KEY_P,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_P) },
            { key: KeyDefineEnum.KEY_L_Brackets,    style: '',          keyData: getKeyData(KeyDefineEnum.KEY_L_Brackets) },
            { key: KeyDefineEnum.KEY_R_Brackets,    style: '',          keyData: getKeyData(KeyDefineEnum.KEY_R_Brackets) },
            { key: KeyDefineEnum.KEY_CODE29,        style: '',          keyData: getKeyData(KeyDefineEnum.KEY_CODE29) },
            { key: KeyDefineEnum.NONE,              style: 'split2',    keyData: undefined },
            { key: KeyDefineEnum.KEY_DEL,           style: '',          keyData: getKeyData(KeyDefineEnum.KEY_DEL) },
            { key: KeyDefineEnum.KEY_END,           style: '',          keyData: getKeyData(KeyDefineEnum.KEY_END) },
            { key: KeyDefineEnum.KEY_PGDN,          style: '',          keyData: getKeyData(KeyDefineEnum.KEY_PGDN) }
        ],
        [
            { key: KeyDefineEnum.KEY_CAPSLOCK,      style: '',          keyData: getKeyData(KeyDefineEnum.KEY_Q) },
            { key: KeyDefineEnum.KEY_A,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_A) },
            { key: KeyDefineEnum.KEY_S,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_S) },
            { key: KeyDefineEnum.KEY_D,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_D) },
            { key: KeyDefineEnum.KEY_F,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_F) },
            { key: KeyDefineEnum.KEY_G,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_G) },
            { key: KeyDefineEnum.KEY_H,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_H) },
            { key: KeyDefineEnum.KEY_J,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_J) },
            { key: KeyDefineEnum.KEY_K,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_K) },
            { key: KeyDefineEnum.KEY_L,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_L) },
            { key: KeyDefineEnum.KEY_Semicolon,     style: '',          keyData: getKeyData(KeyDefineEnum.KEY_Semicolon) },
            { key: KeyDefineEnum.KEY_Quotation,     style: '',          keyData: getKeyData(KeyDefineEnum.KEY_Quotation) },
            { key: KeyDefineEnum.KEY_ENTER,         style: '',          keyData: getKeyData(KeyDefineEnum.KEY_ENTER) },
            { key: KeyDefineEnum.NONE,              style: 'split2',    keyData: undefined }
        ],
        [
            { key: KeyDefineEnum.KEY_L_SHIFT,       style: '',          keyData: getKeyData(KeyDefineEnum.KEY_L_SHIFT) },
            { key: KeyDefineEnum.KEY_Z,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_Z) },
            { key: KeyDefineEnum.KEY_X,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_X) },
            { key: KeyDefineEnum.KEY_C,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_C) },
            { key: KeyDefineEnum.KEY_V,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_V) },
            { key: KeyDefineEnum.KEY_B,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_B) },
            { key: KeyDefineEnum.KEY_N,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_N) },
            { key: KeyDefineEnum.KEY_M,             style: '',          keyData: getKeyData(KeyDefineEnum.KEY_M) },
            { key: KeyDefineEnum.KEY_COMMA,         style: '',          keyData: getKeyData(KeyDefineEnum.KEY_COMMA) },
            { key: KeyDefineEnum.KEY_PERIOD,        style: '',          keyData: getKeyData(KeyDefineEnum.KEY_PERIOD) },
            { key: KeyDefineEnum.KEY_Interrogation, style: '',          keyData: getKeyData(KeyDefineEnum.KEY_Interrogation) },
            { key: KeyDefineEnum.KEY_R_SHIFT,       style: '',          keyData: getKeyData(KeyDefineEnum.KEY_R_SHIFT) },
            { key: KeyDefineEnum.NONE,              style: 'split2',    keyData: undefined },
            { key: KeyDefineEnum.KEY_UpArrow,       style: '',          keyData: getKeyData(KeyDefineEnum.KEY_UpArrow) },
            { key: KeyDefineEnum.NONE,              style: '',          keyData: undefined }
        ],
        [
            { key: KeyDefineEnum.KEY_L_CTRL,        style: '',          keyData: getKeyData(KeyDefineEnum.KEY_L_CTRL) },
            { key: KeyDefineEnum.KEY_L_WIN,         style: '',          keyData: getKeyData(KeyDefineEnum.KEY_L_WIN) },
            { key: KeyDefineEnum.KEY_L_ALT,         style: '',          keyData: getKeyData(KeyDefineEnum.KEY_L_ALT) },
            { key: KeyDefineEnum.KEY_SPACEBAR,      style: '',          keyData: getKeyData(KeyDefineEnum.KEY_SPACEBAR) },
            { key: KeyDefineEnum.KEY_R_ALT,         style: '',          keyData: getKeyData(KeyDefineEnum.KEY_R_ALT) },
            { key: KeyDefineEnum.KEY_Fn1,           style: '',          keyData: getKeyData(KeyDefineEnum.KEY_Fn1) },
            { key: KeyDefineEnum.KEY_APP,           style: '',          keyData: getKeyData(KeyDefineEnum.KEY_APP) },
            { key: KeyDefineEnum.KEY_R_CTRL,        style: '',          keyData: getKeyData(KeyDefineEnum.KEY_R_CTRL) },
            { key: KeyDefineEnum.NONE,              style: 'split2',    keyData: undefined },
            { key: KeyDefineEnum.KEY_LeftArrow,     style: '',          keyData: getKeyData(KeyDefineEnum.KEY_LeftArrow) },
            { key: KeyDefineEnum.KEY_DownArrow,     style: '',          keyData: getKeyData(KeyDefineEnum.KEY_DownArrow) },
            { key: KeyDefineEnum.KEY_RightArrow,    style: '',          keyData: getKeyData(KeyDefineEnum.KEY_RightArrow) },
            { key: KeyDefineEnum.NONE,              style: '',          keyData: undefined }
        ]
    ],
});

onMounted(async () => {
    protocol.value = (keyboard.protocol as Protocol_RK_L87);
    let line, item: any;
    await getKeyMappingData();
});

const getKeyMappingData = async () => {

};

const refresh = () => {
};

const keyText = (key: KeyTableData | undefined): String => {
    return key == undefined ? '' : key.keyMappingData.key;
};

const keyColor = (key: KeyTableData | undefined): string => {
    return key == undefined ? "" : "bg-white";
};
</script>