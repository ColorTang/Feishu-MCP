import { FeishuApiService } from '../../../services/feishuApiService.js';
import { Logger } from '../../../utils/logger.js';

export interface SendMessageParams {
  receiveIdType: string;
  receiveId: string;
  msgType: string;
  content: Record<string, any>;
  uuid?: string;
  updateMulti?: boolean;
}

export async function sendMessage(params: SendMessageParams, api: FeishuApiService): Promise<any> {
  const { receiveIdType, receiveId, msgType, content, uuid, updateMulti } = params;
  Logger.info(`sendMessage invoked: receiveIdType=${receiveIdType}, msgType=${msgType}`);
  return api.sendFeishuMessage(receiveIdType, receiveId, msgType, content, uuid, updateMulti);
}

export interface ReplyMessageParams {
  messageId: string;
  msgType: string;
  content: Record<string, any>;
}

export async function replyMessage(params: ReplyMessageParams, api: FeishuApiService): Promise<any> {
  const { messageId, msgType, content } = params;
  Logger.info(`replyMessage invoked: messageId=${messageId}, msgType=${msgType}`);
  return api.replyFeishuMessage(messageId, msgType, content);
}
