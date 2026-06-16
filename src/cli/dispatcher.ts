import { FeishuApiService } from '../services/feishuApiService.js';
import {
  UserContextManager,
  TokenCacheManager,
  AuthUtils,
  assertExplicitUserKey,
  isConfiguredUserKeyProvided,
} from '../utils/auth/index.js';
import { Config } from '../utils/config.js';
import { handleAuthRequired } from './commands/auth.js';

// Document toolApis
import {
  createDocument,
  getDocumentInfo,
  getDocumentBlocks,
  searchDocuments,
  batchUpdateBlockText,
  batchCreateBlocks,
  deleteDocumentBlocks,
  getImageResource,
  uploadAndBindImageToBlock,
  createTable,
  getWhiteboardContent,
  fillWhiteboardWithPlantuml,
  getRootFolderInfo,
  getFolderFiles,
  createFolder,
} from '../modules/document/toolApi/index.js';

// Task toolApis
import { createTasks, listTasks, updateTask, deleteTasks } from '../modules/task/toolApi/index.js';

// Member toolApis
import { getUsers } from '../modules/member/toolApi/index.js';

// Sheet toolApis
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
} from '../modules/sheet/toolApi/sheetToolApi.js';

// Bitable toolApis
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
} from '../modules/bitable/toolApi/bitableToolApi.js';

// Permission toolApis
import { addDriveMember } from '../modules/permission/toolApi/permissionToolApi.js';

// Message toolApis
import { sendMessage, replyMessage } from '../modules/message/toolApi/messageToolApi.js';

type AuthType = 'tenant' | 'user';
type ToolHandler = (params: any, svc: FeishuApiService) => Promise<any>;

/** 将 getImageResource 返回的 Buffer 转为 base64 字符串输出 */
async function getImageResourceAsBase64(
  mediaId: string,
  extra: string,
  svc: FeishuApiService
): Promise<{ base64: string }> {
  const result = await getImageResource(mediaId, extra, svc);
  const buf = result instanceof Buffer ? result : Buffer.from((result as any).data);
  return { base64: buf.toString('base64') };
}

/** 将 getWhiteboardContent 返回的 Buffer 缩略图转为 base64 字符串输出 */
async function getWhiteboardContentSafe(
  whiteboardId: string,
  svc: FeishuApiService
): Promise<any> {
  const result = await getWhiteboardContent(whiteboardId, svc);
  if (result.type === 'thumbnail') {
    const buf = result.buffer instanceof Buffer ? result.buffer : Buffer.from((result.buffer as any).data);
    return { type: 'thumbnail', base64: buf.toString('base64') };
  }
  return result;
}

interface ModuleToolMap {
  /** 模块所需最低认证类型：tenant 表示两者均可，user 表示仅 user 模式可用 */
  authType: AuthType;
  tools: Record<string, ToolHandler>;
}

/**
 * 按模块组织的工具注册表，与 src/modules 目录划分保持一致
 */
