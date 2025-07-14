import { ConnectionEventEnum, ConnectionStatusEnum } from "@/device/enum";
import { type KeyCmdValue, type KeyInfo, type PerformanceData } from "@/keyboard/sparklink/interface";
import { keyboard } from "@/keyboard/sparklink/keyboard";
import type { RK_C61 } from "@/keyboard/sparklink/rk_c61/rk_c61";
import { ps } from "@/keyboard/sparklink/profiles";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { KeyTableData } from "@/keyboard/sparklink/keyTableData";

export const usePerformanceStore = defineStore("Performanceinfo_rk_c61", () => {
    const rk_c61 = ref<RK_C61>();
    const isInited = ref(false);
    const adjustingCount = ref(-1);
    const keyPressTestCount = ref(-1);
    const travelTestOn = ref(false);
    const isAdjusting = ref(false);
    const performanceData = ref<PerformanceData>({
            PerformancePage: 0,
            precision: 0.1, // 键盘行程精度
            decimalPlace: 2, // 行程显示的小数位
            minTouchTravel: 0.1, // 最小触发行程(方法中有使用，待移植方法)
            maxTouchTravel: 4.0, // 最大触发行程(方法中有使用，待移植方法)
            globalTouchTravel: 1.5, // 全局触发行程
            singleTouchTravel: 1.5, // 单键触发行程
            singleTouchRelease: 1.5, // 单键释放行程(特殊)
            pressDead: 0.2, // 按压死区
            releaseDead: 0.2, // 抬起死区
            topDeadSwitch: false, // 顶部死区开关
            pressDeadOptimizeSwitch: false, // 按压死区优化
            releaseDesdOptimizeSwitch: false, // 抬起死区优化
            rateOfReturn: -1, // 回报率
            quickTouchPress: 0.3, // 快速触发按下行程
            quickTouchRelease: 0.3, // 快速触发抬起行程
            quickTouchSwitchDisable: true, // (方法中有使用，待移植方法)
            quickTouchSwitch: false, // (方法中有使用，待移植方法)
            isAdjusting: false, // 是否开启校准
            adjustingCount: 0, // 校准计数触发器
            travelTestOn: false, // 行程测试
            keyPressTestCount: 0, // 按键测试计数触发器
            hasAxisSetting: false,
        });
    const state = reactive({
        pressStatus: 0,
        maxMM: 0,
        menuid: 1,
        menuList: [
            { id: 1, title: "普通模式", style: "" },
            { id: 2, title: "RT模式", style: "" },
            { id: 3, title: "高级设置", style: "" },
            { id: 4, title: "键盘校准", style: "" },
        ],
        rewardList: [
            {
                value: 0,
                label: "8KHz",
            },
            {
                value: 1,
                label: "4KHz",
            },
            {
                value: 2,
                label: "2KHz",
            },
            {
                value: 3,
                label: "1KHz",
            },
            {
                value: 4,
                label: "500Hz",
            },
            {
                value: 5,
                label: "250Hz",
            },
            {
                value: 6,
                label: "125Hz",
            },
        ],
        reward: "8KHz"
    });

    // setInterval(function () {
    //     adjustingCount.value = Math.random() * 3;
    // }, 1000);

    const init = async () => {
        if (rk_c61.value == undefined) {
            rk_c61.value = keyboard.protocol as RK_C61;
            performanceData.value = rk_c61.value.data.performanceData;
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
        if (keyboard.state.ConnectionStatus != ConnectionStatusEnum.Connected) {
            keyboard.removeEventListener("connection", connectionEventCallback);
            isInited.value = false;
            rk_c61.value = undefined;
        }
    };

    const setMenuid = (id: number) => {
        state.menuid = id;
    };

    const globalTouchTravelChange = (value: number) => {
        if (rk_c61.value != undefined) {
            rk_c61.value.data.keyInfoData.updateKeyInfoGlobalTouchTravel(value);
            rk_c61.value.setDB();
            ps.save();
        }
    };

    const singleTouchTravelChange = (value: number) => {
        if (rk_c61.value != undefined) {
            let cmd = rk_c61.value.data.keyInfoData.updateKeyInfoSingleTouchTravel(value);
            if (cmd.length > 0) {
                rk_c61.value.setKeyValues(cmd);
                ps.save();
            }
        }
    };

    const RTFirstTouchTravelChange = (value: number) => {
        if (rk_c61.value != undefined) {
            let cmd = rk_c61.value.data.keyInfoData.updateKeyInfoRTFirstTouchTravel(value);
            if (cmd.length > 0) {
                rk_c61.value.setKeyValues(cmd);
                ps.save();
            }
        }
    };

    const quickTouchPressTravelChange = (value: number) => {
        if (rk_c61.value != undefined) {
            let cmd = rk_c61.value.data.keyInfoData.updateKeyCheckedQuickTouchPressTravel(value);
            if (cmd.length > 0) {
                rk_c61.value.setKeyValues(cmd);
                ps.save();
            }
        }
    };

    const quickTouchReleaseTravelChange = (value: number) => {
        if (rk_c61.value != undefined) {
            let cmd = rk_c61.value.data.keyInfoData.updateKeyCheckedQuickTouchReleaseTravel(value);
            if (cmd.length > 0) {
                rk_c61.value.setKeyValues(cmd);
                ps.save();
            }
        }
    };

    const deadPressChange = (value: number) => {
        if (rk_c61.value != undefined) {
            let cmd = rk_c61.value.data.keyInfoData.updateKeyCheckedDeadPress(value);
            if (cmd.length > 0) {
                rk_c61.value.setKeyValues(cmd);
                ps.save();
            }
        }
    };
    
    const deadReleaseChange = (value: number) => {
        if (rk_c61.value != undefined) {
            let cmd = rk_c61.value.data.keyInfoData.updateKeyCheckedDeadRelease(value);
            if (cmd.length > 0) {
                rk_c61.value.setKeyValues(cmd);
                ps.save();
            }
        }
    };

    const reportRateChange = (value: number) => {
        if (rk_c61.value != undefined) {
            ps.save();
            rk_c61.value.setReportRate();
        }
    };

    const keyTravelModeText = (keyInfo: KeyInfo | undefined): String => {
        let str = 'performance.keyTip.globalTravel';

        if (keyInfo != undefined) {
            if (keyInfo.isQuickTouch) {
                str = 'performance.keyTip.rapidTrigger';
            } else if (keyInfo.isSingleTouch) {
                str = 'performance.keyTip.singleKeyTravel';
            }
        }

        return str;
    };

    const resetToGlobalTravel = () => {
        if (rk_c61.value != undefined) {
            let cmd = rk_c61.value.data.keyInfoData.resetTravel();
            if (cmd.length > 0) {
                rk_c61.value.setKeyValues(cmd);
                ps.save();
            }
        }
    };

    const isSingleTouch = (keyData: KeyTableData | undefined): boolean => {
        if (keyData == undefined) return false;
        return keyData.keyInfo.isSingleTouch;
    };

    const isQuickTouch = (keyData: KeyTableData | undefined): boolean => {
        if (keyData == undefined) return false;
        return keyData.keyInfo.isQuickTouch;
    };
    
    const resetAdjustingData = () => {
        if (rk_c61.value != undefined) {
            rk_c61.value.data.keyInfoData.clearAdjustingSuccessData();
        }
    };

    return { 
        state,
        adjustingCount,
        keyPressTestCount,
        travelTestOn,
        isAdjusting,
        performanceData,
        setMenuid,
        init,
        resetToGlobalTravel,
        globalTouchTravelChange,
        singleTouchTravelChange,
        RTFirstTouchTravelChange,
        quickTouchPressTravelChange,
        quickTouchReleaseTravelChange,
        deadPressChange,
        deadReleaseChange,
        reportRateChange,
        keyTravelModeText,
        isSingleTouch,
        isQuickTouch,
        resetAdjustingData,
        destroy
    };
});
