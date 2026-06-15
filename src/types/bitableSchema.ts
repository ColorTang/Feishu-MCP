import { z } from 'zod';

// 多维表格 App Token（URL 中 base/ 后面的字符串）
export const BitableAppTokenSchema = z.string().describe(
  'Bitable app token (required). Found in the URL of a Feishu Bitable: `https://xxx.feishu.cn/base/{appToken}`.'
);

// 表格 ID（URL 中 table= 后面的字符串，以 tbl 开头）
export const BitableTableIdSchema = z.string().describe(
  'Bitable table ID (required). Found in the URL query parameter `table={tableId}`, typically starts with "tbl".'
);

// 记录 ID（以 rec 开头）
export const BitableRecordIdSchema = z.string().describe(
  'Bitable record ID (required). Unique identifier of a record, typically starts with "rec".'
);

// 分页 token
export const BitablePageTokenSchema = z.string().optional().describe(
  'Pagination token (optional). Use the page_token from the previous response to fetch the next page.'
);

// 每页数量
export const BitablePageSizeSchema = z.number().int().min(1).max(500).optional().default(100).describe(
  'Number of items per page (optional). Max 500, default 100.'
);

// 字段数据（key-value 对象，value 类型根据字段类型变化）
export const BitableFieldsSchema = z.record(z.any()).describe(
  'Record fields as a key-value object. Field names are the visible names in Bitable. Values depend on field type:\n' +
    '- Text: "hello"\n' +
    '- Number: 123\n' +
    '- Date: 1704067200000 (timestamp in milliseconds)\n' +
    '- Single select: "Option A"\n' +
    '- Multi select: ["Option A", "Option B"]\n' +
    '- User: [{ id: "ou_xxx", id_type: "open_id" }]\n' +
    '- Checkbox: true\n' +
    '- URL: { text: "Google", link: "https://google.com" }'
);

// 单条记录创建项
export const BitableCreateRecordSchema = z.object({
  fields: BitableFieldsSchema,
});

// 单条记录更新项
export const BitableUpdateRecordSchema = z.object({
  recordId: BitableRecordIdSchema,
  fields: BitableFieldsSchema,
});

// 查询条件（飞书 Bitable 条件格式，可选）
export const BitableFilterSchema = z.any().optional().describe(
  'Optional query filter object. See Feishu Bitable API documentation for filter syntax. Examples:\n' +
    '{ "conjunction": "and", "conditions": [{ "field_name": "Status", "operator": "is", "value": ["Done"] }] }\n' +
    'If omitted, all records are returned.'
);
