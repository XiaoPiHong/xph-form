import { TTableProps } from "../types";

const useTableProps = (props: TTableProps) => {
  const baseTableProps: Partial<TTableProps> = {
    table: {},
    crudForm: {
      items: [],
    },
    searchForm: {
      items: [],
    },
  };

  const newTableProps: TTableProps = {};

  return {
    tableProps: newTableProps,
  };
};

export default useTableProps;
