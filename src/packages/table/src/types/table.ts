import { TableProps } from "antd";
import type { ColumnsType, TableRef } from "antd/es/table";
import { TTableSearchFormProps } from "./searchForm";
import { TCrudFormProps } from "./crudForm";

/** 扩展一下antd column的属性 */
export type TColumnsType<RecordType = Record<PropertyKey, any>> =
  ColumnsType<RecordType> & {
    /** 单元格映射的组件 */
    component?: string;
  };

/**
 * 扩展一下antd table的属性
 */
export type TTableProps<RecordType = Record<PropertyKey, any>> =
  TableProps<RecordType> & {
    /** 列配置项 */
    columns?: TColumnsType<RecordType>;
    /** 搜索表单配置项 */
    searchForm?: TTableSearchFormProps;
    /** 新增 / 修改表单配置项 */
    crudForm?: TCrudFormProps;
    /** 首次是否自动请求 */
    autoRequest?: boolean;
  };

export type TRefTable = <
  RecordType extends Record<PropertyKey, any> = Record<PropertyKey, any>
>(
  props: React.PropsWithChildren<TTableProps<RecordType>> &
    React.RefAttributes<TableRef>
) => React.ReactElement;
