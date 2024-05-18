import { TFormItemProps } from "../types";

/** 给表单项分组，强制换行的情况 */
const useFormRow = (items: TFormItemProps[]) => {
  /** 根据表单的forceRow分成二维数组 */
  const formItemRows = items.reduce((rows: Array<TFormItemProps[]>, item) => {
    if (item.forceRow) {
      rows.push([item]);
    } else {
      const lastRow = rows[rows.length - 1];
      if (lastRow) {
        lastRow.push(item);
      } else {
        rows.push([item]);
      }
    }
    return rows;
  }, []);
  return {
    formItemRows,
  };
};
export default useFormRow;
