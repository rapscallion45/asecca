/*
 * Data Table type definitions
 *
 * These type definitions are used in the applications data table component.
 * Only make changes to this file if the corresponding change is made in the
 * Data Table component(s)
 */

/**
 * Data Table Column types
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof DataTable
 *
 * @typedef DataTableColumnType
 */
export type DataTableColumnType = 'string' | 'currency';

/**
 * Data Table Column properties
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IDataTableColumn
 * @prop {string} label - data table column name
 * @prop {string} key - data table column data identifier
 * @prop {DataTableColumnType} type - data table column type
 */
export interface IDataTableColumn {
  label: string;
  key: string;
  type: DataTableColumnType;
}

/**
 * Data Table Row properties
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IDataTableRow
 * @prop {string} label - data table row name
 */
export interface IDataTableRow {
  label: string;
}

/**
 * Data Table Cell Edit callback function typedef
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @callback IDataTableEditCellValueCallback
 * @param {string | null} value - updated cell value, can be null
 * @param {string} colKey - cell column data identifier
 * @param {number} rowIdx - cell row index in data table
 * @returns {void} - no return value
 */
export interface IDataTableEditCellValueCallback {
  (value: string | null, colKey: string, rowIdx: number): void;
}

/**
 * Data Table Cell Value Retrieval callback function typedef
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @callback IDataTableGetCellValueCallback
 * @param {number} rowIdx - cell row index in data table
 * @param {IDataTableColumn} column - cell column in data table
 * @returns {string | null | undefined} - cell value, can be null or undefined
 */
export interface IDataTableGetCellValueCallback {
  (rowIdx: number, column: IDataTableColumn): string | null | undefined;
}

/**
 * Data Table Currency Cell Value Edit callback function typedef
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @callback IDataTableEditCurrencyCellValueCallback
 * @param {string | null} value - updated cell value
 * @returns {void} - no return value
 */
export interface IDataTableEditCurrencyCellValueCallback {
  (value: string | null): void;
}
