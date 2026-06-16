import { AuthService } from '../../../services/feishuAuthService.js';
import { FeishuBaseApiService } from '../../../services/feishu/FeishuBaseApiService.js';

/**
 * 飞书多维表格服务
 * 负责 Bitable 的表格、记录、字段等操作
 */
export class FeishuBitableService extends FeishuBaseApiService {
  constructor(authService: AuthService) {
    super(authService);
  }

  /**
   * 创建多维表
   * @param name 多维表名称
   * @param folderToken 目标文件夹 token（可选）
   */
  public async createApp(name: string, folderToken?: string): Promise<any> {
    try {
      const body: any = { name };
      if (folderToken) body.folder_token = folderToken;
      return this.post('/bitable/v1/apps', body);
    } catch (error) {
      this.handleApiError(error, '创建多维表失败');
    }
  }

  /**
   * 在多维表下创建表格
   * @param appToken 多维表 app token
   * @param name 表格名称
   */
  public async createTable(appToken: string, name: string): Promise<any> {
    try {
      return this.post(`/bitable/v1/apps/${appToken}/tables`, { table: { name } });
    } catch (error) {
      this.handleApiError(error, '创建多维表表格失败');
    }
  }

  /**
   * 在表格下创建字段
   * @param appToken 多维表 app token
   * @param tableId 表格 ID
   * @param fieldName 字段名称
   * @param fieldType 字段类型
   * @param property 字段属性（可选）
   */
  public async createField(
    appToken: string,
    tableId: string,
    fieldName: string,
    fieldType: number,
    property?: Record<string, any>
  ): Promise<any> {
    try {
      const body: any = { field_name: fieldName, type: fieldType };
      if (property) body.property = property;
      return this.post(`/bitable/v1/apps/${appToken}/tables/${tableId}/fields`, body);
    } catch (error) {
      this.handleApiError(error, '创建多维表字段失败');
    }
  }


  /**
   * 列出多维表格下的所有表格
   * @param appToken 多维表格 app token
   * @param pageToken 分页 token
   * @param pageSize 每页数量
   */
  public async listTables(appToken: string, pageToken?: string, pageSize: number = 20): Promise<any> {
    try {
      const params: any = { page_size: pageSize };
      if (pageToken) params.page_token = pageToken;
      return this.get(`/bitable/v1/apps/${appToken}/tables`, params);
    } catch (error) {
      this.handleApiError(error, '列出多维表格失败');
    }
  }

  /**
   * 获取多维表格元数据
   * @param appToken 多维表格 app token
   */
  public async getAppInfo(appToken: string): Promise<any> {
    try {
      return this.get(`/bitable/v1/apps/${appToken}`);
    } catch (error) {
      this.handleApiError(error, '获取多维表格信息失败');
    }
  }

  /**
   * 列出表格字段
   * @param appToken 多维表格 app token
   * @param tableId 表格 ID
   * @param pageToken 分页 token
   * @param pageSize 每页数量
   */
  public async listFields(appToken: string, tableId: string, pageToken?: string, pageSize: number = 100): Promise<any> {
    try {
      const params: any = { page_size: pageSize };
      if (pageToken) params.page_token = pageToken;
      return this.get(`/bitable/v1/apps/${appToken}/tables/${tableId}/fields`, params);
    } catch (error) {
      this.handleApiError(error, '列出表格字段失败');
    }
  }

  /**
   * 列出表格记录
   * @param appToken 多维表格 app token
   * @param tableId 表格 ID
   * @param pageToken 分页 token
   * @param pageSize 每页数量
   */
  public async listRecords(appToken: string, tableId: string, pageToken?: string, pageSize: number = 500): Promise<any> {
    try {
      const params: any = { page_size: Math.min(pageSize, 500) };
      if (pageToken) params.page_token = pageToken;
      return this.get(`/bitable/v1/apps/${appToken}/tables/${tableId}/records`, params);
    } catch (error) {
      this.handleApiError(error, '列出表格记录失败');
    }
  }

