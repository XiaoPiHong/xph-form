import React from "react";
import { ICurCellFuncProps, IMainProps } from "../types";
import { XphActions } from "@xph-form/common";
import style from "../styles/actions.module.css";

const Actions = (
  Comp: React.ReactElement,
  curCellFuncProps: ICurCellFuncProps<"actions">,
  mainProps: IMainProps
) => {
  const { curComponentProps, cellFuncProps } = curCellFuncProps;

  /** 操作列组件比较特殊，不渲染Comp，而是渲染特定的组件 */
  return (
    <div className={style["cellfunc-actions"]}>
      <XphActions {...curComponentProps}></XphActions>
    </div>
  );
};

export default Actions;
