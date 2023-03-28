import { CostsConfigDataPayload } from '@/api-types';

export type FetchCostsConfigBySourceIdArgs = {
  source: string;
  dataId: string | (string | null)[];
};

export type SaveCostsConfigBySourceIdArgs = {
  source: string;
  dataId: string | (string | null)[];
  data: any;
};

export type UserPermissionLevelState = {
  level: 'Global' | 'Customer' | 'Project' | 'Collection';
};

export type CostsConfigEditCostsPayload = {
  colKey: string | undefined;
  rowIdx: number;
  value: string | null;
};

export type CostsConfigState = {
  data?: CostsConfigDataPayload | null;
  error?: string | null;
  loading?: boolean;
};
