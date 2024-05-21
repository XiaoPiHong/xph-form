import { TableProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TTableSearchFormProps } from "./searchForm";
import { TCrudFormProps } from "./crudForm";

/** 扩展一下antd column的属性 */
export type TColumnsType<RecordType = any> = ColumnsType<RecordType> & {
  /** 单元格映射的组件 */
  component?: string;
};

/**
 * 扩展一下antd table的属性
 */
export type TTableProps<RecordType = any> = TableProps<RecordType> & {
  /** 列配置项 */
  columns?: TColumnsType<RecordType>;
  /** 搜索表单配置项 */
  searchForm?: TTableSearchFormProps;
  /** 新增 / 修改表单配置项 */
  crudForm?: TCrudFormProps;
  /** 首次是否自动请求 */
  autoRequest?: boolean;
};
