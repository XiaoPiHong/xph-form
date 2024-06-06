import React from "react";
import { Dropdown as ADropdown, Button as AButton } from "antd";
import { IComponentActionProps } from "../types";

const Dropdown = (props: IComponentActionProps<"Dropdown">) => {
  const { componentProps, onClick } = props;

  const getBindProps = () => {
    const { dropDownItems, ...reset } = componentProps!;
    return reset;
  };

  const bindProps = getBindProps();

  return (
    /** items: [] 一定要给不然antd会报错 */
    <ADropdown
      disabled={bindProps.disabled}
      menu={{
        items: [
          {
            key: "2",
            label: (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.aliyun.com"
              >
                2nd menu item (disabled)
              </a>
            ),
          },
          {
            key: "3",
            label: (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.luohanacademy.com"
              >
                3rd menu item (disabled)
              </a>
            ),
          },
        ],
      }}
    >
      <AButton {...bindProps} onClick={onClick}></AButton>
    </ADropdown>
  );
};

export default Dropdown;
