/** api下拉选择组件待完善 */
import React from "react";
import { Select, SelectProps } from "antd";

export interface IApiSelectProps extends SelectProps {
  api?: () => Promise<any>;
}

const ApiSelect: React.FC<IApiSelectProps> = () => {
  return <Select></Select>;
};

export default ApiSelect;
