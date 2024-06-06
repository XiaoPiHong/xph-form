import React from "react";
import { Dropdown as ADropdown, Button as AButton } from "antd";
import { IComponentActionProps } from "../types";
import { CaretDownOutlined } from "@ant-design/icons";

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
      trigger={["click"]}
    >
      <div>
        <AButton {...bindProps}>
          {bindProps.children}
          <CaretDownOutlined />
        </AButton>
      </div>
    </ADropdown>
  );
};

export default Dropdown;
