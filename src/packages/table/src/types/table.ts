import { TableProps } from "antd";
import type { ColumnsType, TableRef } from "antd/es/table";
import { TSearchFormProps } from "./searchForm";
import { TCrudFormProps } from "./crudForm";

/** 行数据 */
export type TDataSourceItem = Record<PropertyKey, any>;

/** 扩展一下antd column的属性 */
export type TColumnsType<RecordType = TDataSourceItem> =
  ColumnsType<RecordType> & {
    /** 单元格映射的组件 */
    component?: string;
  };

/** 扩展antd table的属性 */
export type TApiTableProps<RecordType = TDataSourceItem> =
  TableProps<RecordType> & {
    /** 列配置项 */
    columns?: TColumnsType<RecordType>;
    /** 首次是否自动请求 */
    autoRequest?: boolean;
    /** 获取datasource的api */
    api?: (params: any) => Promise<any>;
    /** 格式化返回的datasource */
    formatDataSource?: (data: any) => any[];
  };

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
