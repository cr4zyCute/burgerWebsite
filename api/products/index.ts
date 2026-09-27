import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SEED_PRODUCTS } from '../../src/db/seed-data';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { category, search } = req.query;
    let results = [...SEED_PRODUCTS];

    if (category && category !== 'all') {
      results = results.filter((p) => p.category === category);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      results = results.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    return res.status(200).json({ success: true, data: results });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
