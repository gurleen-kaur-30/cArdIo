import db from '../../../utils/db';

export default async (req, res) => {
  try {
    console.log("POST", req.body);
    const { slug } = req.body;
    const entries = await db.collection('users').get();
    const entriesData = entries.docs.map(entry => entry.data());
    if (entriesData.some(entry => entry.slug === slug)) {
      res.status(400).end();
    } else {
      const { id } = await db.collection('users').add({
        ...req.body,
        created: new Date().toISOString(),
      });
      res.status(200).json({ id });
    }
  } catch (e) {
    res.status(400).end();
  }
}