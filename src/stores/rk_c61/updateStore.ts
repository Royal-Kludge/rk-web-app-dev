import { defineStore } from "pinia";
import { RK_C61_EVENT_DEFINE, type RK_C61 } from "@/keyboard/sparklink/rk_c61/rk_c61";
import { keyboard } from "@/keyboard/sparklink/keyboard";
import { BL_Controls, RunModeEnum, UpdateTypeEnum } from "@/keyboard/sparklink/enum";
import { ConnectionEventEnum, ConnectionStatusEnum } from "@/device/enum";
import { LOG_TYPE, Logging } from "@/common/logging";
import { ElNotification } from 'element-plus';
import tool from "@/keyboard/sparklink/tool";
import { storage } from "@/common/storage";

export const useUpdateStore = defineStore("updateStore_rk_c61", {
    state: () => ({
        rk_c61: undefined as (RK_C61 | undefined),
        isInited: false,
        isUpdateLoading: false,
        updateType: UpdateTypeEnum.None,
        upgradeProgress: 0,
        updateText: "",
        rebootDialog: false,
        successDialog: false,
        timerCount: 3,
        fwSize: 0,
        fwData: [],
        updateCount: 0,
        crc: 0,
        crc16: 0,
        //updateFwBuff: [],
        keyboardInfo: {
            name: "",
            sn: "",
            varsion: "",
            mode: 0
        },
        t: null as any,
    }),
    actions: {
        async init() {
            if (this.rk_c61 == undefined) {
                let protocol = keyboard.protocol as (RK_C61 | undefined);
                if (protocol != undefined) {
                    this.rk_c61 = protocol;
                    keyboard.addEventListener("connection", this.connectionEventCallback);
                }
            }

            if (this.rk_c61 != undefined && !this.isInited) {
                this.rk_c61.addEventListener(RK_C61_EVENT_DEFINE.OnSigned, this.onSigned);
                this.rk_c61.addEventListener(RK_C61_EVENT_DEFINE.OnErase, this.onErase);
                this.rk_c61.addEventListener(RK_C61_EVENT_DEFINE.OnWrite, this.onWrite);
                this.rk_c61.addEventListener(RK_C61_EVENT_DEFINE.OnRcrc, this.onRcrc);

                this.isUpdateLoading = false,
                this.updateType = UpdateTypeEnum.None,
                this.upgradeProgress = 0,
                this.updateText = "",
                this.rebootDialog = false,
                this.successDialog = false,
                this.timerCount =  3,
                this.fwSize =  0,
                this.fwData =  [],
                this.updateCount =  0,
                this.crc =  0,
                this.crc16 = 0,
                this.isInited = true;
            }
        },

        async connectionEventCallback(event: Event) {
            switch (keyboard.state.connectionEvent) {
                case ConnectionEventEnum.Disconnect:
                case ConnectionEventEnum.Close:
                    this.destroy();
                    break;
            }
        },

        destroy() {
            if (keyboard.state.ConnectionStatus != ConnectionStatusEnum.Connected) {
                keyboard.removeEventListener("connection", this.connectionEventCallback);
            }

            this.isInited = false;
            if (this.rk_c61 != undefined) {
                this.rk_c61.removeEventListener(RK_C61_EVENT_DEFINE.OnSigned, this.onSigned);
                this.rk_c61.removeEventListener(RK_C61_EVENT_DEFINE.OnErase, this.onErase);
                this.rk_c61.removeEventListener(RK_C61_EVENT_DEFINE.OnWrite, this.onWrite);
                this.rk_c61.removeEventListener(RK_C61_EVENT_DEFINE.OnRcrc, this.onRcrc);
                this.rk_c61 = undefined;
            }
        },

        async signFor(forWhat: BL_Controls, data: any) {
            if (this.rk_c61 != undefined) {
                this.rk_c61.data.signFor = forWhat;
                await this.rk_c61.setSign(BL_Controls.BL_SIGN, new Uint8Array(data));
            }
        },

        async onSigned(event: any) {
            let isSuccess = event.detail.isSuccess as boolean;
            let unlock = event.detail.unlock as BL_Controls;
            let signture = event.detail.signture as Uint8Array;

            if (this.rk_c61 != undefined) {
                this.isUpdateLoading = true;
                if (isSuccess) {
                    if (unlock == BL_Controls.BL_SIGN) {
                        switch (this.rk_c61.data.signFor) {
                            case BL_Controls.BL_ERASE:
                                this.updateText = "[固件升级]解锁擦除[0x03]...";
                                await this.rk_c61.setSign(BL_Controls.BL_ERASE, signture);
                                break;
                            case BL_Controls.BL_REBOOT:
                                this.updateText = "[固件升级]解锁重启[0x04]...";
                                await this.rk_c61.setSign(BL_Controls.BL_REBOOT, signture);
                                break;
                            case BL_Controls.BL_TOBOOT:
                                this.updateText = "[固件升级]解锁跳转APP[0x05]...";
                                await this.rk_c61.setSign(BL_Controls.BL_TOBOOT, signture);
                                break;
                            case BL_Controls.BL_WRITE:
                                this.updateText = "[固件升级]解锁写[0x06]...";
                                await this.rk_c61.setSign(BL_Controls.BL_WRITE, signture);
                                break;
                        }
                    } else {
                        switch (unlock) {
                            case BL_Controls.BL_ERASE:
                                this.updateText = "[固件升级]擦除...";
                                await this.rk_c61.setErase();
                                break;
                            case BL_Controls.BL_REBOOT:
                                storage.clear();
                                this.updateText = "[固件升级]重启...";
                                this.rebootDialog = true;
                                break;
                            case BL_Controls.BL_TOBOOT:
                                this.updateText = "[固件升级]跳转APP...";
                                //this.successDialog = true;
                                await this.rk_c61.setToApp(this.fwSize, this.crc);
                                ElNotification({
                                    title: 'Success',
                                    message: this.t("set.title_13"),
                                    type: 'success',
                                });
                                this.isUpdateLoading = false;
                                break;
                            case BL_Controls.BL_WRITE:
                                this.updateText = "[固件升级]开始写入固件...";
                                this.updateCount = 0;
                                this.upgradeProgress = 0;
                                this.crc = 0;
                                this.crc16 = 0;
                                this.update(0);
                                break;
                        }
                    }
                } else {
                    this.updateText = `[固件升级]解锁${ unlock == BL_Controls.BL_ERASE ? "擦除[0x03]" : "重启[0x04]" }失败...`;
                    this.timerCount = 3;
                    const timer = setInterval(() => {
                        this.timerCount--;
                        if (this.timerCount === 0) {
                            clearInterval(timer);
                            this.isUpdateLoading = false;
                        }
                    }, 1000);
                }
            }
        },

        async onErase(event: any) {
            let isSuccess = event.detail.isSuccess as boolean;
            let process = event.detail.process as number;

            if (this.rk_c61 != undefined && process == 0xff) {
                this.isUpdateLoading = true;
                if (isSuccess) {
                    if (keyboard.state.serialNo != undefined && this.rk_c61 != undefined) {
                        const sn_buff = [];
                        for (let i = 0; i < 16; i++) {
                            sn_buff[i] = keyboard.state.serialNo.charCodeAt(i);
                        }

                        this.updateText = "[固件升级]解锁签名[0x02]...";
                        if (this.rk_c61.data.runMode == RunModeEnum.App) {
                            await this.signFor(BL_Controls.BL_REBOOT, sn_buff);
                        } else {
                            await this.signFor(BL_Controls.BL_WRITE, sn_buff);
                        }
                    }
                } else {
                    this.updateText = "[固件升级]擦除失败...";
                    this.timerCount = 3;
                    const timer = setInterval(() => {
                        this.timerCount--;
                        if (this.timerCount === 0) {
                            clearInterval(timer);
                            this.isUpdateLoading = false;
                        }
                    }, 1000); 
                }
            }
        },

        async onWrite(event: any) {
            let isSuccess = event.detail.isSuccess as boolean;
            let addr = event.detail.addr as number;
            let size = event.detail.size as number;

            if (this.rk_c61 != undefined) {
                if (isSuccess) {
                    let curAddr = addr + size; 
                    const updateProgress = Math.floor((curAddr / this.fwSize) * 100);
                    this.upgradeProgress = updateProgress >= 100 ? 100 : updateProgress;

                    Logging.console(LOG_TYPE.INFO,  `[固件升级]升级进度 ${this.upgradeProgress}%`);

                    if (curAddr >= this.fwSize) {
                        this.updateType = UpdateTypeEnum.None;
                        this.updateText = `[固件升级]获取CRC校验码...`;
                        this.rk_c61.getCrc(this.fwSize);
                    } else {
                        this.update(curAddr);
                    }
                } else {
                    this.updateText = `[固件升级]地址[${addr}]写入失败...`;
                    ElNotification({
                        title: 'Error',
                        message: `固件升级失败: 地址[${addr}]写入失败...`,
                        type: 'error',
                    });
                    this.updateType = UpdateTypeEnum.None;
                }
            }
        },

        async onRcrc(event: any) {
            let isSuccess = event.detail.isSuccess as boolean;
            this.crc = event.detail.crc as number;

            if (this.rk_c61 != undefined && keyboard.state.serialNo != undefined) {
                if (isSuccess) {
                    this.crc16 = tool.crc16(this.fwData);
                    if (this.crc16 == this.crc) {
                        const sn_buff = [];
                        for (let i = 0; i < 16; i++) {
                            sn_buff[i] = keyboard.state.serialNo.charCodeAt(i);
                        }
                        this.signFor(BL_Controls.BL_TOBOOT, sn_buff);
                    } else {
                        ElNotification({
                            title: 'Error',
                            message: '固件升级失败: CRC校验失败！',
                            type: 'error',
                        });
                    }
                } else {

                }
            }
        },

        async reboot() {
            if (this.rk_c61 != undefined) {
                await this.rk_c61.setReboot();
                window.location.reload();
            }
        },

        async toApp() {
            if (this.rk_c61 != undefined) {
                this.successDialog = false;
                await this.rk_c61.setToApp(this.fwSize, this.crc);
                ElNotification({
                    title: 'Success',
                    message: `固件升级成功！`,
                    type: 'success',
                });
            }
        },

        async offlineUpdateStart() {
            // 升级流程：
            // 1.判断当前程序运行状态是app还是boot
            // 2.如果是boot直接下一步，如果是app，就使用重启命令重启到boot
            // 3.当前处于boot状态，执行擦除命令后，写入固件

            if (this.updateType != UpdateTypeEnum.None) return;

            // 处理EDGE60探索版和选手版可以互相升级固件的问题
            const edge60PlayerEdition = new Uint8Array([
                0x45, 0x64, 0x67, 0x65, 0x36, 0x30, 0x20, 0x50, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x45, 0x64, 0x69, 0x74, 0x69, 0x6f,
                0x6e,
            ]);
        
            const edge60 = new Uint8Array([0x45, 0x44, 0x47, 0x45, 0x20, 0x36, 0x30]);
            const edge60PlayerEdition2 = new Uint8Array([
                0x41, 0x54, 0x4b, 0x20, 0x45, 0x44, 0x47, 0x45, 0x20, 0x36, 0x30, 0x48, 0x45, 0x20, 0x50, 0x52, 0x4f, 0x46, 0x45,
                0x53, 0x53, 0x49, 0x4f, 0x4e, 0x41, 0x4c,
            ]);
        
            const edge602 = new Uint8Array([
                0x41, 0x54, 0x4b, 0x20, 0x45, 0x44, 0x47, 0x45, 0x20, 0x36, 0x30, 0x48, 0x45, 0x20, 0x45, 0x58, 0x54, 0x52, 0x45,
                0x4d, 0x45,
            ]);
        
            if (keyboard.keyboardDefine != undefined &&
                ((keyboard.keyboardDefine.vendorId === 0x373b && keyboard.keyboardDefine.productId === 0x10b4) ||
                    (keyboard.keyboardDefine.vendorId === 0x373b && keyboard.keyboardDefine.productId === 0x205a))) {
                if (!this.containsSubArray(this.fwData, edge60PlayerEdition) || !this.containsSubArray(this.fwData, edge60PlayerEdition2)) {
                    // 不是选手版的固件
                    ElNotification({
                        title: 'Error',
                        message: `这不是Edge60 PlayerEdition的固件,请选择正确的固件！`,
                        type: 'error',
                    });
                    return;
                }
            }
        
            if (keyboard.keyboardDefine != undefined &&
                ((keyboard.keyboardDefine.vendorId === 0x373b && keyboard.keyboardDefine.productId === 0x2039) ||
                    (keyboard.keyboardDefine.vendorId === 0x373b && keyboard.keyboardDefine.productId === 0x1089))) {
                if (!this.containsSubArray(this.fwData, edge60) || !this.containsSubArray(this.fwData, edge602)) {
                    // 不是探索版的固件
                    ElNotification({
                        title: 'Error',
                        message: `这不是Edge60 探索版的固件,请选择正确的固件！`,
                        type: 'error',
                    });
                    return;
                }
            }
        
            Logging.console(LOG_TYPE.INFO, `开始离线升级固件...`);
            this.updateType = UpdateTypeEnum.Offline;
            
            if (this.rk_c61 != undefined && this.rk_c61.data.sn != undefined && this.keyboardInfo.mode == RunModeEnum.Boot) {
                const sn_buff = [];
                for (let i = 0; i < 16; i++) {
                    sn_buff[i] = this.rk_c61.data.sn.charCodeAt(i);
                }

                this.signFor(BL_Controls.BL_ERASE, sn_buff);
            }
        },

        update(address: number) {
            const MAX_SIZE_PER_PACK = 244;

            if (this.rk_c61 != undefined) {
                let size = address + MAX_SIZE_PER_PACK > this.fwSize ? this.fwSize - address : MAX_SIZE_PER_PACK;

                const buff = this.getAPackData(address);
                this.updateCount += size;

                this.rk_c61.writeFw(address, size, buff)
            }
        },

        getAPackData(pos: number) {
            const data = new Uint8Array(244);
            let i = 0;
            for (i = 0; i < 244; i++) {
                data[i] = 0xff;
            }

            const otherSize = this.fwSize - pos + 1;
            if (otherSize < 244) {
                for (i = 0; i < otherSize - 1; i++) {
                    //this.updateFwBuff[this.updateFwBuff.length] = this.fwData[pos];
                    data[i] = this.fwData[pos++];
                }
            } else {
                for (i = 0; i < 244; i++) {
                    //this.updateFwBuff[this.updateFwBuff.length] = this.fwData[pos];
                    data[i] = this.fwData[pos++];
                }
            }

            return data;
        },

        containsSubArray(mainArray: any, subArray: any) {
            if (subArray.length === 0) return true; // 空数组总是被包含
            if (mainArray.length < subArray.length) return false; // 主数组长度小于子数组，不可能包含

            for (let i = 0; i <= mainArray.length - subArray.length; i++) {
                let found = true;
                for (let j = 0; j < subArray.length; j++) {
                    if (mainArray[i + j] !== subArray[j]) {
                        found = false;
                        break;
                    }
                }
                if (found) return true;
            }

            return false;
        },
    },
});