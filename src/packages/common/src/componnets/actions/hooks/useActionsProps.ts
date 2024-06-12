import { IActionsProps } from "../types";
import { merge } from "lodash-es";
import { useExtendActions } from "../hooks";

export default function useActionsProps(props: IActionsProps) {
  const { extendActionsProps } = useExtendActions();
  const baseActionsProps = {
    items: [],
    max: 10,
  };

  const newActionsProps: IActionsProps = {
    ...merge(merge(baseActionsProps, extendActionsProps), props),
  };

  return {
    actionsProps: newActionsProps,
  };
}
