import React, { forwardRef, useImperativeHandle } from "react";
import { TTableProps, TRefTable } from "./types";
import SearchForm from "./components/searchForm";
import { useSearchForm, useTableProps } from "./hooks";
import Table from "./components/table";
import style from "./style/index.module.css";

const XphTable: TRefTable = forwardRef((props: TTableProps, ref) => {
  const { tableProps } = useTableProps(props);
  const { searchFormRef, searchFormProps } = useSearchForm(tableProps);
  let { fullHeight, virtual } = tableProps.table!;
  if (virtual) fullHeight = true;

  useImperativeHandle(ref, () => ({}));
  return (
    <div className={fullHeight ? style["xph-table-full-wrapper"] : void 0}>
      <div>
        <SearchForm ref={searchFormRef} {...searchFormProps} />
      </div>
      <div className={fullHeight ? style["full-wrapper-table"] : void 0}>
        <Table
          fullHeight={fullHeight}
          tableProps={tableProps}
          searchFormRef={searchFormRef}
        />
      </div>
    </div>
  );
});

export default XphTable;
