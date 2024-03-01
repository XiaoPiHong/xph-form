import { TComponentPropsMap } from "./component";
import { Rule } from "antd/es/form";
import React from "react";
import { ColProps } from "antd";

/**
 * 字符串类型对象
 */
export type Recordable<T> = Record<string, T>;

export interface IBaseFormItemProps {
  name: string /** 字段名 */;
  label: string /** 标签名 */;
  valuePropName?: string /** 子节点的值的属性，如 Switch、Checkbox 的是 checked */;
  show?: boolean | Function /** 是否显示（相当于display:none） */;
  ifShow?: boolean | Function /** 是否显示（会新增或删除节点） */;
  required?: boolean | Function /** 是否必填 */;
  dynamicDisabled?: boolean | Function /** 是否禁用 */;
  rules?: Rule[] /** 校验规则 */;
  componentProps?: Recordable<any> /** 组件属性 */;
  wrapperCol?: ColProps /** 表单项组件的布局方式（当和 Form 同时设置时，以 Item 为准） */;
  labelCol?: ColProps /** 表单项label标签布局方式（当和 Form 同时设置时，以 Item 为准） */;
}

/** render props */
export interface IRenderFormItemProps extends IBaseFormItemProps {
  render: (args: Recordable<any>) => React.ReactNode /** 自定义渲染组件 */;
}
/** component props */
export interface IComponentFormItemProps extends IBaseFormItemProps {
  component: keyof TComponentPropsMap /** 映射组件 */;
}

export type TFormItemProps = IRenderFormItemProps | IComponentFormItemProps;

export function isComponentFormItemProps(
  item: TFormItemProps
): item is IComponentFormItemProps {
  return "component" in item;
}

export function isRenderFormItemProps(
  item: TFormItemProps
): item is IRenderFormItemProps {
  return "render" in item;
}
