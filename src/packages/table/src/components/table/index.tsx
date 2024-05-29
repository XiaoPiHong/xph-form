import { Table as ATable } from "antd";
import React, { memo, Ref } from "react";
import { TTableProps } from "../../types";
import { useTableColumns, usePagination, useTable } from "../../hooks";
import { isObject } from "lodash-es";
import { IXphFormActionType } from "@xph-form/form";

const Table = ({
  tableProps,
  searchFormRef,
}: {
  tableProps: TTableProps;
  searchFormRef: Ref<IXphFormActionType>;
}) => {
  const { columns } = useTableColumns(tableProps);
  const { pagination, lastPaginationState } = usePagination(tableProps);
  const { table, firstGetTableData, getTableData, onAllChange } = useTable(
    tableProps,
    {
      pagination,
      lastPaginationState,
    },
    searchFormRef
  );
  console.log(columns);

  const getTableBindProps = () => {
    const {
      autoRequest,
      api,
      formatDataSource,
      apiPagination,
      columns,
      ...rest
    } = tableProps.table!;
    return rest;
  };

  /** 首次请求 */
  firstGetTableData();

  return (
    <ATable
      {...getTableBindProps()}
      columns={columns}
      /** pagination可以是个boolean */
      pagination={
        isObject(pagination.model)
          ? { ...pagination.model, disabled: table.model.loading }
          : pagination.model
      }
      loading={table.model.loading}
      dataSource={table.model.dataSource}
      /** 分页、排序、筛选变化时触发 */
      onChange={onAllChange}
    />
  );
};

export default memo(Table);
