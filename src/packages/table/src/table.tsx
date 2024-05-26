import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { Table as ATable } from "antd";
import { TTableProps, TRefTable } from "./types";
import SearchForm from "./components/searchForm";
import {
  useSearchForm,
  useTableColumns,
  useTableProps,
  usePagination,
  useTable,
} from "./hooks";
import { isObject } from "lodash-es";

const Table: TRefTable = forwardRef((props: TTableProps, ref) => {
  const { tableProps } = useTableProps(props);
  const { searchFormRef, searchFormProps } = useSearchForm(tableProps);
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

  useImperativeHandle(ref, () => ({}));
  return (
    <div>
      <div>
        <SearchForm ref={searchFormRef} {...searchFormProps} />
      </div>
      <div>
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
      </div>
    </div>
  );
});

export default Table;
