import { Table as ATable, Pagination as APagination } from "antd";
import React, { memo, Ref } from "react";
import { TTableProps } from "../../types";
import {
  useTableColumns,
  useTable,
  useRowSelection,
  useTableScroll,
} from "../../hooks";
import { IXphFormActionType } from "@xph-form/form";

const Table = ({
  tableProps,
  searchFormRef,
}: {
  tableProps: TTableProps;
  searchFormRef: Ref<IXphFormActionType>;
}) => {
  const { columns } = useTableColumns(tableProps);
  const {
    table,
    pagination,
    firstGetTableData,
    onPaginationChange,
    onAllChange,
  } = useTable(tableProps, searchFormRef);
  const { rowSelection } = useRowSelection(tableProps, table);
  const { divRef, height } = useTableScroll();
  console.log(height);

  const getTableBindProps = () => {
    const {
      autoRequest,
      api,
      formatDataSource,
      autoPagination,
      columns,
      pagination,
      rowSelection,
      onChange,
      ...rest
    } = tableProps.table!;
    return rest;
  };

  /** 首次请求 */
  firstGetTableData();

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div>这里是操作按钮</div>
      <div ref={divRef} style={{ flex: 1, height: 0 }}>
        <ATable
          scroll={{ y: height - 70, x: "max-content" }}
          {...getTableBindProps()}
          loading={table.model.loading}
          columns={columns}
          dataSource={table.model.dataSource}
          /** 不使用table的分页 */
          pagination={false}
          rowSelection={rowSelection}
          /** 排序、筛选变化时触发 */
          onChange={onAllChange}
        />
      </div>
      {pagination.show() ? (
        <div>
          <APagination
            disabled={table.model.loading}
            {...pagination.model}
            onChange={onPaginationChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default memo(Table);
