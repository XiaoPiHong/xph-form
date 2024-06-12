import { IActionsProps } from "../types";
import { merge } from "lodash-es";
import { useXphExtendCompProps } from "@xph-form/common";

export default function useActionsProps(props: IActionsProps) {
  const { extendProps } = useXphExtendCompProps();
  const baseActionsProps = {
    items: [],
    max: 10,
  };

  const newActionsProps: IActionsProps = {
    ...merge(merge(baseActionsProps, extendProps?.actions), props),
  };

  return {
    actionsProps: newActionsProps,
  };
}
