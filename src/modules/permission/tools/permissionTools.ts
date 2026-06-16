import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { formatErrorMessage } from '../../../utils/error.js';
import { FeishuApiService } from '../../../services/feishuApiService.js';
import { Logger } from '../../../utils/logger.js';
import { errorResponse } from '../../document/tools/toolHelpers.js';
import { addDriveMember } from '../toolApi/permissionToolApi.js';
import {
  PermissionTokenSchema,
  PermissionTypeSchema,
  PermissionMemberTypeSchema,
  PermissionMemberIdSchema,
  PermissionRoleSchema,
  PermissionNotifySchema,
  PermissionShareMsgSchema,
} from '../../../types/permissionSchema.js';

/**
 * 注册飞书权限相关的 MCP 工具
 */
export function registerPermissionTools(server: McpServer, feishuService: FeishuApiService): void {
  server.tool(
    'add_feishu_drive_member',
    'Adds a collaborator to a Feishu cloud document (Bitable, Sheet, Docx, etc.) via the Drive permission API. Requires the application to have drive:permission:member scope.',
    {
      token: PermissionTokenSchema,
      type: PermissionTypeSchema,
      memberType: PermissionMemberTypeSchema,
      memberId: PermissionMemberIdSchema,
      perm: PermissionRoleSchema,
      notify: PermissionNotifySchema,
      shareMsg: PermissionShareMsgSchema,
    },
    async ({ token, type, memberType, memberId, perm, notify, shareMsg }) => {
      try {
        const result = await addDriveMember(
          { token, type, memberType, memberId, perm, notify, shareMsg },
          feishuService
        );
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('添加云文档协作者失败:', error);
        return errorResponse(`添加云文档协作者失败: ${formatErrorMessage(error)}`);
      }
    }
  );
}
