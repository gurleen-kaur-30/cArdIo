import db from '../../../../utils/db';

export default async (req, res) => {
  console.log("method", req.query.uid)
  console.log("res", req.method)
  // const { id } = req.query;
  try {
    if (req.method === 'PUT') {
      await db.collection('bicepCurls').doc(req.query.uid).update({
        ...req.body,
        updated: new Date().toISOString(),
      });
    } else if (req.method === 'GET') {
      const doc = await db.collection('bicepCurls').doc(req.query.uid).get();
      if (!doc.exists) {
        res.status(404).end();
      } else {
        res.status(200).json(doc.data());
        console.log(doc.data())
      }
    } else if (req.method === 'DELETE') {
      await db.collection('bicepCurls').doc(req.query.uid).delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}