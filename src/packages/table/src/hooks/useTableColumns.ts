import { TTableProps } from "../types";

const useTableColumns = (props: TTableProps) => {
  const { columns } = props.table || {};
  return {
    columns,
  };
};

export default useTableColumns;
