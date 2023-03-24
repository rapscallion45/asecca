// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { CostsConfigDataPayload, ProxyErrorPayload } from '@/api-types';

/* proxy for handling requests to ASECCA 'costs_config' API */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CostsConfigDataPayload | ProxyErrorPayload | null>
) {
  const { method } = req;

  /* determine which request type this is */
  switch (method) {
    case 'POST':
      /* call POST api */
      try {
        return res.status(401);
      } catch (error) {
        return res.status(501);
      }
    case 'GET':
      /* call GET api */
      try {
        return res.status(200).json({
          costs: [
            {
              name: 'Test Scope',
              application: 'Per Device',
              cost_source: 'Global',
              effective_charge: 9,
              line_type: 'Typical',
            },
          ],
        });
      } catch (error) {
        return res
          .status(501)
          .json({ message: 'Proxy failed to forward the request.' });
      }
    default:
      /* Return 404 if someone pings the API with an unsupported method */
      return res.status(404).json({ message: 'Unsupported proxy method.' });
  }
}
