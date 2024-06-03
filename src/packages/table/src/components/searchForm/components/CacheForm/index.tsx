import React, { memo, useRef, forwardRef, useImperativeHandle } from "react";
import { XphForm, IXphFormActionType } from "@xph-form/form";

const CacheForm = forwardRef(
  ({ getBindProps }: { getBindProps: () => any }, ref) => {
    const { formProps, setFormLoading } = getBindProps();

    const xphFormRef = useRef<IXphFormActionType>();

    useImperativeHandle(ref, () => ({
      /** 扩展了loading方法，让table调用 */
      setFormLoading,
      ...xphFormRef.current,
    }));

    return <XphForm ref={xphFormRef} {...formProps} />;
  }
);
export default memo(CacheForm);
