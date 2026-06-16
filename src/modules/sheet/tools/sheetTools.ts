import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { formatErrorMessage } from '../../../utils/error.js';
import { FeishuApiService } from '../../../services/feishuApiService.js';
import { Logger } from '../../../utils/logger.js';
import { errorResponse } from '../../document/tools/toolHelpers.js';
import {
  createSpreadsheet,
  getSpreadsheetInfo,
  listSheets,
  createSheet,
  deleteSheet,
  updateSheet,
  getSheetValues,
  batchGetSheetValues,
  setSheetValues,
  appendSheetValues,
} from '../toolApi/sheetToolApi.js';
import {
  SheetTokenSchema,
  SheetIdSchema,
  SheetRangeSchema,
  SheetRangesSchema,
  SheetValuesSchema,
  SheetTitleSchema,
  SheetValueInputOptionSchema,
  SpreadsheetTitleSchema,
  SpreadsheetFolderTokenSchema,
} from '../../../types/sheetSchema.js';

/**
 * 注册飞书电子表格相关的 MCP 工具
 */
export function registerSheetTools(server: McpServer, feishuService: FeishuApiService): void {
  server.tool(
    'create_feishu_spreadsheet',
    'Creates a new Feishu spreadsheet file. Returns spreadsheet token and URL.',
    {
      title: SpreadsheetTitleSchema,
      folderToken: SpreadsheetFolderTokenSchema,
    },
    async ({ title, folderToken }) => {
      try {
        const result = await createSpreadsheet({ title, folderToken }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('创建电子表格失败:', error);
        return errorResponse(`创建电子表格失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'get_feishu_spreadsheet_info',
    'Gets metadata of a Feishu spreadsheet.',
    { spreadsheetToken: SheetTokenSchema },
    async ({ spreadsheetToken }) => {
      try {
        const result = await getSpreadsheetInfo({ spreadsheetToken }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('获取电子表格信息失败:', error);
        return errorResponse(`获取电子表格信息失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'list_feishu_sheets',
    'Lists all worksheets within a spreadsheet.',
    { spreadsheetToken: SheetTokenSchema },
    async ({ spreadsheetToken }) => {
      try {
        const result = await listSheets({ spreadsheetToken }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('列出工作表失败:', error);
        return errorResponse(`列出工作表失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'create_feishu_sheet',
    'Creates a new worksheet in a spreadsheet.',
    {
      spreadsheetToken: SheetTokenSchema,
      title: SheetTitleSchema,
    },
    async ({ spreadsheetToken, title }) => {
      try {
        const result = await createSheet({ spreadsheetToken, title }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('创建工作表失败:', error);
        return errorResponse(`创建工作表失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'delete_feishu_sheet',
    'Deletes a worksheet from a spreadsheet.',
    {
      spreadsheetToken: SheetTokenSchema,
      sheetId: SheetIdSchema,
    },
    async ({ spreadsheetToken, sheetId }) => {
      try {
        const result = await deleteSheet({ spreadsheetToken, sheetId }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('删除工作表失败:', error);
        return errorResponse(`删除工作表失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'update_feishu_sheet',
    'Updates properties of a worksheet (e.g. title).',
    {
      spreadsheetToken: SheetTokenSchema,
      sheetId: SheetIdSchema,
      title: SheetTitleSchema,
    },
    async ({ spreadsheetToken, sheetId, title }) => {
      try {
        const result = await updateSheet({ spreadsheetToken, sheetId, title }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('更新工作表失败:', error);
        return errorResponse(`更新工作表失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'get_feishu_sheet_values',
    'Reads values from a cell range in A1 notation.',
    {
      spreadsheetToken: SheetTokenSchema,
      range: SheetRangeSchema,
    },
    async ({ spreadsheetToken, range }) => {
      try {
        const result = await getSheetValues({ spreadsheetToken, range }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('读取单元格失败:', error);
        return errorResponse(`读取单元格失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'batch_get_feishu_sheet_values',
    'Reads values from multiple cell ranges in one request.',
    {
      spreadsheetToken: SheetTokenSchema,
      ranges: SheetRangesSchema,
    },
    async ({ spreadsheetToken, ranges }) => {
      try {
        const result = await batchGetSheetValues({ spreadsheetToken, ranges }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('批量读取单元格失败:', error);
        return errorResponse(`批量读取单元格失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'set_feishu_sheet_values',
    'Writes values to a cell range. Existing values in the range are overwritten.',
    {
      spreadsheetToken: SheetTokenSchema,
      range: SheetRangeSchema,
      values: SheetValuesSchema,
      valueInputOption: SheetValueInputOptionSchema,
    },
    async ({ spreadsheetToken, range, values, valueInputOption }) => {
      try {
        const result = await setSheetValues(
          { spreadsheetToken, range, values, valueInputOption },
          feishuService
        );
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('写入单元格失败:', error);
        return errorResponse(`写入单元格失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'append_feishu_sheet_values',
    'Appends rows to a worksheet. The range should be the header row of the target table, e.g. "Sheet1!A1:E1" or "{sheetId}!A1:E1". The API uses this range to determine the columns and appends the provided rows below existing data.',
    {
      spreadsheetToken: SheetTokenSchema,
      range: SheetRangeSchema,
      values: SheetValuesSchema,
      valueInputOption: SheetValueInputOptionSchema,
    },
    async ({ spreadsheetToken, range, values, valueInputOption }) => {
      try {
        const result = await appendSheetValues(
          { spreadsheetToken, range, values, valueInputOption },
          feishuService
        );
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('追加行失败:', error);
        return errorResponse(`追加行失败: ${formatErrorMessage(error)}`);
      }
    }
  );
}
