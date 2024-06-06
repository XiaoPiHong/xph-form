import React from "react";
import { Button as AButton } from "antd";
import { IComponentActionProps } from "../types";

const Button = (props: IComponentActionProps<"Button">) => {
  const { componentProps } = props;

  const getBindProps = () => {
    const { ...reset } = componentProps!;
    return reset;
  };

  return <AButton {...getBindProps()}></AButton>;
};

export default Button;
