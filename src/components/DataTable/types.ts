/**
 * type definition for Data Table column properties
 *
 * @since - 0.0.0
 */
export interface IDataTableColumn {
  label: string;
  key: string;
  type: 'string' | 'currency';
}

/**
 * type definition for Data Table row properties
 *
 * @since - 0.0.0
 */
export interface IDataTableRow {
  label: string;
}

/**
 * function type definition for Data Table Cell edits
 *
 * @since - 0.0.0
 */
export interface IDataTableEditCellValueCallback {
  (value: string | null, colKey: string, rowIdx: number): void;
}

/**
 * function type definition for Data Table Cell value retrieval
 *
 * @since - 0.0.0
 */
export interface IDataTableGetCellValueCallback {
  (rowIdx: number, column: IDataTableColumn): string | null | undefined;
}
