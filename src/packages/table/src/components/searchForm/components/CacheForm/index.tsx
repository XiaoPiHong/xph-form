import React, { memo } from "react";
import { XphForm } from "@xph-form/form";

const CacheForm = ({ getBindProps }: { getBindProps: () => any }) => {
  const { xphRef, xphFormProps } = getBindProps();
  return <XphForm ref={xphRef} {...xphFormProps} />;
};
export default memo(CacheForm);
