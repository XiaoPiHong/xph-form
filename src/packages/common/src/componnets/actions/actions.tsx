import React, { Fragment } from "react";
import { IActionsProps } from "./types";
import { useActionsProps, useActionItems, useRenderContent } from "./hooks";
import More from "./components/more";

const Actions = (props: IActionsProps) => {
  const { actionsProps } = useActionsProps(props);

  const { showActionItems, ellipsisActionItems } = useActionItems(actionsProps);
  const { renderContent } = useRenderContent();

  /** 组件的布局由调用方决定 */
  return actionsProps?.render ? (
    actionsProps.render
  ) : (
    <Fragment>
      {/** 未超出部分 */}
      {showActionItems?.map((item, index) => {
        return renderContent(item, index);
      })}

      {/** 超出部分（更多操作） */}
      {ellipsisActionItems?.length ? (
        <More actionsProps={actionsProps} items={ellipsisActionItems} />
      ) : null}
    </Fragment>
  );
};

export default Actions;
