import { useXphExtendCompProps } from "@xph-form/common";

const useExtendActions = () => {
  const { extendProps } = useXphExtendCompProps();

  return {
    extendActionsProps: extendProps?.actions,
  };
};

export default useExtendActions;
