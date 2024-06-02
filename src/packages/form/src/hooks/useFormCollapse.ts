import { IFormProps } from "../types";
import { useRef, Ref } from "react";

const useFormCollapse = (
  formProps: IFormProps,
  formItemRefs: Ref<Map<string, Ref>>
) => {
  const { collapsible, collapseNum } = formProps;
  const collapseRef: Ref<any> = useRef<any>();

  const onClickCollapseToTrue = () => {
    formItemRefs.current.forEach((ref) => {
      if (ref.current) {
        const { itemIndex } = ref.current;
        const flag = itemIndex >= (collapseNum as number) && collapsible;
        flag && ref.current.setItemCollapse(true);
      }
    });
  };

  const onClickCollapseToFalse = () => {
    formItemRefs.current.forEach((ref) => {
      if (ref.current) {
        const { itemCollapse } = ref.current;
        itemCollapse && ref.current.setItemCollapse(false);
      }
    });
  };

  return {
    collapsible,
    collapseNum: collapseNum as number,
    collapseRef,
    onClickCollapseToTrue,
    onClickCollapseToFalse,
  };
};

export default useFormCollapse;
