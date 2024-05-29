import { Table as ATable } from "antd";
import React, { memo, Ref } from "react";
import { TTableProps } from "../../types";
import {
  useTableColumns,
  usePagination,
  useTable,
  useRowSelection,
} from "../../hooks";
import { IXphFormActionType } from "@xph-form/form";

const Table = ({
  tableProps,
  searchFormRef,
}: {
  tableProps: TTableProps;
  searchFormRef: Ref<IXphFormActionType>;
}) => {
  const { columns } = useTableColumns(tableProps);
  const { pagination, lastPaginationState, getNewPagination } =
    usePagination(tableProps);
  const { table, firstGetTableData, getTableData, onAllChange } = useTable(
    tableProps,
    {
      pagination,
      lastPaginationState,
    },
    searchFormRef
  );
  const { rowSelection } = useRowSelection(tableProps, table);

  const getTableBindProps = () => {
    const {
      autoRequest,
      api,
      formatDataSource,
      apiPagination,
      columns,
      pagination,
      rowSelection,
      onChange,
      ...rest
    } = tableProps.table!;
    return rest;
  };

  /** 首次请求 */
  firstGetTableData();

  return (
    <ATable
      {...getTableBindProps()}
      loading={table.model.loading}
      columns={columns}
      dataSource={table.model.dataSource}
      /** 请求时需禁用，所以需根据loading判断 */
      pagination={getNewPagination(table.model.loading)}
      rowSelection={rowSelection}
      /** 分页、排序、筛选变化时触发 */
      onChange={onAllChange}
    />
  );
};

export default memo(Table);
