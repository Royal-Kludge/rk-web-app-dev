const donglePkgQueue = new Array<any>();
const dongleLastTime = new Date();
const dongleMsgInterval = 1400;

let dongleIsWaitPkgFinish = false;

self.addEventListener('message', (event) => {
    if (event.data === 'start') {
        startLoop();
    } else if (event.data === 'finish') {
        dongleIsWaitPkgFinish = false;
        if (donglePkgQueue.length <= 0) self.postMessage('finish');
    } else {
        let p = event.data;
        donglePkgQueue.splice(0, 0, p);
    }
});

function startLoop() {
    setInterval(() => {
        const currentTime = new Date();
        let elapsedTime = currentTime.getTime() - dongleLastTime.getTime();
        if (elapsedTime > dongleMsgInterval && dongleIsWaitPkgFinish)
        {
            dongleIsWaitPkgFinish = false;
            if (donglePkgQueue.length <= 0) self.postMessage('timeout');
        }
        if (!dongleIsWaitPkgFinish) {
            if (donglePkgQueue.length > 0) {
                let p = donglePkgQueue.pop();
                if (p != undefined) {
                    self.postMessage(p);
                    dongleLastTime.setTime(currentTime.getTime());
                    dongleIsWaitPkgFinish = true;
                }
            }
        }
    }, 10);
}