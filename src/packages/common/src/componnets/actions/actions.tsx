import React, { Fragment, useCallback } from "react";
import {
  IActionsProps,
  TActionItemProps,
  isComponentActionItemProps,
  isRenderActionItemProps,
} from "./types";
import { useActionsProps, useActionItems } from "./hooks";
import { componentMap } from "./components";

const Actions = (props: IActionsProps) => {
  const { actionsProps } = useActionsProps(props);

  const { actionItems } = useActionItems(actionsProps);

  const renderContent = useCallback((item: TActionItemProps, index: number) => {
    const isComponent = isComponentActionItemProps(item);
    const isRender = isRenderActionItemProps(item);

    if (isComponent) {
      const Component = componentMap.get(item.component)!;
      return <Component key={index} {...item} />;
    }
    if (isRender) {
      return <div key={index}>{item.render}</div>;
    }

    return null;
  });
  /** 组件的布局由调用方决定 */
  return actionsProps?.render ? (
    actionsProps.render
  ) : (
    <Fragment>
      {actionItems?.map((item, index) => {
        return renderContent(item, index);
      })}
    </Fragment>
  );
};

export default Actions;
