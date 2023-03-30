/*
 ** type definition for Data Table column properties
 */
export interface IDataTableColumn {
  label: string;
  key: string;
  type: 'string' | 'currency';
}

/*
 ** type definition for Data Table row properties
 */
export interface IDataTableRow {
  label: string;
}

/*
 ** function type definition for Data Table Cell edits
 */
export interface IDataTableEditCellValueCallback {
  (value: string | null, colKey: string, rowIdx: number): void;
}

/*
 ** function type definition for Data Table Cell value retrieval
 */
export interface IDataTableGetCellValueCallback {
  (rowIdx: number, column: IDataTableColumn): string | null | undefined;
}
