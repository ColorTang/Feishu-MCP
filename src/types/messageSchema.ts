import { z } from 'zod';

// 消息接收者 ID 类型
export const MessageReceiveIdTypeSchema = z.enum(['open_id', 'union_id', 'user_id', 'email', 'chat_id']).describe(
  'Type of the message recipient ID. Use open_id for single user, chat_id for group.'
);

// 消息接收者 ID
export const MessageReceiveIdSchema = z.string().min(1).describe(
  'Recipient ID. For open_id, use the user\'s open_id. For chat_id, use the group chat ID.'
);

// 消息类型
export const MessageTypeSchema = z.enum(['text', 'post', 'image', 'file', 'interactive']).optional().default('text').describe(
  'Message type: text, post, image, file, interactive (card). Default is text.'
);

// 消息内容（JSON 对象，根据 msg_type 变化）
export const MessageContentSchema = z.record(z.any()).describe(
  'Message content as a JSON object. For text: { text: "hello" }. For interactive card: { config: {...}, header: {...}, elements: [...] }. See Feishu IM API docs for each msg_type.'
);

// 是否复用卡片消息更新
export const MessageUpdateMultiSchema = z.boolean().optional().describe(
  'Optional. Whether to update an existing card message.'
);

//  uuid
export const MessageUuidSchema = z.string().optional().describe(
  'Optional message UUID for idempotency.'
);
