import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const body = req.body;
    if (!body || !body.items || body.items.length === 0) {
      return res.status(400).json({ error: 'Order must contain items' });
    }

    const orderNumber = 'BC-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: 'ord-' + Date.now(),
      orderNumber,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      fulfillmentType: body.fulfillmentType || 'delivery',
      items: body.items,
      subtotal: body.subtotal,
      total: body.total,
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: new Date().toISOString(),
    };

    return res.status(201).json({ success: true, order: newOrder });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
