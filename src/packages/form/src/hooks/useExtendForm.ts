import { useXphExtendCompProps } from "@xph-form/common";

const useExtendForm = () => {
  const { extendProps, extendComp } = useXphExtendCompProps();

  const getExtendFormComp = (componentMap: Map<any, React.FC<any>>) => {
    const formComp = extendComp?.form;
    if (formComp) {
      Object.keys(formComp).forEach((key) => {
        componentMap.set(key, formComp[key]);
      });
    }
  };

  return {
    extendFormProps: extendProps?.form,
    getExtendFormComp,
  };
};
export default useExtendForm;
