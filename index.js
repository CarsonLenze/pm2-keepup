
var pmx = require('pmx');
var pm2 = require('pm2')
const child = require("child_process");

pmx.initModule({
  widget: {
    logo: 'https://app.keymetrics.io/img/logo/keymetrics-300.png',
    theme: ['#141A1F', '#222222', '#3ff', '#3ff'],
    el: {
      probes: true,
      actions: true
    },

    block: {
      actions: false,
      issues: true,
      meta: true,

      main_probes: ['test-probe']
    }
  }

}, async function (err, conf) {
  //get the list off all apps. filter out the modules
  const list = (await listApps())
    .filter(x => !x.pm2_env.axm_options.isModule);

  //get the paths of the apps
  const paths = list.map(x => x.pm2_env.PWD);

  // let paths;
  // for (const app of apps) {
  //   ex
  // }

  pmx.action('env', async function (reply) {
    return reply({ paths });
  });

  //git rev-parse --is-inside-work-tree
});

async function exec(command) {
  return new Promise((resolve, reject) => {
    child.exec(command, (error, stdout, stderr) => {
      if (error) return reject(error);
      return resolve({ stdout, stderr });
    });
  });
}

async function listApps() {
  return new Promise((resolve, reject) => {
    pm2.list((error, data) => {
      if (error) return reject(error);
      resolve(data);
    })
  });
}