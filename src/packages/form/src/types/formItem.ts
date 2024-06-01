import { TComponentPropsMap } from "./component";
import { Rule } from "antd/es/form";
import React from "react";
import { ColProps } from "antd";
import { IFormActionType } from "./form";

/**
 * 字符串类型对象
 */
export type Recordable<T> = Record<string, T>;

export type TFunction<T> = T | ((args: Recordable<any>) => T);

export interface IBaseFormItemProps {
  name: string /** 字段名 */;
  label: string /** 标签名 */;
  valuePropName?: string /** 子节点的值的属性，如 Switch、Checkbox 的是 checked */;
  show?: TFunction<boolean> /** 是否显示（相当于display:none） */;
  ifShow?: TFunction<boolean> /** 是否显示（会新增或删除节点） */;
  required?: TFunction<boolean> /** 是否必填 */;
  disabled?: TFunction<boolean> /** 是否禁用（当和 Form 同时设置时，以 Item 为准） */;
  componentProps?: TFunction<Recordable<any>> /** 组件属性 */;
  rules?: Rule[] /** 校验规则 */;
  wrapperCol?: ColProps /** 表单项组件的布局方式（当和 Form 同时设置时，以 Item 为准） */;
  labelCol?: ColProps /** 表单项label标签布局方式（当和 Form 同时设置时，以 Item 为准） */;
  colProps?: ColProps /** 表单项的栅格配置（当和 Form 同时设置时，以 Item 为准） */;
  forceRow?: boolean /** 是否强制换一行显示该表单项（强制换行后续会跟随换行表单项） */;
  initialValue?: any /** 默认值 */;
}

/** 自定义渲染函数的props */
export interface IFRenderProps {
  name: string;
  disabled: boolean;
  componentProps: Recordable<any>;
  model: any;
  methods: IFormActionType;
}

/** render props */
/**
 * @description: 自定义渲染组件，若根节点为antd组件，就会和form组件进行双向绑定，model也是响应式的；若根节点为非antd组件，就不会和form组件进行双向绑定，需根据实际业务手动处理表单项的值
 */
export interface IRenderFormItemProps extends IBaseFormItemProps {
  render: (props: IFRenderProps) => React.ReactNode /** 自定义渲染组件 */;
}
/** component props */
export interface IComponentFormItemProps extends IBaseFormItemProps {
  component: keyof TComponentPropsMap /** 映射组件 */;
}

type Without<T, K> = { [P in Exclude<keyof T, K>]?: never };

type XOR<T, U> = T | U extends object
  ? (Without<T, keyof U> & U) | (Without<U, keyof T> & T)
  : T | U;

export type TFormItemProps = XOR<IRenderFormItemProps, IComponentFormItemProps>;

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
