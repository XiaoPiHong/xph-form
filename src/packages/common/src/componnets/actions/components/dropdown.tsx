import React from "react";
import { Dropdown as ADropdown, Button as AButton } from "antd";
import { IComponentActionProps } from "../types";

const Dropdown = (props: IComponentActionProps<"Dropdown">) => {
  const { componentProps } = props;

  const getBindProps = () => {
    const { dropDownItems, onClick, ...reset } = componentProps!;
    return reset;
  };

  const bindProps = getBindProps();

  return (
    /** items: [] 一定要给不然antd会报错 */
    <ADropdown
      disabled={bindProps.disabled}
      menu={{
        items: componentProps?.dropDownItems || [],
        onClick: componentProps?.onClick,
      }}
    >
      <AButton {...bindProps}></AButton>
    </ADropdown>
  );
};

export default Dropdown;
