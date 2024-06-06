import { IActionsProps } from "../types";
import { merge } from "lodash-es";

export default function useActionsProps(props: IActionsProps) {
  const baseActionsProps = {
    items: [],
    max: 10,
  };

  const newActionsProps: IActionsProps = {
    ...merge(baseActionsProps, props),
  };

  return {
    baseActionsProps,
    actionsProps: newActionsProps,
  };
}
