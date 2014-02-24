var request = require('request'),
  fs = require('fs'),
  spawn = require('child_process').spawn;

function createTemplate(req, res) {
  var phantom = spawn('phantomjs', ['./phantomjs/downloadSvg.js', req.params.templateId, req.params. dataSet]);


  phantom.on('close', function(code, signal) {
    // redirect here
    res.redirect('/downloadTemplate');
//    console.log('child process terminated due to receipt of signal '+signal);
  });
}

var path = 'doodle.pdf';

function renderTemplate(req, res) {
  console.log('--- start rendering');
  var options = {
    url: 'http://default-environment-n3qmimrip3.elasticbeanstalk.com/V1/renderRequest',
    form: {
      fileType: 'PDF',
      svgFile: req.body.svgTemplate
    }
  };

  request.post(options, function(error, response, body) {
//    debugger;
//    response.pipe(fs.createWriteStream('out.pdf'));
    if (!error && response.statusCode == 200) {
      console.log('--- success rendering')
      res.send(200);
    } else {
      console.log('--- failed rendering')
      res.send(500);
    }
  })
    .pipe(fs.createWriteStream(path));
}


function downloadTemplate(req, res) {

  var count = 0;

  checkForPath();

  function checkForPath() {
    if (!fs.existsSync(path)) {
//      count++;
//      if(count > 1000){
//        res.end();
//        return;
//      }
      setTimeout(checkForPath, 10);
      return;
    }

    // hack?
    // look for way to be notified when file is done writing
    setTimeout(function() {
      var readStream = fs.createReadStream(path);
      readStream.pipe(res);
//    res.download(path);
    },1000);

  }
}


var webdriver = require('selenium-webdriver');
var url = 'http://localhost:3000/#/renderTemplate/8cadc1aa-9cea-400a-9348-3090b16b66c1?dataSet=3ff12b9f-6620-4450-84fd-7cfe86905975';

function test(req, res){
  var driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();

  driver.get(url);
//  driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
//  driver.findElement(webdriver.By.name('btnG')).click();
  driver.wait(function() {
    return driver.getTitle().then(function(title) {
      return title === 'doneRendering';
    });
  }, 10000);


  console.log('woohooo')
  driver.quit();
  res.redirect('/downloadTemplate');
//  res.end();
}




module.exports = {
  test: test,
  createTemplate: test,
  renderTemplate: renderTemplate,
  downloadTemplate: downloadTemplate
};