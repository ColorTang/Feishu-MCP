import { AuthService } from '../../../services/feishuAuthService.js';
import { FeishuBaseApiService } from '../../../services/feishu/FeishuBaseApiService.js';

/**
 * 飞书电子表格服务
 * 负责 Spreadsheet 工作表、单元格读写等操作
 */
export class FeishuSheetService extends FeishuBaseApiService {
  constructor(authService: AuthService) {
    super(authService);
  }

  /**
   * 创建新的电子表格文件
   * @param title 电子表格标题
   * @param folderToken 目标文件夹 token（可选）
   */
  public async createSpreadsheet(title: string, folderToken?: string): Promise<any> {
    try {
      const body: any = { title };
      if (folderToken) body.folder_token = folderToken;
      return this.post('/sheets/v3/spreadsheets', body);
    } catch (error) {
      this.handleApiError(error, '创建电子表格失败');
    }
  }

  /**
   * 获取电子表格元数据
   * @param spreadsheetToken 电子表格 token
   */
  public async getSpreadsheetInfo(spreadsheetToken: string): Promise<any> {
    try {
      return this.get(`/sheets/v3/spreadsheets/${spreadsheetToken}`);
    } catch (error) {
      this.handleApiError(error, '获取电子表格信息失败');
    }
  }

  /**
   * 列出电子表格下所有工作表
   * @param spreadsheetToken 电子表格 token
   */
  public async listSheets(spreadsheetToken: string): Promise<any> {
    try {
      return this.get(`/sheets/v3/spreadsheets/${spreadsheetToken}/sheets/query`);
    } catch (error) {
      this.handleApiError(error, '列出工作表失败');
    }
  }

  /**
   * 在电子表格下创建工作表
   * @param spreadsheetToken 电子表格 token
   * @param title 工作表标题
   */
  public async createSheet(spreadsheetToken: string, title: string): Promise<any> {
    try {
      return this.post(`/sheets/v2/spreadsheets/${spreadsheetToken}/sheets_batch_update`, {
        requests: [{ addSheet: { properties: { title } } }],
      });
    } catch (error) {
      this.handleApiError(error, '创建工作表失败');
    }
  }

  /**
   * 删除工作表
   * @param spreadsheetToken 电子表格 token
   * @param sheetId 工作表 ID
   */
  public async deleteSheet(spreadsheetToken: string, sheetId: string): Promise<any> {
    try {
      return this.post(`/sheets/v2/spreadsheets/${spreadsheetToken}/sheets_batch_update`, {
        requests: [{ deleteSheet: { sheetId } }],
      });
    } catch (error) {
      this.handleApiError(error, '删除工作表失败');
    }
  }

  /**
   * 更新工作表属性（如标题）
   * @param spreadsheetToken 电子表格 token
   * @param sheetId 工作表 ID
   * @param title 新标题
   */
  public async updateSheet(spreadsheetToken: string, sheetId: string, title: string): Promise<any> {
    try {
      return this.post(`/sheets/v2/spreadsheets/${spreadsheetToken}/sheets_batch_update`, {
        requests: [{ updateSheet: { properties: { sheetId, title } } }],
      });
    } catch (error) {
      this.handleApiError(error, '更新工作表失败');
    }
  }

  /**
   * 读取单元格范围
   * @param spreadsheetToken 电子表格 token
   * @param range 单元格范围，如 "A1:C10" 或 "{sheetId}!A1:C10"
   */
  public async getValues(spreadsheetToken: string, range: string): Promise<any> {
    try {
      const encodedRange = encodeURIComponent(range);
      return this.get(`/sheets/v2/spreadsheets/${spreadsheetToken}/values/${encodedRange}`);
    } catch (error) {
      this.handleApiError(error, '读取单元格失败');
    }
  }

  /**
   * 批量读取多个单元格范围
   * @param spreadsheetToken 电子表格 token
   * @param ranges 单元格范围数组
   */
  public async batchGetValues(spreadsheetToken: string, ranges: string[]): Promise<any> {
    try {
      const params = { ranges: ranges.join(',') };
      return this.get(`/sheets/v2/spreadsheets/${spreadsheetToken}/values_batch_get`, params);
    } catch (error) {
      this.handleApiError(error, '批量读取单元格失败');
    }
  }

  /**
   * 写入单元格
   * @param spreadsheetToken 电子表格 token
   * @param range 单元格范围
   * @param values 二维数组值
   * @param valueInputOption 数据解析方式
   */
  public async setValues(
    spreadsheetToken: string,
    range: string,
    values: any[][],
    valueInputOption: 'RAW' | 'USER_ENTERED' = 'USER_ENTERED'
  ): Promise<any> {
    try {
      const body = {
        valueRange: {
          range,
          values,
        },
        valueInputOption,
      };
      return this.put(`/sheets/v2/spreadsheets/${spreadsheetToken}/values`, body);
    } catch (error) {
      this.handleApiError(error, '写入单元格失败');
    }
  }

  /**
   * 追加行到工作表
   * @param spreadsheetToken 电子表格 token
   * @param range 单元格范围，如 "Sheet1!A1:E"
   * @param values 二维数组值
   * @param valueInputOption 数据解析方式
   */
  public async appendValues(
    spreadsheetToken: string,
    range: string,
    values: any[][],
    valueInputOption: 'RAW' | 'USER_ENTERED' = 'USER_ENTERED'
  ): Promise<any> {
    try {
      const body = {
        valueRange: {
          range,
          values,
        },
        valueInputOption,
      };
      return this.post(`/sheets/v2/spreadsheets/${spreadsheetToken}/values_append`, body);
    } catch (error) {
      this.handleApiError(error, '追加行失败');
    }
  }
}
