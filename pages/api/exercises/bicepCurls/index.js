import db from '../../../../utils/db'

export default async (req, res) => {
    try {
      const { slug } = req.body;
      console.log(req.body.uid)
      console.log("timeee", new Date().getHours(), new Date().getMinutes())

      const log4js = require('log4js');
      const log_loc = require("../../../../log4js_config.json");

      log4js.configure(log_loc);

      // // Create the logger
      const logger = log4js.getLogger();
      logger.level = 'info';          

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
    logger.info("[Progress saved] [" + req.body.uid + "] [Bicep_Curl_Count] [" + req.body.count + "]");
    // logger.info({"Message": "Progress saved", "UID": req.body.uid, "Bicep_Curl_Count": req.body.count, "Created": new Date()});
    } catch (e) {
      console.log("errorr", e)
      res.status(400).end();
    }
  }