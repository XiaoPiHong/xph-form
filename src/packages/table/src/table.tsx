import React, { forwardRef, useImperativeHandle } from "react";
import { Table as ATable } from "antd";
import { TTableProps, TRefTable } from "./types";
import SearchForm from "./components/searchForm";
import { useSearchForm } from "./hooks";

const Table: TRefTable = forwardRef((props: TTableProps, ref) => {
  const { searchFormRef, searchFormProps } = useSearchForm(props);

  useImperativeHandle(ref, () => ({}));
  return (
    <div>
      <div>
        <SearchForm ref={searchFormRef} {...searchFormProps} />
      </div>
      <div>
        <ATable />
      </div>
    </div>
  );
});

export default Table;
