import React, { memo, forwardRef } from "react";
import { XphForm, IXphFormProps } from "../../../../form";

const SearchForm = forwardRef((props: IXphFormProps, ref) => {
  return <XphForm ref={ref} {...props} />;
});

export default memo(SearchForm);
