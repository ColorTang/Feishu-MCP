/**
 * 飞书各功能模块所需权限 Scope 定义
 * 按模块拆分，通过 getRequiredScopes 动态计算最小权限集
 */
export const MODULE_SCOPES: Record<string, { tenant: string[]; userOnly: string[] }> = {
  document: {
    tenant: [
      "docx:document.block:convert",
      "base:app:read",
      "bitable:app",
      "bitable:app:readonly",
      "board:whiteboard:node:create",
      "board:whiteboard:node:read",
      "contact:user.employee_id:readonly",
      "docs:document.content:read",
      "docx:document",
      "docx:document:create",
      "docx:document:readonly",
      "drive:drive",
      "drive:drive:readonly",
      "drive:file",
      "drive:file:upload",
      "space:document:retrieve",
      "space:folder:create",
      "wiki:space:read",
      "wiki:space:retrieve",
      "wiki:wiki",
      "wiki:wiki:readonly",
    ],
    userOnly: [
      "search:docs:read",
      "offline_access",
    ],
  },
  task: {
    tenant: [
      "task:task:write",
    ],
    userOnly: [],
  },
  calendar: {
    tenant: [],
    userOnly: [],
  },
  member: {
    tenant: [
      "contact:contact.base:readonly",
      "contact:user.base:readonly",
    ],
    userOnly: [
      "contact:user:search",
      "contact:contact.base:readonly",
      "contact:user.employee_id:readonly",
    ],
  },
  bitable: {
    tenant: [
      "bitable:app",
      "bitable:app:readonly",
      "base:app:read",
      "base:record:retrieve",
      "base:record:create",
      "base:record:update",
      "base:record:delete",
    ],
    userOnly: [
      "bitable:app",
      "bitable:app:readonly",
      "base:app:read",
      "base:record:retrieve",
      "base:record:create",
      "base:record:update",
      "base:record:delete",
    ],
  },
  sheet: {
    tenant: [
      "sheets:spreadsheet",
      "sheets:spreadsheet:readonly",
    ],
    userOnly: [],
  },
  permission: {
    tenant: [
      "drive:permission",
      "drive:permission:member",
      "drive:permission:member:readonly",
      "base:collaborator:create",
      "base:collaborator:delete",
      "base:role:create",
      "base:role:delete",
      "base:role:update",
      "base:role:readonly",
    ],
    userOnly: [
      "drive:permission",
      "drive:permission:member",
    ],
  },
  message: {
    tenant: [
      "im:chat",
      "im:chat:readonly",
      "im:message",
      "im:message:send_as_bot",
      "im:message.group_msg",
    ],
    userOnly: [
      "im:chat",
      "im:message",
    ],
  },
};

/**
 * 根据已启用模块和认证类型，计算所需的最小 Scope 集合
 * @param enabledModules 已启用的模块 ID 列表（含 'all' 则返回全量）
 * @param authType 认证类型
 */
export function getRequiredScopes(
  enabledModules: string[],
  authType: 'tenant' | 'user'
): string[] {
  const moduleIds = enabledModules.includes('all')
    ? Object.keys(MODULE_SCOPES)
    : enabledModules;

  const scopes = new Set<string>();
  for (const moduleId of moduleIds) {
    const moduleScopes = MODULE_SCOPES[moduleId];
    if (!moduleScopes) continue;
    moduleScopes.tenant.forEach(s => scopes.add(s));
    if (authType === 'user') {
      moduleScopes.userOnly.forEach(s => scopes.add(s));
    }
  }
  return Array.from(scopes);
}