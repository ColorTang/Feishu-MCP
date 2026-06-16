import { z } from 'zod';

// 被授权对象类型
export const PermissionMemberTypeSchema = z.enum(['openid', 'unionid', 'userid', 'email', 'groupid']).describe(
  'Type of the member to grant permission to. Common values: openid, unionid, userid, email, groupid.'
);

// 被授权对象 ID
export const PermissionMemberIdSchema = z.string().min(1).describe(
  'ID of the member to grant permission to. Format depends on member_type.'
);

// 云文档 token
export const PermissionTokenSchema = z.string().min(1).describe(
  'Token of the cloud document to grant permission on. For Bitable, use app_token; for Sheet, use spreadsheet_token; for Docx, use document_id/obj_token.'
);

// 云文档类型
export const PermissionTypeSchema = z.enum(['bitable', 'docx', 'sheet', 'file', 'wiki']).optional().describe(
  'Type of the cloud document. Used when calling the Drive permission API. If omitted, the API will infer from context where possible.'
);

// 权限类型
export const PermissionRoleSchema = z.enum(['view', 'edit', 'full_access']).optional().default('edit').describe(
  'Permission level to grant: view (read-only), edit (read-write), full_access.'
);

// 是否需要通知
export const PermissionNotifySchema = z.boolean().optional().default(false).describe(
  'Whether to notify the member via Feishu IM.'
);

// 是否需要分享通知
export const PermissionShareMsgSchema = z.boolean().optional().default(false).describe(
  'Whether to send a share message to the member.'
);
