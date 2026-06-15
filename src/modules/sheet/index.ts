import type { FeatureModule } from '../FeatureModule.js';
import { MODULE_SCOPES } from '../../services/constants/feishuScopes.js';
import { registerSheetTools } from './tools/sheetTools.js';

export const sheetModule: FeatureModule = {
  id: 'sheet',
  name: '飞书电子表格',
  description: '飞书电子表格（Sheet/Spreadsheet）的工作表、单元格读写操作',
  requiredScopes: MODULE_SCOPES.sheet,
  registerTools(server, apiService) {
    registerSheetTools(server, apiService);
  },
};
