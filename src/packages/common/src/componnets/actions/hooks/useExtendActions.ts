import { useXphExtendCompProps } from "../../../hooks";

const useExtendActions = () => {
  const { extendProps } = useXphExtendCompProps();

  return {
    extendActionsProps: extendProps?.actions,
  };
};

export default useExtendActions;
