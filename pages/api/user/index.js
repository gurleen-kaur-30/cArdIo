import db from '../../../utils/db';

export default async (req, res) => {
  try {
    console.log("POST", req.body);
    const { slug } = req.body;
    console.log("POST req1");
    const entries = await db.collection('users').get();
    console.log("POST req2");
    const entriesData = entries.docs.map(entry => entry.data());
    console.log("POST req3");
    if (entriesData.some(entry => entry.slug === slug)) {
        console.log("fail");
      res.status(400).end();
    } else {
        console.log("Complete1");
      const { id } = await db.collection('users').add({
        ...req.body,
        created: new Date().toISOString(),
      });
      console.log("Complete");
      res.status(200).json({ id });
    }
  } catch (e) {
    res.status(400).end();
  }
}