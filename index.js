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
  this.window = new BrowserWindow({
    backgroundColor: '#000000',
    frame: false,
    // in some case kiosk: true is not working
    // same goes for fullscreen but this is working
    fullscreen: true,
    x: 0,
    y: 0,
    width: area.width,
    height: area.height
  });

  PDFWindow.addSupport(this.window);

  this.window
    .once('closed', () => {
      // cleanup the reference
      this.window = null;
    })
// Benja default - npm start - OK .loadURL('http://localhost:8080');
// Benja PDF - npm start - OK 
    .loadURL('http://localhost:8080/dbt-roadbook.pdf');
// File PDF Netwrok - npm start - OK  .loadURL('http://www.trentinotrailrunning.it/images/dolomiti-brenta-trail/2015/roadbook/dbt-roadbook.pdf');

    // test CSS
 // .loadURL('https://codepen.io/bennettfeely/full/tfbCo/');
    // test WebGL
 // .loadURL('http://get.webgl.org/');
    // stress WebGL
 //.loadURL('https://threejs.org/examples/webgl_geometry_cube.html');

 // Gulpserver  .loadURL('http://localhost:8888/web/viewer.html?file=%2Fexamples%2Flearning%2Fhelloworld.pdf');
 // Gulpserver  .loadURL('http://localhost:8888/examples/helloworld/helloworld.pdf');


  // for debugging purpose, it might be handy to be able
  // to reload the window simply via `touch ~/app/reload`
  require('fs').watch('reload', () => app.quit());

});
