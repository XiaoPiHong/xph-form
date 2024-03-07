import React from "react";
import {
  Input,
  Select,
  InputNumber,
  TreeSelect,
  Transfer,
  Switch,
  Button,
  Radio,
  Checkbox,
  Cascader,
  TimePicker,
  DatePicker,
  AutoComplete,
} from "antd";
import { TComponentPropsMap } from "../types";

const componentMap = new Map<keyof TComponentPropsMap, React.FC<any>>();

componentMap.set("Input", Input);
componentMap.set("Select", Select);
componentMap.set("InputNumber", InputNumber);
componentMap.set("TreeSelect", TreeSelect);
componentMap.set("Transfer", Transfer);
componentMap.set("Switch", Switch);
componentMap.set("Button", Button);
componentMap.set("Radio", Radio);
componentMap.set("RadioGroup", Radio.Group);
componentMap.set("Checkbox", Checkbox);
componentMap.set("CheckboxGroup", Checkbox.Group);
componentMap.set("Cascader", Cascader);
componentMap.set("TimePicker", TimePicker);
componentMap.set("DatePicker", DatePicker);
componentMap.set("MonthPicker", DatePicker.MonthPicker);
componentMap.set("WeekPicker", DatePicker.WeekPicker);
componentMap.set("RangePicker", DatePicker.RangePicker);
componentMap.set("InputPassword", Input.Password);
componentMap.set("InputTextArea", Input.TextArea);
componentMap.set("AutoComplete", AutoComplete);

export { componentMap };
