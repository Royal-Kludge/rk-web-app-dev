const mousePackages = new Array<Uint8Array>();
const mouseLastTime = new Date();
const mouseGetReportTime = new Date();
const mouseMsgInterval = 3000;

let isGetReport = false;

self.addEventListener('message', (event) => {
    if (event.data === 'start') {
        mouseStartLoop();
    } else if (event.data === 'getReport') {
        isGetReport = true;
        mouseGetReportTime.setTime(new Date().getTime());
    } else if (event.data === 'stopGet') {
        isGetReport = false;
    } else {
        let p = event.data as Uint8Array;
        mousePackages.splice(0, 0, p);
    }
});

function mouseStartLoop() {
    setInterval(() => {
        const currentTime = new Date();
        let elapsedTime = currentTime.getTime() - mouseLastTime.getTime();
        let getElapsedTime = currentTime.getTime() - mouseGetReportTime.getTime();
        if (getElapsedTime > mouseMsgInterval) isGetReport = false;
        if (isGetReport) {
            if (elapsedTime > 20) {
                self.postMessage('getReport');
                mouseLastTime.setTime(currentTime.getTime());
            }
        } else if (mousePackages.length > 0) {
            let p = mousePackages.pop();
            if (p != undefined) {
                self.postMessage(p);
                mouseLastTime.setTime(currentTime.getTime());
            }
        }
    }, 50);
}