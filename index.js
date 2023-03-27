
var pmx = require('pmx');
var pm2 = require('pm2')
const http = require('http');
const crypto = require('crypto');
const util = require('util');

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

  pmx.action('env', async function(reply) {
    const myPromise = new Promise((resolve, reject) => {
        pm2.list((err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
      });
      let data = await myPromise;

      //const paths = data.map(x => x.pm2_env.PWD);

    return reply({
      data
    });
  });
//git rev-parse --is-inside-work-tree

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