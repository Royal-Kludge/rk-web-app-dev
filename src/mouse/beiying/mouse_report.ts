import type { MouseState, IMouseReport } from './interface'

export abstract class Mouse_Report extends EventTarget implements IMouseReport  {

    state: MouseState;
    device: HIDDevice

    constructor(state: MouseState, device: HIDDevice) {
        super();
        this.state = state;
        this.device = device;
    }

    abstract onReport(report: HIDInputReportEvent): void;
    abstract getOnline(): Promise<void>;
    abstract getBattery(): Promise<void>;

    async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}