import React, { useCallback } from "react";
import {
  TActionItemProps,
  isComponentActionItemProps,
  isRenderActionItemProps,
} from "../types";
import { componentMap } from "../components";

export default function useRenderContent(): {
  renderContent: (
    item: TActionItemProps,
    index: number | string
  ) => React.ReactNode;
} {
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
