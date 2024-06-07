import React from "react";
import { CellComponentMap } from "./components";
import { ICellFuncProps } from "./types";

/** 最底层的组件 */
const Main = () => {
  return <div></div>;
};

/** CellFunc需循环处理组件(这个是一个递归组件) */
const CellFunc = <T,>(props: ICellFuncProps<T>) => {
  return <div></div>;
};

export default CellFunc;
