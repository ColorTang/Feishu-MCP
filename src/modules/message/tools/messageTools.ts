import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { formatErrorMessage } from '../../../utils/error.js';
import { FeishuApiService } from '../../../services/feishuApiService.js';
import { Logger } from '../../../utils/logger.js';
import { errorResponse } from '../../document/tools/toolHelpers.js';
import { sendMessage, replyMessage } from '../toolApi/messageToolApi.js';
import {
  MessageReceiveIdTypeSchema,
  MessageReceiveIdSchema,
  MessageTypeSchema,
  MessageContentSchema,
  MessageUuidSchema,
  MessageUpdateMultiSchema,
} from '../../../types/messageSchema.js';

// 回复消息需要的消息 ID schema
const MessageIdSchema = z.string().min(1).describe('Feishu message ID to reply to.');

/**
 * 注册飞书消息相关的 MCP 工具
 */
export function registerMessageTools(server: McpServer, feishuService: FeishuApiService): void {
  server.tool(
    'send_feishu_message',
    'Sends a Feishu IM message to a user or chat. Requires the application to have im:chat or im:message:send_as_bot scope.',
    {
      receiveIdType: MessageReceiveIdTypeSchema,
      receiveId: MessageReceiveIdSchema,
      msgType: MessageTypeSchema,
      content: MessageContentSchema,
      uuid: MessageUuidSchema,
      updateMulti: MessageUpdateMultiSchema,
    },
    async ({ receiveIdType, receiveId, msgType, content, uuid, updateMulti }) => {
      try {
        const result = await sendMessage(
          { receiveIdType, receiveId, msgType, content, uuid, updateMulti },
          feishuService
        );
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('发送飞书消息失败:', error);
        return errorResponse(`发送飞书消息失败: ${formatErrorMessage(error)}`);
      }
    }
  );

  server.tool(
    'reply_feishu_message',
    'Replies to an existing Feishu IM message.',
    {
      messageId: MessageIdSchema,
      msgType: MessageTypeSchema,
      content: MessageContentSchema,
    },
    async ({ messageId, msgType, content }) => {
      try {
        const result = await replyMessage({ messageId, msgType, content }, feishuService);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        Logger.error('回复飞书消息失败:', error);
        return errorResponse(`回复飞书消息失败: ${formatErrorMessage(error)}`);
      }
    }
  );
}
