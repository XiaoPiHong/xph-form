import { useXphExtendCompProps } from "@xph-form/common";

const useExtendTable = () => {
  const { extendProps } = useXphExtendCompProps();
  return {
    extendTableProps: extendProps?.table,
  };
};

export default useExtendTable;
