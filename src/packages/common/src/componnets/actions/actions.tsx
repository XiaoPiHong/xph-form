import React, { Framgent } from "react";
import { IActionsProps } from "./types";

const Actions = (props: IActionsProps) => {
  const { render, disabled, type, items } = props;
  /** 组件的布局由调用方决定 */
  return render ? render() : <div>我是顶部操作按钮</div>;
};

export default Actions;
