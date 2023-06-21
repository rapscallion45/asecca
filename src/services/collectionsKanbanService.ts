/**
 * API services for Collections Kanban Board
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 */

/**
 * GET request to /api/kanban/collections
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 * @memberof Services
 *
 * @param {string | null} projectId - ID of project board to fetch
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function getKanbanBoardByProjectId(
  projectId?: string | (string | null)[]
) {
  /* configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /* send request and catch any errors */
  return fetch(
    `/api/kanban/collections${
      projectId !== null ? `?project_id=${projectId}` : ''
    }`,
    requestOptions
  );
}

const collectionsKanbanService = {
  getKanbanBoardByProjectId,
};

export default collectionsKanbanService;
