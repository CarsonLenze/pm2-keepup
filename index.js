
var pmx = require('pmx');
const http = require('http');
const crypto = require('crypto');

pmx.initModule({
  widget : {
    logo : 'https://app.keymetrics.io/img/logo/keymetrics-300.png',
    theme            : ['#141A1F', '#222222', '#3ff', '#3ff'],
    el : {
      probes  : true,
      actions : true
    },

    block : {
      actions : false,
      issues  : true,
      meta    : true,

      main_probes : ['test-probe']
    }
  }

}, function(err, conf) {

    http.createServer(function (req, res) {
        const secret = 'password'
        req.on('data', function(chunk) {
            let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
    
            if (req.headers['x-hub-signature'] == sig) {
                //exec('cd ' + repo + ' && git pull');
                res.write('Hello World!');
            }
        });
    
        res.end();
    }, 10367)

  pmx.action('env', function(reply) {
    return reply({
      env: process.env
    });
  });


//   var spawn = require('child_process').spawn;

//   pmx.scopedAction('lsof cmd', function(options, res) {
//     var child = spawn('lsof', []);

//     child.stdout.on('data', function(chunk) {
//       chunk.toString().split('\n').forEach(function(line) {
//         /**
//          * Here we send logs attached to this command
//          */
//         res.send(line);
//       });
//     });

//     child.stdout.on('end', function(chunk) {
//       /**
//        * Then we emit end to finalize the function
//        */
//       res.end('end');
//     });

//   });


});