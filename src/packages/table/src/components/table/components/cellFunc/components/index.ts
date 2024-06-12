import Link from "./link";
import Actions from "./actions";

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

export { cellComponentMap };
