const {app, BrowserWindow,net,Menu} = require('electron')
// 创建全局变量并在下面引用，避免被GC
let win
app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('disable-http-cache');
const exec = require('child_process').exec
function createWindow () {
    // 创建浏览器窗口并设置宽高
    Menu.setApplicationMenu(null) 
    win = new BrowserWindow(
        { width: 1280, 
          height: 720,
          webPreferences: {webSecurity: false},
          icon:require('path').resolve(__dirname,"./112.ico")
        }
    )
    
    // 加载页面
    win.loadFile('./clientInit.html')
    // 打开开发者工具
    //win.webContents.openDevTools()
    
    // 添加window关闭触发事件
    
    win.on('closed', () => {
      const request = net.request({
        method: 'POST',
        protocol: 'http:',
        hostname: '127.0.0.1',
        port: 8000,
        path: '/cmd/close',
      });
      request.end()
        win = null  // 取消引用
    })
}

// 初始化后 调用函数
app.on('ready', createWindow)  
// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
   // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
   // 否则绝大部分应用及其菜单栏会保持激活。
   if (process.platform !== 'darwin') {
        app.quit()
   }
})
  
app.on('activate', () => {
// 在macOS上，当单击dock图标并且没有其他窗口打开时，
// 通常在应用程序中重新创建一个窗口。
    if (win === null) {
      createWindow()
    }
})