const MODULE_REGISTRY: Record<string, ModuleToolMap> = {
  document: {
    authType: 'tenant',
    tools: {
      create_feishu_document:         (p, s) => createDocument(p, s),
      get_feishu_document_info:       (p, s) => getDocumentInfo(p, s),
      get_feishu_document_blocks:     (p, s) => getDocumentBlocks(p.documentId, s),
      search_feishu_documents:        (p, s) => searchDocuments(p, s),
      batch_update_feishu_block_text: (p, s) => batchUpdateBlockText(p, s),
      batch_create_feishu_blocks:     (p, s) => batchCreateBlocks(p, s),
      delete_feishu_document_blocks:  (p, s) => deleteDocumentBlocks(p, s),
      get_feishu_image_resource:      (p, s) => getImageResourceAsBase64(p.mediaId, p.extra ?? '', s),
      upload_and_bind_image_to_block: (p, s) => uploadAndBindImageToBlock(p, s),
      create_feishu_table:            (p, s) => createTable(p, s),
      get_feishu_whiteboard_content:  (p, s) => getWhiteboardContentSafe(p.whiteboardId, s),
      fill_whiteboard_with_plantuml:  (p, s) => fillWhiteboardWithPlantuml(p, s),
      get_feishu_root_folder_info:    (_p, s) => getRootFolderInfo(s),
      get_feishu_folder_files:        (p, s) => getFolderFiles(p, s),
      create_feishu_folder:           (p, s) => createFolder(p, s),
    },
  },

  task: {
    authType: 'user',
    tools: {
      list_feishu_tasks:  (p, s) => listTasks(p, s),
      create_feishu_task: (p, s) => createTasks(p.tasks, s),
      update_feishu_task: (p, s) => updateTask(p, s),
      delete_feishu_task: (p, s) => deleteTasks(p.taskGuids, s),
    },
  },

  member: {
    authType: 'user',
    tools: {
      get_feishu_users: (p, s) => getUsers(p, s),
    },
  },

  sheet: {
    authType: 'tenant',
    tools: {
      create_feishu_spreadsheet:   (p, s) => createSpreadsheet(p, s),
      get_feishu_spreadsheet_info: (p, s) => getSpreadsheetInfo(p, s),
      list_feishu_sheets:          (p, s) => listSheets(p, s),
      create_feishu_sheet:         (p, s) => createSheet(p, s),
      delete_feishu_sheet:         (p, s) => deleteSheet(p, s),
      update_feishu_sheet:         (p, s) => updateSheet(p, s),
      get_feishu_sheet_values:     (p, s) => getSheetValues(p, s),
      batch_get_feishu_sheet_values: (p, s) => batchGetSheetValues(p, s),
      set_feishu_sheet_values:     (p, s) => setSheetValues(p, s),
      append_feishu_sheet_values:  (p, s) => appendSheetValues(p, s),
    },
  },

  bitable: {
    authType: 'tenant',
    tools: {
      create_feishu_bitable_app:             (p, s) => createBitableApp(p, s),
      create_feishu_bitable_table:           (p, s) => createBitableTable(p, s),
      create_feishu_bitable_field:           (p, s) => createBitableField(p, s),
      list_feishu_bitable_tables:            (p, s) => listBitableTables(p, s),
      list_feishu_bitable_fields:            (p, s) => listBitableFields(p, s),
      list_feishu_bitable_records:           (p, s) => listBitableRecords(p, s),
      search_feishu_bitable_records:         (p, s) => searchBitableRecords(p, s),
      create_feishu_bitable_record:          (p, s) => createBitableRecord(p, s),
      batch_create_feishu_bitable_records:   (p, s) => batchCreateBitableRecords(p, s),
      update_feishu_bitable_record:          (p, s) => updateBitableRecord(p, s),
      batch_update_feishu_bitable_records:   (p, s) => batchUpdateBitableRecords(
        { ...p, records: p.records.map((r: any) => ({ record_id: r.recordId, fields: r.fields })) },
        s
      ),
      delete_feishu_bitable_record:          (p, s) => deleteBitableRecord(p, s),
      batch_delete_feishu_bitable_records:   (p, s) => batchDeleteBitableRecords(p, s),
    },
  },

  permission: {
    authType: 'tenant',
    tools: {
      add_feishu_drive_member: (p, s) => addDriveMember(p, s),
    },
  },

  message: {
    authType: 'tenant',
    tools: {
      send_feishu_message:  (p, s) => sendMessage(p, s),
      reply_feishu_message: (p, s) => replyMessage(p, s),
    },
  },
};

/** 将 MODULE_REGISTRY 展平为 toolName → handler 的查找表 */
function buildFlatMap(): Record<string, ToolHandler> {
  const flat: Record<string, ToolHandler> = {};
  for (const mod of Object.values(MODULE_REGISTRY)) {
    Object.assign(flat, mod.tools);
  }
  return flat;
}

const FLAT_TOOL_MAP = buildFlatMap();

/**
 * 返回支持的工具名称列表，按认证类型过滤
 * tenant 模式下排除需要 user 认证的模块工具
 */
export function listTools(authType?: AuthType): string[] {
  const tools: string[] = [];
  for (const mod of Object.values(MODULE_REGISTRY)) {
    if (authType === 'tenant' && mod.authType === 'user') continue;
    tools.push(...Object.keys(mod.tools));
  }
  return tools;
}

/**
 * 调度指定工具，注入用户上下文，处理 AuthRequiredError 并自动重试一次
 */
export async function dispatch(toolName: string, params: unknown): Promise<unknown> {
  const handler = FLAT_TOOL_MAP[toolName];
  if (!handler) {
    throw new Error(`未知工具: "${toolName}"。可用工具：\n${listTools().join('\n')}`);
  }

  const config = Config.getInstance();
  const userKey = config.feishu.userKey;
  const userContextManager = UserContextManager.getInstance();
  const apiService = FeishuApiService.getInstance();
  const baseUrl = `http://localhost:${config.server.port}`;

  // stdio 模式下，userKey 来自配置（环境变量或 CLI 参数），视为明确提供
  const isUserKeyProvided = isConfiguredUserKeyProvided(userKey);

  const invoke = (): Promise<unknown> =>
    userContextManager.run(
      { userKey, baseUrl, isUserKeyProvided, userKeyMode: 'stdio' },
      () => handler(params, apiService)
    );

  // 在 user 模式下，预先检查 token 是否有效，无效则触发授权流程
  if (config.feishu.authType === 'user') {
    assertExplicitUserKey(
      config.feishu.authType,
      config.feishu.requireUserKey,
      isUserKeyProvided,
      'stdio'
    );
    const clientKey = AuthUtils.generateClientKey(userKey);
    const status = TokenCacheManager.getInstance().checkUserTokenStatus(clientKey);
    if (!status.isValid && !status.canRefresh) {
      await handleAuthRequired(userKey);
    }
  }

  return await invoke();
}
