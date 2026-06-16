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

// 多维表名称
export const BitableAppNameSchema = z.string().min(1).max(255).describe(
  'Name of the new Bitable app.'
);

// 文件夹 token（可选）
export const BitableFolderTokenSchema = z.string().optional().describe(
  'Optional folder token where the Bitable app will be created. If omitted, creates in the user\'s root drive.'
);

// 表格名称
export const BitableTableNameSchema = z.string().min(1).max(255).describe(
  'Name of the new table within a Bitable app.'
);

// 字段类型（飞书 API 使用数字 type）
export const BitableFieldTypeSchema = z.number().int().min(1).max(23).describe(
  'Field type number for a new Bitable field. Common values:\n' +
    '1: Text, 2: Number, 3: SingleSelect, 4: MultiSelect, 5: DateTime, 7: Checkbox,\n' +
    '8: MultilineText, 11: Attachment, 13: Url, 14: Formula, 15: DuplexLink,\n' +
    '17: LookUp, 18: AutoNumber, 19: CreatedTime, 20: ModifiedTime,\n' +
    '21: CreatedUser, 22: ModifiedUser, 23: Button.'
);

// 字段属性（根据类型变化）
export const BitableFieldPropertySchema = z.record(z.any()).optional().describe(
  'Optional field properties depending on field type.\n' +
    '- SingleSelect/MultiSelect: { options: [{ name: "Option A", color: 1 }] }\n' +
    '- Number: { formatter: "0.00" }\n' +
    '- DateTime: { date_formatter: "yyyy/MM/dd", time_formatter: "HH:mm" }\n' +
    'See Feishu Bitable API docs for full details.'
);

// 创建字段参数
export const BitableCreateFieldSchema = z.object({
  fieldName: z.string().min(1).max(255).describe('Name of the new field.'),
  fieldType: BitableFieldTypeSchema,
  property: BitableFieldPropertySchema,
});
