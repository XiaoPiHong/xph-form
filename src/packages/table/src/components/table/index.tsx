import { Table as ATable, Pagination as APagination } from "antd";
import React, { Ref, forwardRef, useImperativeHandle } from "react";
import { TTableProps } from "../../types";
import {
  useTableColumns,
  useTable,
  useRowSelection,
  useTableScroll,
} from "../../hooks";
import { IXphFormActionType } from "@xph-form/form";
import style from "./index.module.css";

const Table = forwardRef(
  (
    {
      tableProps,
      searchFormRef,
      fullHeight,
    }: {
      fullHeight?: boolean;
      tableProps: TTableProps;
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
    } = useTable(tableProps, searchFormRef);
    const { rowSelection } = useRowSelection(tableProps, table);
    const { divRef, scroll } = useTableScroll(tableProps, fullHeight);

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

    useImperativeHandle(ref, () => ({}));

    return (
      <div className={fullHeight ? style["main-container"] : void 0}>
        <div>这里是操作按钮</div>
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
