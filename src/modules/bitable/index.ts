import type { FeatureModule } from '../FeatureModule.js';
import { MODULE_SCOPES } from '../../services/constants/feishuScopes.js';
import { registerBitableTools } from './tools/bitableTools.js';

export const bitableModule: FeatureModule = {
  id: 'bitable',
  name: '飞书多维表格',
  description: '飞书多维表格（Bitable）的表格、字段、记录查询与 CRUD 操作',
  requiredScopes: MODULE_SCOPES.bitable,
  registerTools(server, apiService) {
    registerBitableTools(server, apiService);
  },
};
