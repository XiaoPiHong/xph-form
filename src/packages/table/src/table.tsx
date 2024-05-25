import React, { forwardRef, useImperativeHandle } from "react";
import { Table as ATable } from "antd";
import { TTableProps, TRefTable } from "./types";
import SearchForm from "./components/searchForm";
import { useSearchForm, useTableColumns, useTableProps } from "./hooks";

const Table: TRefTable = forwardRef((props: TTableProps, ref) => {
  const { tableProps } = useTableProps(props);
  const { searchFormRef, searchFormProps } = useSearchForm(tableProps);
  const { columns } = useTableColumns(tableProps);

  const getTableBindProps = () => {
    const { autoRequest, api, formatDataSource, columns, ...rest } =
      tableProps.table!;
    return rest;
  };

  useImperativeHandle(ref, () => ({}));
  return (
    <div>
      <div>
        <SearchForm ref={searchFormRef} {...searchFormProps} />
      </div>
      <div>
        <ATable {...getTableBindProps()} columns={columns} />
      </div>
    </div>
  );
});

export default Table;
