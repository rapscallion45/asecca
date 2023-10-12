import type { NextApiRequest, NextApiResponse } from 'next';
import type { IProxyErrorPayload } from '@/lib/api/api-types';
import { getFacility, setFacility } from '@/lib/api';

/**
 * Proxy for handling requests to ASECCA Collection Form Facility API.
 *
 * @see See [Next.js API route support](https://nextjs.org/docs/api-routes/introduction)
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof NextjsAPI
 *
 * @param {NextApiRequest} req - the request data
 * @param {NextApiResponse<IProxyErrorPayload | null>} res - the response data
 * @returns {NextApiResponse} - handler response
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IProxyErrorPayload | null>
) => {
  const { method, query, body } = req;

  /* determine which request type this is */
  switch (method) {
    case 'POST':
      /* call POST api */
      try {
        /* try proxying request to ASECCA API */
        const response = await setFacility(body);

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
      if (!query.collection) {
        return res.status(422).json({
          message: 'Unproccesable request, no ID provided.',
        });
      }

      /* call GET api */
      try {
        /* try proxying request to ASECCA API */
        const response = await getFacility(query.collection);

        /* send back server response */
        if (response.status === 200) {
          const data = await response.json();
          return res.status(200).json(data);
        }
        return res.status(response.status).json({
          message: `Error fetching data from server: ${response.statusText}`,
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

export default handler;
