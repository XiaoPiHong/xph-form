import {
  IActionsProps,
  TActionItemProps,
  isComponentActionItemProps,
} from "../types";
import { isNumber } from "lodash-es";

export default function useActionItems(props: IActionsProps): {
  showActionItems: TActionItemProps[];
  ellipsisActionItems: TActionItemProps[];
} {
  const { type, disabled, items, max } = props;

  const actionItems: TActionItemProps[] = items!.map((item) => {
    const temp = { ...item };
    if (isComponentActionItemProps(temp)) {
      temp.componentProps = {
        type,
        disabled,
        ...temp.componentProps,
      };
    }
    return temp;
  });

  /** 如果有max属性，则进行截取 */
  const needSplice = isNumber(max) && max >= 0;
  return {
    showActionItems: actionItems.slice(
      0,
      needSplice ? max : actionItems.length
    ),
    ellipsisActionItems: actionItems.slice(
      needSplice ? max : actionItems.length
    ),
  };
}
