import {
  IActionsProps,
  TActionItemProps,
  isComponentActionItemProps,
} from "../types";

export default function useActionItems(props: IActionsProps): {
  actionItems: TActionItemProps[];
} {
  const { type, disabled, items } = props;

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

  return {
    actionItems,
  };
}
