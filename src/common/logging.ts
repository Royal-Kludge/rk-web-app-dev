import { LOGGING_FLAG } from "./state";

export const LOG_TYPE = {
    INFO: 0,
    SUCCESS: 1,
    WARNING: 2,
    ERROR: 3
}

export class Logging {

    static console(type?: any, message?: any, ...optionalParams: any[]) {
        if (LOGGING_FLAG) {

            const now = new Date();

            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

            const formattedTime = `[${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${milliseconds}]`;

            let logType = '';
            let cssStyle = '';

            switch (type) {
                case LOG_TYPE.INFO:
                    logType = 'INFO';
                    cssStyle = 'color: blue;';
                    break;
                case LOG_TYPE.SUCCESS:
                    logType = 'SUCCESS';
                    cssStyle = 'color: green;';
                    break;
                case LOG_TYPE.WARNING:
                    logType = 'WARNING';
                    cssStyle = 'color: orange;';
                    break;
                case LOG_TYPE.ERROR:
                    logType = 'ERROR';
                    cssStyle = 'color: red; font-weight: bold;';
                    break;
                default:
                    logType = 'LOG';
                    cssStyle = '';
                    break;
            }

            console.log(`%c${formattedTime} [${logType}] ${message}`, cssStyle, ...optionalParams);
        }
    }
}