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
  const { pagination } = usePagination(tableProps);
  const { table, getTableData } = useTable(tableProps, pagination);

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

  console.log(pagination);
  console.log(table);

  /** 首次是否自动请求 */
  useEffect(() => {
    const { autoRequest } = tableProps.table!;
    if (autoRequest)
      searchFormRef.current.validator().then((res) => {
        getTableData({ searchFormParams: res });
      });
  }, []);

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
        />
      </div>
    </div>
  );
});

export default Table;
