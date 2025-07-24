import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { keyboard } from '@/keyboard/sparklink/keyboard'
import { RK_C61 } from '@/keyboard/sparklink/rk_c61/rk_c61';
import { LightDirectionEnum, LightEffectEnum, LightModeEnum, LightSwitchEnum } from '@/keyboard/sparklink/enum'
import { ConnectionType, ConnectionEventEnum, ConnectionStatusEnum } from '@/device/enum'
import { type KeyInfo } from '@/keyboard/sparklink/interface';

export const uselightStore = defineStore('lightinfo_rk_c61', () => {
    const rgb = ref({ r: 0, g: 0, b: 0, color: '#000000' });
    const rk_c61 = ref<RK_C61>();
    const connectType = ref<ConnectionType>()

    const state = reactive({
        lightEffects: [
            { light: LightEffectEnum.Off, label: 'light.Off' },
            { light: LightEffectEnum.M1, label: 'light.M1' },
            { light: LightEffectEnum.M2, label: 'light.M2' },
            { light: LightEffectEnum.M3, label: 'light.M3' },
            { light: LightEffectEnum.M4, label: 'light.M4' },
            { light: LightEffectEnum.M5, label: 'light.M5' },
            { light: LightEffectEnum.M6, label: 'light.M6' },
            { light: LightEffectEnum.M7, label: 'light.M7' },
            { light: LightEffectEnum.M8, label: 'light.M8' },
            { light: LightEffectEnum.M9, label: 'light.M9' },
            { light: LightEffectEnum.M10, label: 'light.M10' },
            { light: LightEffectEnum.M11, label: 'light.M11' },
            { light: LightEffectEnum.M12, label: 'light.M12' },
            { light: LightEffectEnum.M13, label: 'light.M13' },
            { light: LightEffectEnum.M14, label: 'light.M14' },
            { light: LightEffectEnum.M15, label: 'light.M15' },
            { light: LightEffectEnum.M16, label: 'light.M16' },
            { light: LightEffectEnum.M17, label: 'light.M17' },
            { light: LightEffectEnum.M18, label: 'light.M18' },
            { light: LightEffectEnum.M19, label: 'light.M19' },
            { light: LightEffectEnum.M20, label: 'light.M20' },
            { light: LightEffectEnum.Static, label: 'light.Static' },
            { light: LightEffectEnum.SelfDefine, label: 'light.SelfDefine' },
        ],
        lightProps: {
            mode: LightModeEnum.Disable,
            light: LightEffectEnum.Off,
            brightness: 0,
            speed: 0,
            sleep: 0,
            staticIndex: 0,
            reverse: false,
            staticColors: Array.from<any>({ length: 7 })
        },
        layer: 0,
        debounce: 0
    });

    const isInited = ref(false);

    const init = async () => {
        connectType.value = keyboard.state.connectType;
        if (rk_c61.value == undefined) {
            rk_c61.value = (keyboard.protocol as RK_C61);
            keyboard.addEventListener("connection", connectionEventCallback);
        }

        if (rk_c61.value != undefined && !isInited.value) {
            state.lightProps.brightness = rk_c61.value.data.lightSetting.lightBrightness;
            state.lightProps.speed = rk_c61.value.data.lightSetting.lightSpeed;
            state.lightProps.sleep = rk_c61.value.data.lightSetting.lightSleepDelay;
            state.lightProps.light = rk_c61.value.data.lightSetting.lightMode;
            state.lightProps.mode = rk_c61.value.data.lightSetting.lightBigMode;
            state.lightProps.staticIndex = rk_c61.value.data.lightSetting.staticLightMode;
            state.lightProps.reverse = rk_c61.value.data.lightSetting.lightDirection == LightDirectionEnum.Reverse;

            state.lightProps.staticColors.splice(0, state.lightProps.staticColors.length);
            for (let i = 0; i < rk_c61.value.data.lightSetting.lightColorList.length; i++) {
                state.lightProps.staticColors.push({
                    index: i,
                    color: rk_c61.value.data.lightSetting.lightColorList[i],
                    text: `Color ${i + 1}`
                });
            }

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
        if (keyboard.state.ConnectionStatus != ConnectionStatusEnum.Connected) {
            keyboard.removeEventListener("connection", connectionEventCallback);
            isInited.value = false;
            rk_c61.value = undefined;
        }
    };

    const refresh = async () => {

    };

    const ligtChanged = async () => {
        if (rk_c61.value != undefined) {
            rk_c61.value.data.lightSetting.lightBrightness = state.lightProps.brightness;
            rk_c61.value.data.lightSetting.lightSpeed = state.lightProps.speed;
            rk_c61.value.data.lightSetting.lightSleepDelay = state.lightProps.sleep;
            rk_c61.value.data.lightSetting.lightDirection = state.lightProps.reverse ? LightDirectionEnum.Reverse : LightDirectionEnum.Forward;
            await rk_c61.value.setPrgb();
            await refresh();
        }
    };

    const setAllToDefault = async (keyInfos: Array<KeyInfo>) => {
        if (rk_c61.value != undefined && keyboard.keyboardDefine != undefined) {
            for (let i = 0; i < keyInfos.length; i++) {
                const keyInfo = keyInfos[i];
                if (keyInfo != null && keyInfo != undefined) {
                    let def = keyboard.keyboardDefine.keyLayout[keyInfo.row][keyInfo.col];
                    if (def != null && def != undefined) {
                        keyInfo.color.red = def.color.red;
                        keyInfo.color.green = def.color.green;
                        keyInfo.color.blue = def.color.blue;
                        keyInfo.color.color = getColorString(keyInfo.color.red, keyInfo.color.green, keyInfo.color.blue);
                    }
                }
            }

            if (rk_c61.value != undefined) {
                await refresh();
                if (state.lightProps.mode != LightModeEnum.Disable && state.lightProps.light == LightEffectEnum.SelfDefine) {
                    await rk_c61.value.setKrgb();
                }
            }
        }
    }

    const onPicking = (r: any, g: any, b: any, keyInfo: KeyInfo | null) => {
        if (state.lightProps.mode == LightModeEnum.Custom && keyInfo != null) {
            keyInfo.color.red = rgb.value.r;
            keyInfo.color.green = rgb.value.g;
            keyInfo.color.blue = rgb.value.b;
            keyInfo.color.color = getColorString(rgb.value.r, rgb.value.g, rgb.value.b);
        } else if (state.lightProps.mode == LightModeEnum.Static) {
            let color = state.lightProps.staticColors[state.lightProps.staticIndex].color;
            color.red = rgb.value.r;
            color.green = rgb.value.g;
            color.blue = rgb.value.b;
            color.color = getColorString(rgb.value.r, rgb.value.g, rgb.value.b);
        }
    };

    const onPicked = async (keyInfos: Array<KeyInfo>) => {
        if (rk_c61.value != undefined) {
            await refresh();
            if (state.lightProps.mode != LightModeEnum.Disable) {
                if (state.lightProps.light == LightEffectEnum.SelfDefine && keyInfos != null && keyInfos.length > 0) {
                    await rk_c61.value.setKeyKrgb(keyInfos);
                } else if (state.lightProps.light == LightEffectEnum.Static) {
                    let color = state.lightProps.staticColors[state.lightProps.staticIndex].color;
                    rk_c61.value.data.lightSetting.lightColorList[state.lightProps.staticIndex].red = color.red;
                    rk_c61.value.data.lightSetting.lightColorList[state.lightProps.staticIndex].green = color.green;
                    rk_c61.value.data.lightSetting.lightColorList[state.lightProps.staticIndex].blue = color.blue;
                    rk_c61.value.data.lightSetting.lightColorList[state.lightProps.staticIndex].color = getColorString(color.red, color.green, color.blue);
                    await rk_c61.value.setPrgb();
                }
            }
        }
    };

    const lightClick = async (light: LightEffectEnum) => {
        if (rk_c61.value != undefined) {
            state.lightProps.light = light;
            if (state.lightProps.light == LightEffectEnum.Off) {
                state.lightProps.mode = LightModeEnum.Disable;
            } else if (state.lightProps.light == LightEffectEnum.Static) {
                state.lightProps.mode = LightModeEnum.Static;
                let index = rk_c61.value.data.lightSetting.staticLightMode;
                rgb.value.r = rk_c61.value.data.lightSetting.lightColorList[index].red;
                rgb.value.g = rk_c61.value.data.lightSetting.lightColorList[index].green;
                rgb.value.b = rk_c61.value.data.lightSetting.lightColorList[index].blue;
            } else if (state.lightProps.light == LightEffectEnum.SelfDefine) {
                state.lightProps.mode = LightModeEnum.Custom;
            } else {
                state.lightProps.mode = LightModeEnum.Dynamics;
            }

            rk_c61.value.data.lightSetting.lightMode = state.lightProps.light;
            rk_c61.value.data.lightSetting.lightBigMode = state.lightProps.mode;
            rk_c61.value.data.lightSetting.lightSwitch = state.lightProps.mode == LightModeEnum.Disable ? LightSwitchEnum.Off : LightSwitchEnum.On;

            await rk_c61.value.setPrgb();
            await refresh();
        }
    };

    const selectd = (light: LightEffectEnum) => {
        let style = '';
        if (light == state.lightProps.light) {
            style = 'module_active';
        }

        return style;
    };

    const selectdCustom = (light: LightEffectEnum) => {
        let style = '';
        if (light == state.lightProps.light) {
            style = 'active';
        }

        return style;
    };

    const getColorString = (r: number, g: number, b: number): string => {
        return `#${r.toString(16).toUpperCase().padStart(2, '0')}${g.toString(16).toUpperCase().padStart(2, '0')}${b.toString(16).toUpperCase().padStart(2, '0')}`;
    }

    const setSelectedKeyColor = async (keyInfos: Array<KeyInfo>) => {
        for (let i in keyInfos) {
            keyInfos[i].color.red = rgb.value.r;
            keyInfos[i].color.green = rgb.value.g;
            keyInfos[i].color.blue = rgb.value.b;
            keyInfos[i].color.color = getColorString(rgb.value.r, rgb.value.g, rgb.value.b);
        }

        if (rk_c61.value != undefined) {
            await rk_c61.value.setKeyKrgb(keyInfos);
        }
    }

    const lightModeChange = async (index: number) => {
        if (rk_c61.value != undefined) {
            rk_c61.value.data.lightSetting.staticLightMode = index;
            rgb.value.r = rk_c61.value.data.lightSetting.lightColorList[index].red;
            rgb.value.g = rk_c61.value.data.lightSetting.lightColorList[index].green;
            rgb.value.b = rk_c61.value.data.lightSetting.lightColorList[index].blue;
            await rk_c61.value.setPrgb();
        }
    }

    return {
        connectType,
        state,
        rgb,
        ligtChanged,
        onPicking,
        onPicked,
        selectd,
        lightClick,
        selectdCustom,
        init,
        destroy,
        setAllToDefault,
        refresh,
        setSelectedKeyColor,
        lightModeChange
    }
})