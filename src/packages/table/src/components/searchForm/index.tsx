import React, { memo, forwardRef } from "react";
import { XphForm } from "@xph-form/form";
import { TSearchFormProps } from "../../types";

const SearchForm = forwardRef((props: TSearchFormProps, ref) => {
  const getBindProps = () => {
    const { ...rest } = props;
    return rest;
  };

  return <XphForm ref={ref} {...getBindProps()} />;
});

export default memo(SearchForm);
