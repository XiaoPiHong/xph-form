import React from "react";
import {
  TTableProps,
  TDataSourceItem,
  TColumnProps,
  isComponentColumnProps,
  isChildrenColumnProps,
} from "../types";
import { ColumnsType } from "antd/es/table";
import { isFunction } from "lodash-es";
import CellFunc from "../components/table/components/cellFunc/cellFunc";

/** 递归column */
function addAttributesToNodes(
  array: TColumnProps[]
): ColumnsType<TDataSourceItem> {
  return array.map((node) => {
    // 这里可以添加一些新属性
    let newNode: TColumnProps = { ...node };

    /** 如果是组件类型的将cellFunc用render渲染 */
    if (isComponentColumnProps(newNode)) {
      const { cellFunc, ...reset } = newNode;
      newNode = {
        ...reset,
        render: (...args) => {
          const flag = isFunction(cellFunc);

          const [text, record, index] = args;
          const renderParams = { text, record, index };
          const dslConfig = flag ? cellFunc(renderParams) : cellFunc;

          return <CellFunc dslConfig={dslConfig} renderPrams={renderParams} />;
        },
      };
    }

    /** 有children节点是antd的ColumnGroupType */
    if (isChildrenColumnProps(newNode)) {
      // 递归处理 children 属性
      if (newNode.children && Array.isArray(newNode.children)) {
        newNode.children = addAttributesToNodes(newNode.children);
      }
    }

    return newNode;
  });
}

export default function useTableColumns(props: TTableProps): {
  columns: ColumnsType<TDataSourceItem>;
} {
  const { columns } = props.table!;

  const newColumns = addAttributesToNodes(columns!);

  console.log(newColumns);

  /** 递归columns生成对应的内容 */
  return {
    columns: newColumns,
  };
}
