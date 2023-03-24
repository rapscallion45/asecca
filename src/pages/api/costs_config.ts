// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { CostsConfigDataPayload, ProxyErrorPayload } from '@/api-types';
import getCostsConfig from '../../lib/api';

/* proxy for handling requests to ASECCA 'costs_config' API */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CostsConfigDataPayload | ProxyErrorPayload | null>
) {
  const { method, query } = req;

  /* determine which request type this is */
  switch (method) {
    case 'POST':
      /* call POST api */
      try {
        /* placeholder for now */
        return res.status(401);
      } catch (error) {
        return res.status(501);
      }
    case 'GET':
      /* check if we have correct query param, if not return error */
      if (!query.collection && !query.project && !query.customer) {
        return res.status(422).json({
          message: 'Unproccesable request, no ID provided.',
        });
      }

      /* try proxying request to ASECCA API */
      try {
        const response = await getCostsConfig(query);
        const data = await response.json();

        /* send back server response */
        if (response.status === 200) {
          return res.status(200).json(data);
        }
        return res.status(400).json({
          message: data.message,
        });
      } catch (error) {
        /* in case of exception, generate internal error response */
        return res.status(501).json({ message: error as string });
      }
    default:
      /* Return 404 if someone pings proxy API with an unsupported method */
      return res.status(404).json({ message: 'Unsupported proxy method.' });
  }
}
