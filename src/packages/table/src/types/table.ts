import { TableProps, PaginationProps } from "antd";
import type { ColumnType, ColumnGroupType, TableRef } from "antd/es/table";
import { TSearchFormProps } from "./searchForm";
import { TCrudFormProps } from "./crudForm";
import { TableRowSelection, RowSelectionType } from "antd/lib/table/interface";

/** 行数据 */
export type TDataSourceItem = Record<PropertyKey, any>;

/** 扩展一下antd column的属性 */
type TBaseColumnType = {
  /** 单元格映射的组件 */
  component?: string;
};

export type TColumnType<RecordType = TDataSourceItem> =
  | (ColumnType<RecordType> & TBaseColumnType)
  | (ColumnGroupType<RecordType> & TBaseColumnType);

/** 扩展antd table的属性 */
export type TApiTableProps<RecordType = TDataSourceItem> = {
  /** 列配置项 */
  columns?: TColumnType<RecordType>[];
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
  /** 排序、筛选变化时触发 */
  onChange?: (filters: any, sorter: any, extra: any) => void;
} & Omit<
  TableProps<RecordType>,
  /** 内部控制的属性/重写的属性 */
  "rowSelection" | "columns" | "loading" | "dataSource" | "pagination"
>;

/** 整个组件的配置 */
export type TTableProps<RecordType = TDataSourceItem> = {
  /** 表格配置 */
  table?: TApiTableProps<RecordType>;
  /** 搜索表单配置项 */
  searchForm?: TSearchFormProps;
  /** 新增 / 修改表单配置项 */
  crudForm?: TCrudFormProps;

  /** 分页改变事件 */
  onPaginationChange?: (page: number, pageSize: number) => void;

  /** 列表选中事件 */
  onRowSelectionChange?: (
    selectedRowKeys: React.Key[],
    selectedRows: RecordType[]
  ) => void;
};

export type TTableActionType = {} & TableRef;

export type TRefTable = <RecordType extends TDataSourceItem = TDataSourceItem>(
  props: React.PropsWithChildren<TTableProps<RecordType>> &
    React.RefAttributes<TTableActionType | undefined>
) => React.ReactElement;
