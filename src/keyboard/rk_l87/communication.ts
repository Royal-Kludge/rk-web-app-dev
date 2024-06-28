const packages = new Array<Uint8Array>();
const lastTime = new Date();
const msgInterval = 200;

let isWaitReport = false;

self.addEventListener('message', (event) => {
    if (event.data === 'start') {
        startLoop();
    } else if (event.data === 'report') {
        isWaitReport = false;
    } else {
        let p = event.data as Uint8Array;
        packages.push(p);
    }
});

function startLoop() {
    setInterval(() => {
        const currentTime = new Date();
        let elapsedTime = currentTime.getTime() - lastTime.getTime();
        if (elapsedTime > msgInterval) isWaitReport = false;
        if (!isWaitReport) {
            if (packages.length > 0) {
                let p = packages.pop();
                if (p != undefined) {
                    self.postMessage(p);
                    lastTime.setTime(currentTime.getTime());
                }
            } else {
                if (elapsedTime > 1000) {
                    self.postMessage('heartbeat');
                    lastTime.setTime(currentTime.getTime());
                }
            }

            isWaitReport = true;
        }
    }, 10);
}