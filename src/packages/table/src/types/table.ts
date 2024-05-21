import { TableProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IXphFormProps } from "../../../form";

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
  searchForm?: IXphFormProps;
  /** 新增 / 修改表单配置项 */
  crudForm?: IXphFormProps;
};
