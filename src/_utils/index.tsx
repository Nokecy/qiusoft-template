const defaultPageSize = 100;

declare function getCLodop(): any
import { request } from "umi"


const loadScript = (src, callback) => {
    let scripts = Array.from(document.getElementsByTagName("script"));
    let currentScript = scripts.find((a: any) => a.src === src);
    if (currentScript && currentScript.getAttribute("load")) {
        callback && callback();
        return;
    }
    let script = document.createElement('script');
    let head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.src = src;
    script.id = "dyLoad";
    if (script.addEventListener) {
        script.addEventListener('load', function (e) {
            document.getElementById("dyLoad")?.setAttribute("load", "true");
            callback && callback();
        }, false);
    }
    head.appendChild(script);
}

const saveAs = (blob, filename) => {
    //@ts-ignore
    if (window.navigator.msSaveOrOpenBlob != undefined) {
        //@ts-ignore
        navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(link.href);
    }
}

const downloadBlob = (url, fileName) => {
    let encoderUrl = encodeURI(url);

    return request(encoderUrl, { responseType: "blob" })
        //@ts-ignore
        .then(blob => { saveAs(blob, fileName); });
}

export { defaultPageSize, loadScript, downloadBlob, saveAs };
