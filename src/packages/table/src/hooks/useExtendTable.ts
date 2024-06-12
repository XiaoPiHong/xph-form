import { useXphExtendCompProps } from "@xph-form/common";

const useExtendTable = () => {
  const { extendProps, extendComp } = useXphExtendCompProps();

  const getExtendTableCellComp = (componentMap: { [key: string]: any }) => {
    const cellComp = extendComp?.tableCellFunc;
    if (cellComp) {
      Object.keys(cellComp).forEach((key) => {
        const comp = cellComp[key];
        componentMap[key] = {
          Comp: comp,
        };
      });
    }
  };
  return {
    extendTableProps: extendProps?.table,
    getExtendTableCellComp,
  };
};

export default useExtendTable;
