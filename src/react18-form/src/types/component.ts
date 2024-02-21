import { SelectProps, InputProps, InputNumberProps } from "antd";

export type TComponentType = "Select" | "Input" | "InputNumber";

export type TComponentPropsMap = {
  Select: SelectProps;
  Input: InputProps;
  InputNumber: InputNumberProps;
};
