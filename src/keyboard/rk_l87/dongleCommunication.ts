import { Packet_Dongle } from "./packets/packet";

const donglePkgQueue = new Array<Packet_Dongle>();
const dongleLastTime = new Date();
const dongleMsgInterval = 20;

let dongleIsWaitReport = false;

self.addEventListener('message', (event) => {
    if (event.data === 'start') {
        startLoop();
    } else if (event.data === 'report') {
        dongleIsWaitReport = false;
    } else {
        let p = event.data as Packet_Dongle;
        donglePkgQueue.push(p);
    }
});

function startLoop() {
    setInterval(() => {
        const currentTime = new Date();
        let elapsedTime = currentTime.getTime() - dongleLastTime.getTime();
        if (elapsedTime > dongleMsgInterval) dongleIsWaitReport = false;
        if (!dongleIsWaitReport) {
            if (packages.length > 0) {
                let p = packages.pop();
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

            dongleIsWaitReport = true;
        }
    }, 10);
}