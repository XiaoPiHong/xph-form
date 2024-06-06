import { TTableProps } from "../types";
import { IUseTable } from "../hooks";
import { isFunction } from "lodash-es";
import { IXphActionsProps } from "@xph-form/common";

export default function useTopToolbar(
  tableProps: TTableProps,
  baseTableProps: TTableProps,
  table: IUseTable
) {
  const { toolbar } = tableProps.table!;
  const { toolbar: baseToolbar } = baseTableProps.table!;

  /** 获取绑定的属性，兼容一下函数传递的方式 */
  const getTopToolbarBindProps = (): IXphActionsProps => {
    if (isFunction(toolbar)) {
      /** 把loading和selection传递给toolbar，因为这些顶部的按钮可能需要用到 */
      const funcToolbarProps = toolbar({
        loading: table.model.loading,
        selection: table.model.selection,
      });
      return {
        ...baseToolbar,
        ...funcToolbarProps,
        /** 这里代理了一下禁用，获取数据的时候禁用 */
        disabled: table.model.loading || funcToolbarProps.disabled,
      };
    }
    return {
      ...baseToolbar,
      ...toolbar,
      /** 这里代理了一下禁用，获取数据的时候禁用 */
      disabled: table.model.loading || toolbar?.disabled,
    };
  };

  return {
    getTopToolbarBindProps,
  };
}
