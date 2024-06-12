import { useXphExtendCompProps } from "../../../hooks";

const useExtendActions = () => {
  const { extendProps, extendComp } = useXphExtendCompProps();

  const setExtendActionsComp = (componentMap: Map<any, React.FC<any>>) => {
    const actionsComp = extendComp?.actions;
    if (actionsComp) {
      Object.keys(actionsComp).forEach((key) => {
        componentMap.set(key, actionsComp[key]);
      });
    }
  };

  return {
    extendActionsProps: extendProps?.actions,
    setExtendActionsComp,
  };
};

export default useExtendActions;
