import { Table as ATable, Pagination as APagination } from "antd";
import React, { Ref, forwardRef, useImperativeHandle } from "react";
import { TTableProps } from "../../types";
import {
  useTableColumns,
  useTable,
  useRowSelection,
  useTableScroll,
  useTopToolbar,
} from "../../hooks";
import { IXphFormActionType } from "@xph-form/form";
import { XphActions as TopToolbar } from "@xph-form/common";
import style from "./index.module.css";

const Table = forwardRef(
  (
    {
      tableProps,
      baseTableProps,
      searchFormRef,
      fullHeight,
    }: {
      fullHeight?: boolean;
      tableProps: TTableProps;
      baseTableProps: TTableProps;
      searchFormRef: Ref<IXphFormActionType>;
    },
    ref
  ) => {
    const { columns } = useTableColumns(tableProps);
    const {
      table,
      pagination,
      firstGetTableData,
      onPaginationChange,
      onAllChange,

      resetData,
      resetAllData,
      reloadData,
    } = useTable(tableProps, searchFormRef);
    const { rowSelection } = useRowSelection(tableProps, table);
    const { divRef, scroll } = useTableScroll(tableProps, fullHeight);
    const { getTopToolbarBindProps } = useTopToolbar(
      tableProps,
      baseTableProps,
      table
    );

    const getTableBindProps = () => {
      const {
        autoRequest,
        api,
        formatDataSource,
        autoPagination,
        columns,
        scroll,
        pagination,
        rowSelection,
        onChange,
        ...rest
      } = tableProps.table!;
      return rest;
    };

    /** 首次请求 */
    firstGetTableData();

    useImperativeHandle(ref, () => ({
      resetData,
      resetAllData,
      reloadData,
    }));
    console.log("render Table");
    return (
      <div className={fullHeight ? style["main-container"] : void 0}>
        {/** 操作栏 */}
        <div className={style["container__toolbar"]}>
          <TopToolbar {...getTopToolbarBindProps()} />
        </div>
        {/** 表格 */}
        <div
          ref={divRef}
          className={fullHeight ? style["container__table"] : void 0}
        >
          <ATable
            {...getTableBindProps()}
            loading={table.model.loading}
            columns={columns}
            dataSource={table.model.dataSource}
            /** 不使用table的分页 */
            pagination={false}
            rowSelection={rowSelection}
            scroll={scroll}
            /** 排序、筛选变化时触发 */
            onChange={onAllChange}
          />
        </div>
        {/** 分页器 */}
        {pagination.show ? (
          <div className={style["container__pagination"]}>
            <APagination
              disabled={table.model.loading}
              {...pagination.model}
              onChange={onPaginationChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
);

export default Table;
