
// 引入路由和storage工具函数
import storage from './storage'

function checkTimeout() {
    let lastTime = new Date().getTime()
    let currentTime = new Date().getTime()
    let timeOut = 30 * 60 * 1000  //设置超时时间: 30分钟
    currentTime = new Date().getTime()		//更新当前时间
    lastTime = storage.getItem("lastTime");
    if (lastTime && (currentTime - lastTime > timeOut)) { //判断是否超时
        // 清除storage的数据(登陆信息和token)
        storage.removeItem('lastTime')
        // 跳到登陆页
        storage.setItem('timeoutBoolean',1)

        // router.push({ name: 'login' })
    }
}

export default function () {
    storage.setItem("lastTime", new Date().getTime())

    window.document.onmousedown = function () {
        storage.setItem("lastTime", new Date().getTime())
    }
    /* 定时器 间隔30秒检测是否长时间未操作页面 */
    window.setInterval(checkTimeout, 30000);
}