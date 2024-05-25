import { TTableProps, TColumnType, TDataSourceItem } from "../types";
import { ColumnsType } from "antd/es/table";

export default function useTableColumns(props: TTableProps): {
  columns: ColumnsType<TDataSourceItem>;
} {
  const { columns } = props.table!;

  const newColumns = columns!.map((item) => {
    /** 去除掉component映射属性 */
    const { component, ...reset } = item;
    return reset;
  }) as ColumnsType<TDataSourceItem>;
  return {
    columns: newColumns,
  };
}
