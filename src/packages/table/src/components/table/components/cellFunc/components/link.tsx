import React from "react";
import { ICurCellFuncProps, IMainProps } from "../types";
import { theme } from "antd";

const { useToken } = theme;

const Link = (
  Comp: React.ReactElement,
  curCellFuncProps: ICurCellFuncProps<"link">,
  mainProps: IMainProps
) => {
  const { curComponentProps, cellFuncProps } = curCellFuncProps;

  const { url, onClick } = curComponentProps!;

  /** 获取一下继承过来的超链接颜色 */
  const { token } = useToken();

  const mainStyle: React.CSSProperties = {
    color: token.colorLink,
    cursor: "pointer",
  };

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
  return (
    <Comp
      {...mainProps}
      mainClick={handleMainClick}
      mainStyle={Object.assign(mainStyle, mainProps?.mainStyle || {})}
    ></Comp>
  );
};

export default Link;
