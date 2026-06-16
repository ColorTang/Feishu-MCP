import type { FeatureModule } from '../FeatureModule.js';
import { MODULE_SCOPES } from '../../services/constants/feishuScopes.js';
import { registerMessageTools } from './tools/messageTools.js';

export const messageModule: FeatureModule = {
  id: 'message',
  name: '飞书消息',
  description: '飞书 IM 消息发送与回复',
  requiredScopes: MODULE_SCOPES.message,
  registerTools(server, apiService) {
    registerMessageTools(server, apiService);
  },
};
