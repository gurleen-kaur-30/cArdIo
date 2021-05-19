import db from '../../../utils/db';

export default async (req, res) => {
  try {
    const { slug } = req.body;
    const entries = await db.collection('users').get();
    console.log(req.body.uid)
    const doc = entries.docs.map(entry => entry.data());
    if (entriesData.some(entry => entry.slug === slug)) {
      res.status(400).end();
    } else {
      await db.collection('users').doc(req.body.uid).set({
        ...req.body,
        created: new Date().toISOString(),
      });
      res.status(200).end();
    }
  } catch (e) {
    console.log(e)
    res.status(400).end();
  }
}