import React from "react";
import style from "./index.module.css";
import { IFormProps } from "../../types";

const ActionGroup = ({ formProps }: { formProps: IFormProps }) => {
  const { renderActions } = formProps;
  return <div className={style["group-wrapper"]}>{renderActions?.()}</div>;
};

export default ActionGroup;
