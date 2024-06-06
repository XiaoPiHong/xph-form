import React from "react";
import { TActionItemProps, IActionsProps } from "../types";
import {
  Dropdown as ADropdown,
  Button as AButton,
  Space as ASpace,
  theme,
} from "antd";
import { useRenderContent } from "../hooks";
import { CaretDownOutlined } from "@ant-design/icons";

const { useToken } = theme;
const More = ({
  items,
  actionsProps,
}: {
  items: TActionItemProps[];
  actionsProps: IActionsProps;
}) => {
  const { type, disabled } = actionsProps;
  const { renderContent } = useRenderContent();

  /** 获取一下继承过来的背景 */
  const { token } = useToken();
  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const dropdownRender = () => {
    return (
      <div style={contentStyle}>
        <ASpace style={{ padding: 8 }}>
          {items?.map((item, index) => {
            return renderContent(item, index);
          })}
        </ASpace>
      </div>
    );
  };

  return (
    /** items: [] 一定要给不然antd会报错 */
    <ADropdown
      disabled={disabled}
      menu={{ items: [] }}
      dropdownRender={dropdownRender}
      trigger={["click"]}
    >
      <AButton type={type}>更多{<CaretDownOutlined />}</AButton>
    </ADropdown>
  );
};

export default More;
