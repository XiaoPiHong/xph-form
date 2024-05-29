import { TTableProps, TColumnType, TDataSourceItem } from "../types";
import { ColumnsType } from "antd/es/table";
import { buildUUID } from "@xph-form/common";

export default function useTableColumns(props: TTableProps): {
  columns: ColumnsType<TDataSourceItem>;
} {
  const { columns } = props.table!;

  const newColumns = columns!.map((item) => {
    /** 去除掉component映射属性 */
    const { component, ...reset } = item;
    /** react需要key，没传的话给他生成一个key */
    reset.key = item.key || buildUUID();
    return reset;
  }) as ColumnsType<TDataSourceItem>;
  return {
    columns: newColumns,
  };
}
