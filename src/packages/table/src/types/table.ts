import { TableProps } from "antd";
import type { ColumnType, ColumnGroupType, TableRef } from "antd/es/table";
import { TSearchFormProps } from "./searchForm";
import { TCrudFormProps } from "./crudForm";

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
export type TApiTableProps<RecordType = TDataSourceItem> = Omit<
  {
    /** 列配置项 */
    columns?: TColumnType<RecordType>[];
    /** 首次是否自动请求 */
    autoRequest?: boolean;
    /** 获取datasource的api */
    api?: (params: any) => Promise<any>;
    /** 格式化返回的datasource */
    formatDataSource?: (data: any) => any[];
    /** 是否接口支持分页 */
    apiPagination?: boolean;
  } & TableProps<RecordType>,
  /** loading和dataSource设置为内部控制 */
  "loading" | "dataSource"
>;

/** 整个组件的配置 */
export type TTableProps<RecordType = TDataSourceItem> = {
  /** 表格配置 */
  table?: TApiTableProps<RecordType>;
  /** 搜索表单配置项 */
  searchForm?: TSearchFormProps;
  /** 新增 / 修改表单配置项 */
  crudForm?: TCrudFormProps;
};

export type TRefTable = <RecordType extends TDataSourceItem = TDataSourceItem>(
  props: React.PropsWithChildren<TTableProps<RecordType>> &
    React.RefAttributes<TableRef | undefined>
) => React.ReactElement;
