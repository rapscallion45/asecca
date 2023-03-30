// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  ICostsConfigDataPayload,
  IProxyErrorPayload,
} from '@/lib/api/api-types';
import { getCostsConfig, setCostsConfig } from '../../lib/api';

/* proxy for handling requests to ASECCA 'costs_config' API */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICostsConfigDataPayload | IProxyErrorPayload | null>
) {
  const { method, query, body } = req;

  /* determine which request type this is */
  switch (method) {
    case 'POST':
      /* call POST api */
      try {
        /* try proxying request to ASECCA API */
        const response = await setCostsConfig(body);

        /* send back server response */
        if (response.status === 200) {
          return res.status(200).json({ message: 'Ok' });
        }
        return res.status(response.status).json({
          message: response.statusText,
        });
      } catch (error) {
        return res.status(501).json({ message: error as string });
      }
    case 'GET':
      /* check if we have correct query param, if not return error */
      if (!query.collection && !query.project && !query.customer) {
        return res.status(422).json({
          message: 'Unproccesable request, no ID provided.',
        });
      }

      /* call GET api */
      try {
        /* try proxying request to ASECCA API */
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
