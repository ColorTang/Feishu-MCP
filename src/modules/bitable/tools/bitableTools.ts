import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { formatErrorMessage } from '../../../utils/error.js';
import { FeishuApiService } from '../../../services/feishuApiService.js';
import { Logger } from '../../../utils/logger.js';
import {
  createBitableApp,
  createBitableTable,
  createBitableField,
  listBitableTables,
  listBitableFields,
  listBitableRecords,
  searchBitableRecords,
  createBitableRecord,
  batchCreateBitableRecords,
  updateBitableRecord,
  batchUpdateBitableRecords,
  deleteBitableRecord,
  batchDeleteBitableRecords,
} from '../toolApi/bitableToolApi.js';
import {
  BitableAppTokenSchema,
  BitableTableIdSchema,
  BitableRecordIdSchema,
  BitablePageTokenSchema,
  BitablePageSizeSchema,
  BitableFieldsSchema,
  BitableFilterSchema,
  BitableAppNameSchema,
  BitableFolderTokenSchema,
  BitableTableNameSchema,
  BitableCreateFieldSchema,
} from '../../../types/bitableSchema.js';
import { errorResponse } from '../../document/tools/toolHelpers.js';

/**
 * 注册飞书多维表格相关的 MCP 工具
 */
export function registerBitableTools(server: McpServer, feishuService: FeishuApiService): void {
  server.tool(
    'create_feishu_bitable_app',
    'Creates a new Feishu Bitable app. Returns app token and URL.',
    {
      name: BitableAppNameSchema,
      folderToken: BitableFolderTokenSchema,
    },
    async ({ name, folderToken }) => {
      try {
        const result = await createBitableApp({ name, folderToken }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('创建多维表失败:', error);
        return errorResponse(`创建多维表失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'create_feishu_bitable_table',
    'Creates a new table within a Feishu Bitable app.',
    {
      appToken: BitableAppTokenSchema,
      name: BitableTableNameSchema,
    },
    async ({ appToken, name }) => {
      try {
        const result = await createBitableTable({ appToken, name }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('创建多维表表格失败:', error);
        return errorResponse(`创建多维表表格失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'create_feishu_bitable_field',
    'Creates a new field (column) in a Bitable table.',
    {
      appToken: BitableAppTokenSchema,
      tableId: BitableTableIdSchema,
      fieldName: BitableCreateFieldSchema.shape.fieldName,
      fieldType: BitableCreateFieldSchema.shape.fieldType,
      property: BitableCreateFieldSchema.shape.property,
    },
    async ({ appToken, tableId, fieldName, fieldType, property }) => {
      try {
        const result = await createBitableField(
          { appToken, tableId, fieldName, fieldType, property },
          feishuService
        );
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('创建多维表字段失败:', error);
        return errorResponse(`创建多维表字段失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'list_feishu_bitable_tables',
    'Lists all tables within a Feishu Bitable app.',
    {
      appToken: BitableAppTokenSchema,
      pageToken: BitablePageTokenSchema,
      pageSize: BitablePageSizeSchema,
    },
    async ({ appToken, pageToken, pageSize }) => {
      try {
        const result = await listBitableTables({ appToken, pageToken, pageSize }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('列出多维表格失败:', error);
        return errorResponse(`列出多维表格失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'list_feishu_bitable_fields',
    'Lists all fields (columns) of a Bitable table.',
    {
      appToken: BitableAppTokenSchema,
      tableId: BitableTableIdSchema,
      pageToken: BitablePageTokenSchema,
      pageSize: BitablePageSizeSchema,
    },
    async ({ appToken, tableId, pageToken, pageSize }) => {
      try {
        const result = await listBitableFields({ appToken, tableId, pageToken, pageSize }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('列出表格字段失败:', error);
        return errorResponse(`列出表格字段失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'list_feishu_bitable_records',
    'Lists records of a Bitable table with pagination.',
    {
      appToken: BitableAppTokenSchema,
      tableId: BitableTableIdSchema,
      pageToken: BitablePageTokenSchema,
      pageSize: BitablePageSizeSchema,
    },
    async ({ appToken, tableId, pageToken, pageSize }) => {
      try {
        const result = await listBitableRecords({ appToken, tableId, pageToken, pageSize }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('列出表格记录失败:', error);
        return errorResponse(`列出表格记录失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'search_feishu_bitable_records',
    'Searches records in a Bitable table using a filter.',
    {
      appToken: BitableAppTokenSchema,
      tableId: BitableTableIdSchema,
      filter: BitableFilterSchema,
      pageToken: BitablePageTokenSchema,
      pageSize: BitablePageSizeSchema,
    },
    async ({ appToken, tableId, filter, pageToken, pageSize }) => {
      try {
        const result = await searchBitableRecords({ appToken, tableId, filter, pageToken, pageSize }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('搜索表格记录失败:', error);
        return errorResponse(`搜索表格记录失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'create_feishu_bitable_record',
    'Creates a single record in a Bitable table.',
    {
      appToken: BitableAppTokenSchema,
      tableId: BitableTableIdSchema,
      fields: BitableFieldsSchema,
    },
    async ({ appToken, tableId, fields }) => {
      try {
        const result = await createBitableRecord({ appToken, tableId, fields }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('创建表格记录失败:', error);
        return errorResponse(`创建表格记录失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'batch_create_feishu_bitable_records',
    'Creates multiple records in a Bitable table in one call.',
    {
      appToken: BitableAppTokenSchema,
      tableId: BitableTableIdSchema,
      records: z.array(z.object({ fields: BitableFieldsSchema })).describe('Array of records to create.'),
    },
    async ({ appToken, tableId, records }) => {
      try {
        const result = await batchCreateBitableRecords({ appToken, tableId, records }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('批量创建表格记录失败:', error);
        return errorResponse(`批量创建表格记录失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'update_feishu_bitable_record',
    'Updates a single record in a Bitable table.',
    {
      appToken: BitableAppTokenSchema,
      tableId: BitableTableIdSchema,
      recordId: BitableRecordIdSchema,
      fields: BitableFieldsSchema,
    },
    async ({ appToken, tableId, recordId, fields }) => {
      try {
        const result = await updateBitableRecord({ appToken, tableId, recordId, fields }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('更新表格记录失败:', error);
        return errorResponse(`更新表格记录失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'batch_update_feishu_bitable_records',
    'Updates multiple records in a Bitable table in one call.',
    {
      appToken: BitableAppTokenSchema,
      tableId: BitableTableIdSchema,
      records: z
        .array(z.object({ recordId: BitableRecordIdSchema, fields: BitableFieldsSchema }))
        .describe('Array of records to update.'),
    },
    async ({ appToken, tableId, records }) => {
      try {
        const result = await batchUpdateBitableRecords(
          { appToken, tableId, records: records.map((r) => ({ record_id: r.recordId, fields: r.fields })) },
          feishuService
        );
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('批量更新表格记录失败:', error);
        return errorResponse(`批量更新表格记录失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'delete_feishu_bitable_record',
    'Deletes a single record from a Bitable table.',
    {
      appToken: BitableAppTokenSchema,
      tableId: BitableTableIdSchema,
      recordId: BitableRecordIdSchema,
    },
    async ({ appToken, tableId, recordId }) => {
      try {
        const result = await deleteBitableRecord({ appToken, tableId, recordId }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('删除表格记录失败:', error);
        return errorResponse(`删除表格记录失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'batch_delete_feishu_bitable_records',
    'Deletes multiple records from a Bitable table in one call.',
    {
      appToken: BitableAppTokenSchema,
      tableId: BitableTableIdSchema,
      recordIds: z.array(BitableRecordIdSchema).describe('Array of record IDs to delete.'),
    },
    async ({ appToken, tableId, recordIds }) => {
      try {
        const result = await batchDeleteBitableRecords({ appToken, tableId, recordIds }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('批量删除表格记录失败:', error);
        return errorResponse(`批量删除表格记录失败: ${formatErrorMessage(error)}`);
      }
    }
  );
}
