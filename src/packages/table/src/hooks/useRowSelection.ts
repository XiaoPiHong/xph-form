import { TTableProps, TDataSourceItem } from "../types";
import { IUseTable } from "./useTable";
import { isString, isObject } from "lodash-es";
import { TableRowSelection } from "antd/es/table/interface";

const useRowSelection = (
  props: TTableProps,
  table: IUseTable
): {
  rowSelection: TableRowSelection<TDataSourceItem> | undefined;
  getNewRowSelection: () => TableRowSelection<TDataSourceItem> | undefined;
} => {
  const { onRowSelectionChange } = props;
  const { rowSelection } = props.table!;

  const getNewRowSelection = ():
    | TableRowSelection<TDataSourceItem>
    | undefined => {
    if (isString(rowSelection)) {
      return {
        type: rowSelection,
        onChange: (selectedRowKeys, selectedRows, info) => {
          table.update({
            selection: selectedRows,
          });
          if (onRowSelectionChange)
            onRowSelectionChange(selectedRowKeys, selectedRows);
        },
      };
    }
    if (isObject(rowSelection)) {
      const { onChange } = rowSelection;
      return {
        ...rowSelection,
        onChange: (selectedRowKeys, selectedRows, info) => {
          table.update({
            selection: selectedRows,
          });
          if (onChange) onChange(selectedRowKeys, selectedRows, info);
          if (onRowSelectionChange)
            onRowSelectionChange(selectedRowKeys, selectedRows);
        },
      };
    }
    return rowSelection;
  };

  return {
    rowSelection: getNewRowSelection(),
    getNewRowSelection,
  };
};

export default useRowSelection;
