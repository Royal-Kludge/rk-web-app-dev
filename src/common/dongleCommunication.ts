const donglePkgQueue = new Array<any>();
const dongleLastTime = new Date();
const dongleMsgInterval = 1000;

let interval: any = null;
let dongleIsWaitPkgFinish = false;

self.addEventListener('message', (event) => {
    if (event.data === 'start') {
        dongleStartLoop();
    } else if (event.data === 'stop') {
        if (interval != null) {
            clearInterval(interval);
        }
    } else if (event.data === 'finish') {
        dongleIsWaitPkgFinish = false;
        if (donglePkgQueue.length <= 0) self.postMessage('finish');
    } else if (event.data === 'report') {
        const rptTime = new Date();
        dongleLastTime.setTime(rptTime.getTime());
    } else {
        let p = event.data;
        donglePkgQueue.splice(0, 0, p);
    }
});

function dongleStartLoop() {
    interval = setInterval(() => {
        const currentTime = new Date();
        let elapsedTime = currentTime.getTime() - dongleLastTime.getTime();
        if (elapsedTime > dongleMsgInterval && dongleIsWaitPkgFinish)
        {
            //dongleIsWaitPkgFinish = false;
            dongleLastTime.setTime(currentTime.getTime());
            self.postMessage('timeout');
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