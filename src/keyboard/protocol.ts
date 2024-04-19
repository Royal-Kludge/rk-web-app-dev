import type { KeyboardState, IProtocol } from './interface'

export abstract class Protocol implements IProtocol {

    state: KeyboardState;
    device: HIDDevice

    constructor(state: KeyboardState, device: HIDDevice) {
        this.state = state;
        this.device = device;
    }

    async setReport(reportId: number, data: BufferSource): Promise<void> {
        await this.device.sendFeatureReport(reportId, data);
    }

    async getReport(reportId: number): Promise<DataView>  {
        return this.device.receiveFeatureReport(reportId);
    }

    abstract init(): Promise<void>;
}