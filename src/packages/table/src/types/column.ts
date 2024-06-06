import { ColumnType, ColumnGroupType } from "antd/es/table";
import { TDataSourceItem } from "./table";

/** 扩展一下antd column的属性 */
type TBaseColumnType = {
  /** 单元格映射的组件 */
  component?: string;
};

export type TColumnType<RecordType = TDataSourceItem> =
  | (ColumnType<RecordType> & TBaseColumnType)
  | (ColumnGroupType<RecordType> & TBaseColumnType);
