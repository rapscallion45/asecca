/*
 * Kanban Board type definitions
 *
 * These type definitions are used in the applications kanban board component.
 * Only make changes to this file if the corresponding change is made in the
 * Kanban Board component(s)
 */

/**
 * Kanban Board Column On Drop callback function typedef
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.7
 *
 * @callback IKanbanBoardColumnOnDropCallback
 * @param {number} colIndex - column index of task
 * @param {number} prevColIndex - previous column index of task
 * @param {number} taskIndex - index of task
 * @returns {void} - no return value
 */
export interface IKanbanBoardColumnOnDropCallback {
  (colIndex: number, prevColIndex: number, taskIndex: number): void;
}
