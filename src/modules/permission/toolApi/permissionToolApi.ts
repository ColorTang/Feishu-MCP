import { FeishuApiService } from '../../../services/feishuApiService.js';
import { Logger } from '../../../utils/logger.js';

export interface AddDriveMemberParams {
  token: string;
  type?: string;
  memberType: string;
  memberId: string;
  perm?: string;
  notify?: boolean;
  shareMsg?: boolean;
}

export async function addDriveMember(params: AddDriveMemberParams, api: FeishuApiService): Promise<any> {
  const { token, type, memberType, memberId, perm, notify, shareMsg } = params;
  Logger.info(`addDriveMember invoked: token=${token}, type=${type}, memberType=${memberType}`);
  return api.addDriveMember(token, type, memberType, memberId, perm, notify, shareMsg);
}

export interface AddBitableRoleMemberParams {
  appToken: string;
  roleId: string;
  memberType: string;
  memberId: string;
}

export async function addBitableRoleMember(
  params: AddBitableRoleMemberParams,
  api: FeishuApiService
): Promise<any> {
  const { appToken, roleId, memberType, memberId } = params;
  Logger.info(`addBitableRoleMember invoked: appToken=${appToken}, roleId=${roleId}`);
  return api.addBitableRoleMember(appToken, roleId, memberType, memberId);
}
