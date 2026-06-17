import { FeishuBaseApiService } from '../../../services/feishu/FeishuBaseApiService.js';
import { AuthService } from '../../../services/feishuAuthService.js';

/**
 * 飞书云文档权限服务
 * 负责文档、多维表、电子表格等的协作者/成员权限管理
 */
export class FeishuPermissionService extends FeishuBaseApiService {
  constructor(authService: AuthService) {
    super(authService);
  }

  /**
   * 通过 Drive 权限 API 添加云文档成员
   * @param token 云文档 token
   * @param type 云文档类型
   * @param memberType 成员类型
   * @param memberId 成员 ID
   * @param perm 权限
   * @param notify 是否通知
   * @param shareMsg 是否发送分享消息
   */
  public async addDriveMember(
    token: string,
    type: string | undefined,
    memberType: string,
    memberId: string,
    perm: string = 'edit',
    notify: boolean = false,
    shareMsg: boolean = false
  ): Promise<any> {
    try {
      const url = type
        ? `/drive/v1/permissions/${token}/members?type=${type}`
        : `/drive/v1/permissions/${token}/members`;
      // 飞书 Drive 权限 API 要求 member_type 为 openid，但用户习惯传 open_id
      const normalizedMemberType = memberType === 'open_id' ? 'openid' : memberType;
      const body: any = {
        member_type: normalizedMemberType,
        member_id: memberId,
        perm,
      };
      if (notify !== undefined) body.notify = notify;
      if (shareMsg !== undefined) body.share_msg = shareMsg;
      return this.post(url, body);
    } catch (error) {
      this.handleApiError(error, '添加云文档协作者失败');
    }
  }

  /**
   * 通过多维表角色 API 添加成员到指定角色
   * @param appToken 多维表 app token
   * @param roleId 角色 ID
   * @param memberType 成员类型
   * @param memberId 成员 ID
   */
  public async addBitableRoleMember(
    appToken: string,
    roleId: string,
    memberType: string,
    memberId: string
  ): Promise<any> {
    try {
      return this.post(`/bitable/v1/apps/${appToken}/roles/${roleId}/members`, {
        member_type: memberType,
        member_id: memberId,
      });
    } catch (error) {
      this.handleApiError(error, '添加多维表角色成员失败');
    }
  }

  /**
   * 列出多维表角色
   * @param appToken 多维表 app token
   */
  public async listBitableRoles(appToken: string): Promise<any> {
    try {
      return this.get(`/bitable/v1/apps/${appToken}/roles`);
    } catch (error) {
      this.handleApiError(error, '列出多维表角色失败');
    }
  }
}
