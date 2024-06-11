import React from "react";
import { ICurCellFuncProps, IMainProps } from "../types";

const Link = (
  Comp: React.ReactElement,
  curCellFuncProps: ICurCellFuncProps<"link">,
  mainProps: IMainProps
) => {
  const { curComponentProps, cellFuncProps } = curCellFuncProps;

  const { url, onClick } = curComponentProps!;

  const handleMainClick = () => {
    /**
     * 其他自定义的组件也可能会传递mainClick，所以需要保证其他组件的正常调用
     */
    mainProps.mainClick && mainProps.mainClick();

    if (onClick) {
      onClick();
      return;
    }
    if (url) {
      window.open(url, "_blank");
      return;
    }
  };
  return <Comp {...mainProps} mainClick={handleMainClick}></Comp>;
};

export default Link;
