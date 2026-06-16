import type { FeatureModule } from '../FeatureModule.js';
import { MODULE_SCOPES } from '../../services/constants/feishuScopes.js';
import { registerPermissionTools } from './tools/permissionTools.js';

export const permissionModule: FeatureModule = {
  id: 'permission',
  name: '飞书权限管理',
  description: '飞书云文档协作者、权限管理相关操作',
  requiredScopes: MODULE_SCOPES.permission,
  registerTools(server, apiService) {
    registerPermissionTools(server, apiService);
  },
};
