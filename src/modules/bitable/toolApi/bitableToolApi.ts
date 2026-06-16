import { FeishuApiService } from '../../../services/feishuApiService.js';
import { Logger } from '../../../utils/logger.js';

export interface CreateBitableAppParams {
  name: string;
  folderToken?: string;
}

export async function createBitableApp(params: CreateBitableAppParams, api: FeishuApiService): Promise<any> {
  const { name, folderToken } = params;
  Logger.info(`createBitableApp invoked: name=${name}`);
  return api.createBitableApp(name, folderToken);
}

export interface CreateBitableTableParams {
  appToken: string;
  name: string;
}

export async function createBitableTable(params: CreateBitableTableParams, api: FeishuApiService): Promise<any> {
  const { appToken, name } = params;
  Logger.info(`createBitableTable invoked: appToken=${appToken}, name=${name}`);
  return api.createBitableTable(appToken, name);
}

export interface CreateBitableFieldParams {
  appToken: string;
  tableId: string;
  fieldName: string;
  fieldType: number;
  property?: Record<string, any>;
}

export async function createBitableField(params: CreateBitableFieldParams, api: FeishuApiService): Promise<any> {
  const { appToken, tableId, fieldName, fieldType, property } = params;
  Logger.info(`createBitableField invoked: appToken=${appToken}, tableId=${tableId}, fieldName=${fieldName}`);
  return api.createBitableField(appToken, tableId, fieldName, fieldType, property);
}

export interface ListBitableTablesParams {
  appToken: string;
  pageToken?: string;
  pageSize?: number;
}

export async function listBitableTables(params: ListBitableTablesParams, api: FeishuApiService): Promise<any> {
  const { appToken, pageToken, pageSize } = params;
  Logger.info(`listBitableTables invoked: appToken=${appToken}`);
  return api.listBitableTables(appToken, pageToken, pageSize);
}

export interface ListBitableFieldsParams {
  appToken: string;
  tableId: string;
  pageToken?: string;
  pageSize?: number;
}

export async function listBitableFields(params: ListBitableFieldsParams, api: FeishuApiService): Promise<any> {
  const { appToken, tableId, pageToken, pageSize } = params;
  Logger.info(`listBitableFields invoked: appToken=${appToken}, tableId=${tableId}`);
  return api.listBitableFields(appToken, tableId, pageToken, pageSize);
}

export interface ListBitableRecordsParams {
  appToken: string;
  tableId: string;
  pageToken?: string;
  pageSize?: number;
}

export async function listBitableRecords(params: ListBitableRecordsParams, api: FeishuApiService): Promise<any> {
  const { appToken, tableId, pageToken, pageSize } = params;
  Logger.info(`listBitableRecords invoked: appToken=${appToken}, tableId=${tableId}`);
  return api.listBitableRecords(appToken, tableId, pageToken, pageSize);
}

export interface SearchBitableRecordsParams {
  appToken: string;
  tableId: string;
  filter?: any;
  pageToken?: string;
  pageSize?: number;
}

export async function searchBitableRecords(params: SearchBitableRecordsParams, api: FeishuApiService): Promise<any> {
  const { appToken, tableId, filter, pageToken, pageSize } = params;
  Logger.info(`searchBitableRecords invoked: appToken=${appToken}, tableId=${tableId}`);
  return api.searchBitableRecords(appToken, tableId, filter, pageToken, pageSize);
}

export interface CreateBitableRecordParams {
  appToken: string;
  tableId: string;
  fields: Record<string, any>;
}

export async function createBitableRecord(params: CreateBitableRecordParams, api: FeishuApiService): Promise<any> {
  const { appToken, tableId, fields } = params;
  Logger.info(`createBitableRecord invoked: appToken=${appToken}, tableId=${tableId}`);
  return api.createBitableRecord(appToken, tableId, fields);
}

export interface BatchCreateBitableRecordsParams {
  appToken: string;
  tableId: string;
  records: Array<{ fields: Record<string, any> }>;
}

export async function batchCreateBitableRecords(
  params: BatchCreateBitableRecordsParams,
  api: FeishuApiService
): Promise<any> {
  const { appToken, tableId, records } = params;
  Logger.info(`batchCreateBitableRecords invoked: appToken=${appToken}, tableId=${tableId}, count=${records.length}`);
  return api.batchCreateBitableRecords(appToken, tableId, records);
}

export interface UpdateBitableRecordParams {
  appToken: string;
  tableId: string;
  recordId: string;
  fields: Record<string, any>;
}

export async function updateBitableRecord(params: UpdateBitableRecordParams, api: FeishuApiService): Promise<any> {
  const { appToken, tableId, recordId, fields } = params;
  Logger.info(`updateBitableRecord invoked: appToken=${appToken}, tableId=${tableId}, recordId=${recordId}`);
  return api.updateBitableRecord(appToken, tableId, recordId, fields);
}

export interface BatchUpdateBitableRecordsParams {
  appToken: string;
  tableId: string;
  records: Array<{ record_id: string; fields: Record<string, any> }>;
}

export async function batchUpdateBitableRecords(
  params: BatchUpdateBitableRecordsParams,
  api: FeishuApiService
): Promise<any> {
  const { appToken, tableId, records } = params;
  Logger.info(`batchUpdateBitableRecords invoked: appToken=${appToken}, tableId=${tableId}, count=${records.length}`);
  return api.batchUpdateBitableRecords(appToken, tableId, records);
}

export interface DeleteBitableRecordParams {
  appToken: string;
  tableId: string;
  recordId: string;
}

export async function deleteBitableRecord(params: DeleteBitableRecordParams, api: FeishuApiService): Promise<any> {
  const { appToken, tableId, recordId } = params;
  Logger.info(`deleteBitableRecord invoked: appToken=${appToken}, tableId=${tableId}, recordId=${recordId}`);
  return api.deleteBitableRecord(appToken, tableId, recordId);
}

export interface BatchDeleteBitableRecordsParams {
  appToken: string;
  tableId: string;
  recordIds: string[];
}

export async function batchDeleteBitableRecords(
  params: BatchDeleteBitableRecordsParams,
  api: FeishuApiService
): Promise<any> {
  const { appToken, tableId, recordIds } = params;
  Logger.info(`batchDeleteBitableRecords invoked: appToken=${appToken}, tableId=${tableId}, count=${recordIds.length}`);
  return api.batchDeleteBitableRecords(appToken, tableId, recordIds);
}