  /**
   * 搜索表格记录
   * @param appToken 多维表格 app token
   * @param tableId 表格 ID
   * @param filter 查询条件
   * @param pageToken 分页 token
   * @param pageSize 每页数量
   */
  public async searchRecords(
    appToken: string,
    tableId: string,
    filter?: any,
    pageToken?: string,
    pageSize: number = 500
  ): Promise<any> {
    try {
      const body: any = { page_size: Math.min(pageSize, 500) };
      if (filter) body.filter = filter;
      if (pageToken) body.page_token = pageToken;
      return this.post(`/bitable/v1/apps/${appToken}/tables/${tableId}/records/search`, body);
    } catch (error) {
      this.handleApiError(error, '搜索表格记录失败');
    }
  }

  /**
   * 创建单条记录
   * @param appToken 多维表格 app token
   * @param tableId 表格 ID
   * @param fields 字段数据
   */
  public async createRecord(appToken: string, tableId: string, fields: Record<string, any>): Promise<any> {
    try {
      return this.post(`/bitable/v1/apps/${appToken}/tables/${tableId}/records`, { fields });
    } catch (error) {
      this.handleApiError(error, '创建表格记录失败');
    }
  }

  /**
   * 批量创建记录
   * @param appToken 多维表格 app token
   * @param tableId 表格 ID
   * @param records 记录数组
   */
  public async batchCreateRecords(appToken: string, tableId: string, records: Array<{ fields: Record<string, any> }>): Promise<any> {
    try {
      return this.post(`/bitable/v1/apps/${appToken}/tables/${tableId}/records/batch_create`, { records });
    } catch (error) {
      this.handleApiError(error, '批量创建表格记录失败');
    }
  }

  /**
   * 更新单条记录
   * @param appToken 多维表格 app token
   * @param tableId 表格 ID
   * @param recordId 记录 ID
   * @param fields 字段数据
   */
  public async updateRecord(appToken: string, tableId: string, recordId: string, fields: Record<string, any>): Promise<any> {
    try {
      return this.put(`/bitable/v1/apps/${appToken}/tables/${tableId}/records/${recordId}`, { fields });
    } catch (error) {
      this.handleApiError(error, '更新表格记录失败');
    }
  }

  /**
   * 批量更新记录
   * @param appToken 多维表格 app token
   * @param tableId 表格 ID
   * @param records 记录数组（含 record_id）
   */
  public async batchUpdateRecords(
    appToken: string,
    tableId: string,
    records: Array<{ record_id: string; fields: Record<string, any> }>
  ): Promise<any> {
    try {
      return this.post(`/bitable/v1/apps/${appToken}/tables/${tableId}/records/batch_update`, { records });
    } catch (error) {
      this.handleApiError(error, '批量更新表格记录失败');
    }
  }

  /**
   * 删除单条记录
   * @param appToken 多维表格 app token
   * @param tableId 表格 ID
   * @param recordId 记录 ID
   */
  public async deleteRecord(appToken: string, tableId: string, recordId: string): Promise<any> {
    try {
      return this.delete(`/bitable/v1/apps/${appToken}/tables/${tableId}/records/${recordId}`);
    } catch (error) {
      this.handleApiError(error, '删除表格记录失败');
    }
  }

  /**
   * 批量删除记录
   * @param appToken 多维表格 app token
   * @param tableId 表格 ID
   * @param recordIds 记录 ID 数组
   */
  public async batchDeleteRecords(appToken: string, tableId: string, recordIds: string[]): Promise<any> {
    try {
      return this.post(`/bitable/v1/apps/${appToken}/tables/${tableId}/records/batch_delete`, { records: recordIds });
    } catch (error) {
      this.handleApiError(error, '批量删除表格记录失败');
    }
  }
}
