import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  IKanbanBoardCollectionsDataPayload,
  IProxyErrorPayload,
} from '@/lib/api/api-types';
import { getCollectionsKanban } from '@/lib/api';

/**
 * Proxy for handling requests to ASECCA '/collection_kanban/api/collections' API.
 *
 * @see See [Next.js API route support](https://nextjs.org/docs/api-routes/introduction)
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 * @memberof NextjsAPI
 *
 * @param {NextApiRequest} req - the request data
 * @param {NextApiResponse<IKanbanBoardCollectionsDataPayload | IProxyErrorPayload | null>} res - the response data
 * @returns {NextApiResponse} - handler response
 */
const collectionsKanbanHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<
    IKanbanBoardCollectionsDataPayload | IProxyErrorPayload | null
  >
) => {
  const { method, body } = req;
  const { params } = body;

  /* determine which request type this is */
  switch (method) {
    case 'GET':
      /* call GET api */
      try {
        /* try proxying request to ASECCA API */
        const response = await getCollectionsKanban(params);

        /* send back server response */
        if (response.status === 200) {
          const data = await response.json();
          return res.status(200).json(data);
        }
        return res.status(response.status).json({
          message: `Failed to load Collection Kanban data from server: ${response.statusText}`,
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

export default collectionsKanbanHandler;
