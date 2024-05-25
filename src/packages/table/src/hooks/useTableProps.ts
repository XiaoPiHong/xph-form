import { TTableProps } from "../types";
import { merge } from "lodash-es";

const useTableProps = (props: TTableProps) => {
  const baseTableProps: Partial<TTableProps> = {
    table: {
      columns: [],
      apiPagination: true,
      pagination: {
        pageSize: 20,
        total: 0,
        current: 1,
        pageSizeOptions: [10, 20, 50, 100],
        position: ["bottomRight"],
        showSizeChanger: true,
        showQuickJumper: true,
      },
    },
    crudForm: {
      items: [],
    },
    searchForm: {
      items: [],
    },
  };

  const newTableProps: TTableProps = {
    ...merge(baseTableProps, props),
  };

  return {
    tableProps: newTableProps,
  };
};

export default useTableProps;
