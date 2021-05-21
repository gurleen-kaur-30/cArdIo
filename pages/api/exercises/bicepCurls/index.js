import db from '../../../../utils/db'
var log4js = require('log4js');

export default async (req, res) => {
    try {
      log4js.configure(require("../../../../log4js_config.json"));

    // Create the logger
    logger = log4js.getLogger();
    logger.level = 'info';
    logger.info("Bicep curls");
      const { slug } = req.body;
      console.log(req.body.uid)
      console.log("timeee", new Date().getHours(), new Date().getMinutes())
      const entries = await db.collection('bicepCurls').doc(req.body.uid).get()
      if(!entries.data()){
          var newData = []
          newData.push({...req.body,created: new Date(),
          })
           await db.collection('bicepCurls').doc(req.body.uid).set({
          ...newData,
        });
        res.status(200).end();
      } else{
        var obj = entries.data();
        // console.log(obj)
        var newData = Object.entries(obj).map((e) => ( e[1] ));
          
        // console.log(Object.entries(entires.data()))
        // var newData = entires.data()
        // newData.concat(entires.data())
        
        newData.push({...req.body,created: new Date(),
        })
    //    console.log(newData)
          await db.collection('bicepCurls').doc(req.body.uid).set({
            ...newData,
          });
          res.status(200).end();

      }
    //   const entries = await db.collection('bicepCurls').get();
    //   const entriesData = entries.docs.map(entry => entry.data());
    //   if (entriesData.some(entry => entry.slug === slug)) {
    //     res.status(400).end();
    //   } else {
        // await db.collection('bicepCurls').doc(req.body.uid).set({
        //   ...req.body,
        //   created: new Date().toISOString(),
        // });
        // res.status(200).end();
    //   }
    } catch (e) {
      console.log("errorr", e)
      res.status(400).end();
    }
  }