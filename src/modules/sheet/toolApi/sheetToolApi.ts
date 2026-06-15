import { FeishuApiService } from '../../../services/feishuApiService.js';
import { Logger } from '../../../utils/logger.js';

export interface GetSpreadsheetInfoParams {
  spreadsheetToken: string;
}

export async function getSpreadsheetInfo(params: GetSpreadsheetInfoParams, api: FeishuApiService): Promise<any> {
  const { spreadsheetToken } = params;
  Logger.info(`getSpreadsheetInfo invoked: spreadsheetToken=${spreadsheetToken}`);
  return api.getSpreadsheetInfo(spreadsheetToken);
}

export interface ListSheetsParams {
  spreadsheetToken: string;
}

export async function listSheets(params: ListSheetsParams, api: FeishuApiService): Promise<any> {
  const { spreadsheetToken } = params;
  Logger.info(`listSheets invoked: spreadsheetToken=${spreadsheetToken}`);
  return api.listSheets(spreadsheetToken);
}

export interface CreateSheetParams {
  spreadsheetToken: string;
  title: string;
}

export async function createSheet(params: CreateSheetParams, api: FeishuApiService): Promise<any> {
  const { spreadsheetToken, title } = params;
  Logger.info(`createSheet invoked: spreadsheetToken=${spreadsheetToken}, title=${title}`);
  return api.createSheet(spreadsheetToken, title);
}

export interface DeleteSheetParams {
  spreadsheetToken: string;
  sheetId: string;
}

export async function deleteSheet(params: DeleteSheetParams, api: FeishuApiService): Promise<any> {
  const { spreadsheetToken, sheetId } = params;
  Logger.info(`deleteSheet invoked: spreadsheetToken=${spreadsheetToken}, sheetId=${sheetId}`);
  return api.deleteSheet(spreadsheetToken, sheetId);
}

export interface UpdateSheetParams {
  spreadsheetToken: string;
  sheetId: string;
  title: string;
}

export async function updateSheet(params: UpdateSheetParams, api: FeishuApiService): Promise<any> {
  const { spreadsheetToken, sheetId, title } = params;
  Logger.info(`updateSheet invoked: spreadsheetToken=${spreadsheetToken}, sheetId=${sheetId}, title=${title}`);
  return api.updateSheet(spreadsheetToken, sheetId, title);
}

export interface GetSheetValuesParams {
  spreadsheetToken: string;
  range: string;
}

export async function getSheetValues(params: GetSheetValuesParams, api: FeishuApiService): Promise<any> {
  const { spreadsheetToken, range } = params;
  Logger.info(`getSheetValues invoked: spreadsheetToken=${spreadsheetToken}, range=${range}`);
  return api.getSheetValues(spreadsheetToken, range);
}

export interface BatchGetSheetValuesParams {
  spreadsheetToken: string;
  ranges: string[];
}

export async function batchGetSheetValues(
  params: BatchGetSheetValuesParams,
  api: FeishuApiService
): Promise<any> {
  const { spreadsheetToken, ranges } = params;
  Logger.info(`batchGetSheetValues invoked: spreadsheetToken=${spreadsheetToken}, ranges=${ranges.join(',')}`);
  return api.batchGetSheetValues(spreadsheetToken, ranges);
}

export interface SetSheetValuesParams {
  spreadsheetToken: string;
  range: string;
  values: any[][];
  valueInputOption?: 'RAW' | 'USER_ENTERED';
}

export async function setSheetValues(params: SetSheetValuesParams, api: FeishuApiService): Promise<any> {
  const { spreadsheetToken, range, values, valueInputOption } = params;
  Logger.info(`setSheetValues invoked: spreadsheetToken=${spreadsheetToken}, range=${range}`);
  return api.setSheetValues(spreadsheetToken, range, values, valueInputOption);
}

export interface AppendSheetValuesParams {
  spreadsheetToken: string;
  range: string;
  values: any[][];
  valueInputOption?: 'RAW' | 'USER_ENTERED';
}

export async function appendSheetValues(params: AppendSheetValuesParams, api: FeishuApiService): Promise<any> {
  const { spreadsheetToken, range, values, valueInputOption } = params;
  Logger.info(`appendSheetValues invoked: spreadsheetToken=${spreadsheetToken}, range=${range}`);
  return api.appendSheetValues(spreadsheetToken, range, values, valueInputOption);
}
