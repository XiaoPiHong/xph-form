import Link from "./link";
import Actions from "./actions";
import { useExtendTable } from "../../../../../hooks";

const { setExtendTableCellFuncComp } = useExtendTable();

const cellComponentMap = {
  /** 超链接 */
  link: {
    Comp: Link,
  },
  /** 操作组 */
  actions: {
    Comp: Actions,
  },
};

/** 扩展用户自定义的单元格映射组件 */
setExtendTableCellFuncComp(cellComponentMap);

export { cellComponentMap };
