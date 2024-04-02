import { RuleObject } from "antd/es/form";
import {
  TComponentPropsMap,
  TFormItemProps,
  isRenderFormItemProps,
} from "./types";
import { isFunction } from "lodash-es";

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: keyof TComponentPropsMap) {
  if (component.includes("Input") || component.includes("Complete")) {
    return "请输入";
  }
  if (component.includes("Picker")) {
    return "请选择";
  }
  if (
    component.includes("Select") ||
    component.includes("Cascader") ||
    component.includes("Checkbox") ||
    component.includes("Radio") ||
    component.includes("Switch")
  ) {
    return "请选择";
  }
  return "";
}

export function setComponentRuleType(
  rule: RuleObject,
  component: keyof TComponentPropsMap,
  valueFormat: string
) {
  if (
    ["DatePicker", "MonthPicker", "WeekPicker", "TimePicker"].includes(
      component
    )
  ) {
    rule.type = valueFormat ? "string" : "object";
  } else if (
    ["RangePicker", "Upload", "CheckboxGroup", "TimePicker"].includes(component)
  ) {
    rule.type = "array";
  } else if (["InputNumber"].includes(component)) {
    rule.type = "number";
  }
}

/** 时间类型组件集合 */
export const dateComponents = [
  "DatePicker",
  "MonthPicker",
  "RangePicker",
  "WeekPicker",
  "TimePicker",
];

/** 判断当前项是否需要监听表单的model值 */
export const isNeedWatchModel = (itemProps: TFormItemProps) => {
  const { show, ifShow, required, disabled, componentProps } = itemProps;
  if (
    isFunction(show) ||
    isFunction(ifShow) ||
    isFunction(required) ||
    isFunction(disabled) ||
    isFunction(componentProps) ||
    isRenderFormItemProps(itemProps)
  ) {
    return true;
  }
  return false;
};
