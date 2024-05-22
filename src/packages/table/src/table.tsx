import React, { forwardRef, useImperativeHandle } from "react";
import { Table as ATable } from "antd";
import { TTableProps, TRefTable } from "./types";
import SearchForm from "./components/searchForm";
import { useSearchForm, useTableColumns } from "./hooks";

const Table: TRefTable = forwardRef((props: TTableProps, ref) => {
  const { searchFormRef, searchFormProps } = useSearchForm(props);
  const { columns } = useTableColumns(props);

  const getTableBindProps = () => {
    const { autoRequest, columns, ...rest } = props.table || {};
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
