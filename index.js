// to have access to local or global scripts
require(process.cwd() + '/node_modules/benja').paths();

// simple server example
// https://stackoverflow.com/questions/28029929/how-to-start-gulp-watch-task-when-i-type-npm-start
require('http')
  .createServer(require('tiny-cdn').create({}))
  .listen(8080, '0.0.0.0');
  // will respond to :80 too via iptables

// simple app example
const
  electron = require('electron'),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow
;


// PDF Viewer
const PDFWindow = require('electron-pdf-window')

// in case by default WebGL doesn't work ... (rpi or others)
app.commandLine.appendSwitch('--ignore-gpu-blacklist');

// once the app is ready
app.once('ready', () => {

  const area = electron.screen.getPrimaryDisplay().workAreaSize;

  // a reference is needed so the GC
  // won't kill the view
  var mainWindow = new BrowserWindow({
    backgroundColor: '#000000',
    frame: false,
    // in some case kiosk: true is not working
    // same goes for fullscreen but this is working
    fullscreen: true,
    x: 0,
    y: 0,
    width: (area.width),
    height: area.height,
    show: false
  });

  this.window = mainWindow;

  PDFWindow.addSupport(mainWindow);

  mainWindow.once('closed', () => {
      // cleanup the reference
      this.window = null;
    })
// Benja default - npm start - OK 
//   .loadURL('http://localhost:8080');
// Benja PDF - npm start - OK 
    .loadURL('http://localhost:8080/roadbook.pdf');
// File PDF Netwrok - npm start - OK  
//.loadURL('http://www.trentinotrailrunning.it/images/dolomiti-brenta-trail/2015/roadbook/dbt-roadbook.pdf');
    // test CSS
 // .loadURL('https://codepen.io/bennettfeely/full/tfbCo/');
    // test WebGL
 // .loadURL('http://get.webgl.org/');
    // stress WebGL
 //.loadURL('https://threejs.org/examples/webgl_geometry_cube.html');

 // Gulpserver  .loadURL('http://localhost:8888/web/viewer.html?file=%2Fexamples%2Flearning%2Fhelloworld.pdf');
 // Gulpserver  .loadURL('http://localhost:8888/examples/helloworld/helloworld.pdf');

 // https://www.mouser.it/Connectors/USB-Connectors/_/N-88hmf?Keyword=usb+io&FS=True

 this.window.webContents.on('before-input-event', (event, input) => {
  // For example, only enable application menu keyboard shortcuts when
  // Ctrl/Cmd are down.
  // https://stackoverflow.com/questions/32780726/how-to-access-dom-elements-in-electron
  // console.log("before-input-event:");
  // console.log(input);
  //mainWindow.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
    var deltaScroll = '10';
    if (input.type === 'keyDown' && input.key === 'ArrowDown' && input.code === 'ArrowDown' ) {
      event.preventDefault();
      mainWindow.webContents.executeJavaScript("document.getElementById('viewerContainer').scrollTop +="+deltaScroll+";");
    }
    if (input.type === 'keyDown' && input.key === 'ArrowUp' && input.code === 'ArrowUp' ) {
      event.preventDefault();
      mainWindow.webContents.executeJavaScript("document.getElementById('viewerContainer').scrollTop -="+deltaScroll+";");
    }
  })

function myFunc(arg) {
  console.log(`arg was => ${arg}`);
}
setTimeout(myFunc, 1500, 'funky');

// Custom Loop Event
function intervalFunc() {
  console.log('Loop on UI event');
  // mainWindow.focus();

  // Send Key signal - Automatica Scroll
  /*
  mainWindow.webContents.sendInputEvent({
    type: 'keyDown',
    keyCode: 'Down'
  });
  */

  // Read GPIO statuts
}
setInterval(intervalFunc, 1500,this);

  // https://www.christianengvall.se/electron-white-screen-app-startup/
  mainWindow.once('ready-to-show', () => {
    // Disable Scroll
    mainWindow.webContents.executeJavaScript("document.getElementById('viewerContainer').style.overflow = 'hidden';");
    // Default PDF 'page-fit'
    mainWindow.webContents.executeJavaScript("document.getElementById('scaleSelect').selectedIndex = 3;");

    mainWindow.show()
  })

  // for debugging purpose, it might be handy to be able
  // to reload the window simply via `touch ~/app/reload`
  require('fs').watch('reload', () => app.quit());

});
