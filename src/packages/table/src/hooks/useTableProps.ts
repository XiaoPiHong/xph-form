import { TTableProps } from "../types";
import { merge } from "lodash-es";
import { useExtendTable } from "../hooks";

const useTableProps = (props: TTableProps) => {
  const { extendTableProps } = useExtendTable();
  const baseTableProps: Partial<TTableProps> = {
    table: {
      columns: [],
      fullHeight: false,
      autoRequest: true,
      pagination: {
        pageSize: 20,
        total: 0,
        showTotal: (total) => `共：${total} 条`,
        current: 1,
        pageSizeOptions: [10, 20, 50, 100],
        showSizeChanger: true,
        showQuickJumper: true,
      },
    },
    crudForm: {
      items: [],
    },
    searchForm: {
      showSearch: true,
      items: [],
    },
  };

  /**
   * 基本配置的优先级（等级越高优先级越高）
   * 一级：baseTableProps组件基本的配置
   * 二级：extendProps?.table用户使用Context提供的组件公共配置
   * 三级：用户当前组件的props
   */
  const newTableProps: TTableProps = {
    ...merge(merge(baseTableProps, extendTableProps), props),
  };

  return {
    tableProps: newTableProps,
  };
};

export default useTableProps;
