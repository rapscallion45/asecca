import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  ICostsConfigDataPayload,
  IProxyErrorPayload,
} from '@/lib/api/api-types';
import { getDevices } from '@/lib/api';

/**
 * Proxy for handling requests to ASECCA '/tables/api/devices' API.
 *
 * @see See [Next.js API route support](https://nextjs.org/docs/api-routes/introduction)
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.3
 * @memberof NextjsAPI
 *
 * @param {NextApiRequest} req - the request data
 * @param {NextApiResponse<ICostsConfigDataPayload | IProxyErrorPayload | null>} res - the response data
 * @returns {NextApiResponse} - handler response
 */
const costsConfigHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ICostsConfigDataPayload | IProxyErrorPayload | null>
) => {
  const { method } = req;

  /* determine which request type this is */
  switch (method) {
    case 'GET':
      /* call GET api */
      try {
        /* try proxying request to ASECCA API */
        const response = await getDevices();

        /* send back server response */
        if (response.status === 200) {
          const data = await response.json();
          return res.status(200).json(data);
        }
        return res.status(response.status).json({
          message: `Failed to load Devices data from server: ${response.statusText}`,
        });
      } catch (error) {
        /* in case of exception, generate internal error response */
        return res.status(501).json({ message: error as string });
      }
    default:
      /* Return 404 if someone pings proxy API with an unsupported method */
      return res.status(404).json({ message: 'Unsupported proxy method.' });
  }
};

export default costsConfigHandler;
