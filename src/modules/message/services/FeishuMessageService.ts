import { FeishuBaseApiService } from '../../../services/feishu/FeishuBaseApiService.js';
import { AuthService } from '../../../services/feishuAuthService.js';

/**
 * 飞书消息服务
 * 负责发送 IM 消息到用户或群聊
 */
export class FeishuMessageService extends FeishuBaseApiService {
  constructor(authService: AuthService) {
    super(authService);
  }

  /**
   * 发送飞书消息
   * @param receiveIdType 接收者 ID 类型
   * @param receiveId 接收者 ID
   * @param msgType 消息类型
   * @param content 消息内容 JSON 对象
   * @param uuid 可选消息 UUID
   * @param updateMulti 是否更新已有卡片消息
   */
  public async sendMessage(
    receiveIdType: string,
    receiveId: string,
    msgType: string,
    content: Record<string, any>,
    uuid?: string,
    updateMulti?: boolean
  ): Promise<any> {
    try {
      const url = `/im/v1/messages?receive_id_type=${receiveIdType}`;
      const body: any = {
        receive_id: receiveId,
        msg_type: msgType,
        content: JSON.stringify(content),
      };
      if (uuid) body.uuid = uuid;
      if (updateMulti !== undefined) body.update_multi = updateMulti;
      return this.post(url, body);
    } catch (error) {
      this.handleApiError(error, '发送飞书消息失败');
    }
  }

  /**
   * 回复一条消息
   * @param messageId 要回复的消息 ID
   * @param msgType 消息类型
   * @param content 消息内容 JSON 对象
   */
  public async replyMessage(
    messageId: string,
    msgType: string,
    content: Record<string, any>
  ): Promise<any> {
    try {
      const url = `/im/v1/messages/${messageId}/reply`;
      const body: any = {
        msg_type: msgType,
        content: JSON.stringify(content),
      };
      return this.post(url, body);
    } catch (error) {
      this.handleApiError(error, '回复飞书消息失败');
    }
  }
}
