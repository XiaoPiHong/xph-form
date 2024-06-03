import React, { forwardRef, Ref } from "react";
import { TSearchFormProps, TTableActionType } from "../../types";
import OtherAction from "./components/OtherAction";
import SearchAction from "./components/SearchAction";
import { XphForm } from "@xph-form/form";

const SearchForm = forwardRef(
  (
    props: TSearchFormProps & {
      tableRef: Ref<TTableActionType>;
    },
    ref
  ) => {
    const { renderActions, tableRef } = props;

    /** 这里可以排除一些扩展的属性 */
    const getBindProps = () => {
      const { renderActions, ...rest } = props;
      return rest;
    };

    const renderAllActions = () => {
      return (
        <div style={{ width: "100%", display: "flex" }}>
          <OtherAction renderActions={renderActions} />
          <SearchAction searchFormRef={ref} tableRef={tableRef} />
        </div>
      );
    };

    return (
      <XphForm ref={ref} {...getBindProps()} renderActions={renderAllActions} />
    );
  }
);

export default SearchForm;
