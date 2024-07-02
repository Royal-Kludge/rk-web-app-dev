import { Packet_Dongle } from "./packets/packet";

const donglePkgQueue = new Array<any>();
const dongleLastTime = new Date();
const dongleMsgInterval = 1400;

let dongleIsWaitPkgFinish = false;

self.addEventListener('message', (event) => {
    if (event.data === 'start') {
        startLoop();
    } else if (event.data === 'finish') {
        dongleIsWaitPkgFinish = false;
    } else {
        let p = event.data;
        donglePkgQueue.splice(0, 0, p);
    }
});

function startLoop() {
    setInterval(() => {
        const currentTime = new Date();
        let elapsedTime = currentTime.getTime() - dongleLastTime.getTime();
        if (elapsedTime > dongleMsgInterval) dongleIsWaitPkgFinish = false;
        if (!dongleIsWaitPkgFinish) {
            if (donglePkgQueue.length > 0) {
                let p = donglePkgQueue.pop();
                if (p != undefined) {
                    self.postMessage(p);
                    dongleLastTime.setTime(currentTime.getTime());
                }
            } else {
                if (elapsedTime > 1000) {
                    self.postMessage('heartbeat');
                    dongleLastTime.setTime(currentTime.getTime());
                }
            }

            dongleIsWaitPkgFinish = true;
        }
    }, 10);
}