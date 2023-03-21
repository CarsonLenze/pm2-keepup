const io = require('@pm2/io');

io.initModule({
    widget: {
        type: 'generic',
        logo: 'https://www.glcomp.com/media/catalog/category/Dell-R620_3_1_1.png',
    
        theme: ['#111111', '#1B2228', '#807C7C', '#807C7C'],
    
        el: {
          probes: true,
          actions: true
        },
    
        block: {
          actions: false,
          issues: true,
          meta: true,
          cpu: false,
          mem: false
        }
      }
    }, function (err, conf) {
        if (err) {
            io.notifyError(err)
            return process.exit(1)
          }
          console.log(conf)
})