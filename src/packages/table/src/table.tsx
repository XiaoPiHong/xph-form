import React, { forwardRef, useImperativeHandle } from "react";
import { TTableProps, TRefTable } from "./types";
import SearchForm from "./components/searchForm";
import { useSearchForm, useTableProps } from "./hooks";
import Table from "./components/table";
import style from "./style/index.module.css";

const XphTable: TRefTable = forwardRef((props: TTableProps, ref) => {
  const { tableProps } = useTableProps(props);
  const { searchFormRef, searchFormProps } = useSearchForm(tableProps);

  useImperativeHandle(ref, () => ({}));
  return (
    <div className={style["xph-table-wrapper"]}>
      <div>
        <SearchForm ref={searchFormRef} {...searchFormProps} />
      </div>
      <div className={style["wrapper-table"]}>
        <Table tableProps={tableProps} searchFormRef={searchFormRef} />
      </div>
    </div>
  );
});

export default XphTable;
