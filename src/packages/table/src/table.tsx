import React, { forwardRef } from "react";
import { TTableProps, TRefTable } from "./types";
import SearchForm from "./components/searchForm";
import { useSearchForm, useTableProps } from "./hooks";
import Table from "./components/table";
import style from "./table.module.css";

const XphTable: TRefTable = forwardRef((props: TTableProps, tableRef) => {
  const { tableProps } = useTableProps(props);
  const { searchFormRef, searchFormProps } = useSearchForm(tableProps);
  let { fullHeight, virtual } = tableProps.table!;
  if (virtual) fullHeight = true;

  return (
    <div className={fullHeight ? style["xph-table-full-wrapper"] : void 0}>
      <div>
        <SearchForm
          ref={searchFormRef}
          tableRef={tableRef}
          {...searchFormProps}
        />
      </div>
      <div className={fullHeight ? style["full-wrapper__table"] : void 0}>
        <Table
          ref={tableRef}
          searchFormRef={searchFormRef}
          fullHeight={fullHeight}
          tableProps={tableProps}
        />
      </div>
    </div>
  );
});

export default XphTable;
