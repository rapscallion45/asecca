import { ICostsConfigData } from '@/lib/api/api-types';

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

/*
 ** function type definition for Data Table Cell value retrieval
 */
export interface IDataTableGetCellValueCallback {
  (
    row: ICostsConfigData,
    column: IDataTableColumn,
    editCol: IDataTableColumn | undefined
  ): string | null | undefined;
}
