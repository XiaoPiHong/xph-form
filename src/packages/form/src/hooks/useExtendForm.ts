import { useXphExtendCompProps } from "@xph-form/common";

const useExtendForm = () => {
  const { extendProps, extendComp } = useXphExtendCompProps();

  return {
    extendFormProps: extendProps?.form,
  };
};
export default useExtendForm;
