import React, { memo, forwardRef } from "react";
import { XphForm } from "../../../../form";
import { TTableSearchFormProps } from "../../types";

const SearchForm = forwardRef((props: TTableSearchFormProps, ref) => {
  const getBindProps = () => {
    const { ...rest } = props;
    return rest;
  };

  return <XphForm ref={ref} {...getBindProps()} />;
});

export default memo(SearchForm);
