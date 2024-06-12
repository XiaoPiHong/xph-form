import React from "react";
import { TComponentPropsMap } from "../types";
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
  Upload,
} from "antd";
import ApiSelect from "./ApiSelect";
import ApiTreeSelect from "./ApiTreeSelect";
import ApiTransfer from "./ApiTransfer";
import ApiAutoComplete from "./ApiAutoComplete";
import AutoUpload from "./AutoUpload";

const componentMap = new Map<keyof TComponentPropsMap, React.FC<any>>();

componentMap.set("Input", Input);
componentMap.set("ApiSelect", ApiSelect);
componentMap.set("Select", Select);
componentMap.set("InputNumber", InputNumber);
componentMap.set("ApiTreeSelect", ApiTreeSelect);
componentMap.set("TreeSelect", TreeSelect);
componentMap.set("ApiTransfer", ApiTransfer);
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
componentMap.set("ApiAutoComplete", ApiAutoComplete);
componentMap.set("AutoComplete", AutoComplete);
componentMap.set("Upload", Upload);
componentMap.set("AutoUpload", AutoUpload);

export { componentMap };
