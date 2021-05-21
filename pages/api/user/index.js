import db from '../../../utils/db';

export default async (req, res) => {

    const log4js = require('log4js');
    const log_loc = require("../../../log4js_config.json");

    log4js.configure(log_loc);

    const logger = log4js.getLogger();
    logger.level = 'info';          
  try {
    const { slug } = req.body;
    const entries = await db.collection('users').get();
    console.log(req.body.uid)
    const entriesData = entries.docs.map(entry => entry.data());
    if (entriesData.some(entry => entry.slug === slug)) {
      res.status(400).end();
        logger.info("[User creation] ["+req.body.uid+"] [Status] [Exists]");
    } else {
      await db.collection('users').doc(req.body.uid).set({
        ...req.body,
        created: new Date().toISOString(),
      });
      res.status(200).end();
      logger.info("[User creation] ["+req.body.uid+"] [Status] [Success]");
    }
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
}