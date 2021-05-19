import db from '../../../../utils/db'

export default async (req, res) => {
    try {
      const { slug } = req.body;
      console.log(req.body.uid)
    //   const entries = await db.collection('bicepCurls').get();
    //   const entriesData = entries.docs.map(entry => entry.data());
    //   if (entriesData.some(entry => entry.slug === slug)) {
    //     res.status(400).end();
    //   } else {
        await db.collection('bicepCurls').doc(req.body.uid).set({
          ...req.body,
          created: new Date().toISOString(),
        });
        res.status(200).end();
    //   }
    } catch (e) {
      console.log("errorr", e)
      res.status(400).end();
    }
  }