import { TableProps, PaginationProps } from "antd";
import { TableRowSelection, RowSelectionType } from "antd/lib/table/interface";
import { IXphActionsProps } from "@xph-form/common";
import { TDataSourceItem } from "./table";
import { TColumnProps } from "./column";

export interface IFunctionToolbarParams<RecordType = TDataSourceItem> {
  loading: boolean;
  selection: RecordType[];
}

/** 扩展antd table的属性 */
export type TApiTableProps<RecordType = TDataSourceItem> = {
  /** 列配置项 */
  columns?: TColumnProps<RecordType>[];
  /** 首次是否自动请求 */
  autoRequest?: boolean;
  /** 获取datasource的api */
  api?: (params: any) => Promise<any>;
  /** 格式化返回的datasource */
  formatDataSource?: (data: any) => any[];
  /** 是否开启前端自动分页（当api不支持分页时可用） */
  autoPagination?: boolean;
  /** 单选 / 多选 */
  rowSelection?: RowSelectionType | TableRowSelection<RecordType>;
  /** 分页配置（因为分页器是独立出来的，使用table的分页器布局需要修改样式） */
  pagination?: false | PaginationProps;
  /** 表格撑满父容器（virtual为true时，默认fullHeight为true） */
  fullHeight?: boolean;
  /** 顶部操作栏配置，函数时可以传递参数，参数是什么由调用方决定 */
  toolbar?:
    | IXphActionsProps
    | ((e: IFunctionToolbarParams<RecordType>) => IXphActionsProps);
  /** 排序、筛选变化时触发 */
  onChange?: (filters: any, sorter: any, extra: any) => void;
} & Omit<
  TableProps<RecordType>,
  /** 内部控制的属性/重写的属性 */
  "rowSelection" | "columns" | "loading" | "dataSource" | "pagination"
>;
