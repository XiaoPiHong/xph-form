import React, { forwardRef } from "react";
import { Table as ATable } from "antd";
import { TTableProps } from "./types";
import SearchForm from "./components/searchForm";
import { useSearchForm } from "./hooks";

const Table = forwardRef(<T extends unknown>(props: TTableProps<T>) => {
  const { searchFormRef, searchFormProps } = useSearchForm(props);
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
