import { z } from 'zod';

// 电子表格 token（URL 中 spreadsheet/ 后面的字符串，以 shtc 开头）
export const SheetTokenSchema = z.string().describe(
  'Feishu spreadsheet token (required). Found in the URL: `https://xxx.feishu.cn/sheets/{spreadsheetToken}`. Typically starts with "shtc".'
);

// 工作表 ID（sheetId，可通过 list_sheets 获取）
export const SheetIdSchema = z.string().describe(
  'Sheet ID (required). Use `list_feishu_sheets` to obtain it.'
);

// 单元格范围，A1 表示法，例如 "A1:C10" 或带 sheetId 前缀 "{sheetId}!A1:C10"
export const SheetRangeSchema = z.string().describe(
  'Cell range in A1 notation. Examples: "A1:C10" (active sheet), "{sheetId}!A1:C10" (specific sheet by ID), "Sheet1!A1:C10" (specific sheet by title). ' +
    'For multi-sheet spreadsheets, always prefix with sheetId or sheet title to avoid ambiguity.'
);

// 多个范围
export const SheetRangesSchema = z
  .array(SheetRangeSchema)
  .min(1)
  .describe('Array of cell ranges to read in one request.');

// 单元格值，二维数组
export const SheetValuesSchema = z.array(z.array(z.any())).describe(
  '2D array of cell values. Each inner array represents a row. Use empty strings for blank cells.'
);

// 分页 token
export const SheetPageTokenSchema = z.string().optional().describe(
  'Pagination token (optional). Use the page_token from the previous response to fetch the next page.'
);

// 每页数量
export const SheetPageSizeSchema = z.number().int().min(1).max(500).optional().default(100).describe(
  'Number of items per page (optional). Max 500, default 100.'
);

// 电子表格标题
export const SpreadsheetTitleSchema = z.string().min(1).max(255).describe(
  'Title of the new spreadsheet file.'
);

// 文件夹 token（可选）
export const SpreadsheetFolderTokenSchema = z.string().optional().describe(
  'Optional folder token where the spreadsheet will be created. If omitted, creates in the user\'s root drive.'
);

// 工作表标题
export const SheetTitleSchema = z.string().min(1).max(100).describe(
  'Title of the new sheet.'
);

// 写入时是否按行/列扩展，以及是否覆盖等选项
export const SheetValueInputOptionSchema = z
  .enum(['RAW', 'USER_ENTERED'])
  .optional()
  .default('USER_ENTERED')
  .describe(
    'How the input data should be interpreted. USER_ENTERED: formulas/parsing applied; RAW: stored as-is.'
  );
