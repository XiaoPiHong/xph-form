import React from "react";
import {
  Input,
  Select,
  InputNumber,
  Tree,
  TreeSelect,
  Transfer,
  Switch,
  Button,
  Radio,
  Checkbox,
  Cascader,
  TimePicker,
  DatePicker,
} from "antd";
import { TComponentPropsMap } from "../types";

const componentMap = new Map<keyof TComponentPropsMap, React.FC<any>>();

componentMap.set("Input", Input);
componentMap.set("Select", Select);
componentMap.set("InputNumber", InputNumber);
componentMap.set("Tree", Tree);
componentMap.set("TreeSelect", TreeSelect);
componentMap.set("Transfer", Transfer);
componentMap.set("Switch", Switch);
componentMap.set("Button", Button);
componentMap.set("Radio", Radio);
componentMap.set("Checkbox", Checkbox);
componentMap.set("Cascader", Cascader);
componentMap.set("TimePicker", TimePicker);
componentMap.set("DatePicker", DatePicker);

export { componentMap };
