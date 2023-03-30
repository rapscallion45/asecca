/*
 ** type definition for Data Table column properties
 */
export interface IDataTableColumn {
  label: string;
  key: string;
  type: 'string' | 'currency';
}

/*
 ** function type definition for Data Table Cell edits
 */
export interface IDataTableEditCellCallback {
  (value: string | null, colKey: string, rowIdx: number): void;
}
