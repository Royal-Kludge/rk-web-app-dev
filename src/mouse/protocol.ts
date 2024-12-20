import type { MouseState, IProtocol } from './interface'

export abstract class Protocol extends EventTarget implements IProtocol  {

    state: MouseState;
    device: HIDDevice

    constructor(state: MouseState, device: HIDDevice) {
        super();
        this.state = state;
        this.device = device;
    }

    abstract init(): Promise<void>;
    abstract destroy(): Promise<void>;
}