import { TTableProps } from "../types";
import { merge } from "lodash-es";

const useTableProps = (props: TTableProps) => {
  const baseTableProps: Partial<TTableProps> = {
    table: {
      columns: [],
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
