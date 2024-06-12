import React, { useCallback } from "react";
import {
  TActionItemProps,
  isComponentActionItemProps,
  isRenderActionItemProps,
} from "../types";
import { componentMap } from "../components";
import { useExtendActions } from "../hooks";

export default function useRenderContent(): {
  renderContent: (
    item: TActionItemProps,
    index: number | string
  ) => React.ReactNode;
} {
  /** * 扩展一下用户自定义的组件 */
  const { setExtendActionsComp } = useExtendActions();
  setExtendActionsComp(componentMap);

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
  return {
    renderContent,
  };
}
