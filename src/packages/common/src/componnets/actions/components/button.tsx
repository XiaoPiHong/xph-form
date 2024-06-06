import React from "react";
import { Button as AButton } from "antd";
import { IComponentActionProps } from "../types";

const Button = (props: IComponentActionProps<"Button">) => {
  const { componentProps, onClick } = props;

  const getBindProps = () => {
    const { ...reset } = componentProps!;
    return reset;
  };

  return <AButton {...getBindProps()} onClick={onClick}></AButton>;
};

export default Button;
