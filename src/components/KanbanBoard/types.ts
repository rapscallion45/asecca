/*
 * Kanban Board type definitions
 *
 * These type definitions are used in the applications Kanban components.
 * Only make changes to this file if the corresponding change is made in the
 * Kanban component(s)
 */

/**
 * Kanban Board Column type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 *
 * @typedef IKanbanBoardColumn
 * @prop {string} name - column name
 * @prop {Array<IKanbanBoardTask>} tasks - column tasks
 * @prop {string} id - column ID
 */
export interface IKanbanBoardColumn {
  name: string;
  id: string;
}

/**
 * Kanban Board type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 *
 * @typedef IKanbanBoard
 * @prop {string} name - board name
 * @prop {Array<IKanbanBoardColumn>} columns - board columns
 */
export interface IKanbanBoard {
  name: string;
  columns: Array<IKanbanBoardColumn>;
}
