import React from "react";
import { CellComponentMap } from "./components";

/** 最底层的组件 */
const Main = () => {
  return <div></div>;
};

/** CellFunc需循环处理组件，这个是一个递归组件 */
const CellFunc = (props) => {
  return <div></div>;
};

export default CellFunc;
