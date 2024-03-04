import { TFormItemProps } from "src/types";

/** 给表单项分组，强制换行的情况 */
const useFormRow = (items: TFormItemProps[]) => {
  /** 根据表单的forceRow分成二维数组 */
  const formItemRows = items.reduce((rows: Array<TFormItemProps[]>, item) => {
    if (item.forceRow) {
      rows.push([item]);
    } else {
      const lastRow = rows[rows.length - 1] || [];
      if (lastRow.length === 0) {
        lastRow.push(item);
        rows.push(lastRow);
      } else {
        const lastRowTotalSpan = lastRow.reduce((total, current) => {
          return total + Number(current.colProps?.span);
        }, 0);
        /** 当前组的所有colProps的span相加是否满24，超24换新组 */
        if (lastRowTotalSpan + Number(item.colProps?.span) <= 24) {
          lastRow.push(item);
        } else {
          rows.push([item]);
        }
      }
    }
    return rows;
  }, []);
  return {
    formItemRows,
  };
};
export default useFormRow;
