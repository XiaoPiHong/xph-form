import { TComponentPropsMap } from "./component";
import { Rule } from "antd/es/form";
import React from "react";
import { ColProps } from "antd";
import { IFormActionType } from "./form";
import { TXphExtendComponentPropsMap } from "../common";

export type Recordable<T> = Record<string, T>;

export type TFunction<T> = T | ((args: Recordable<any>) => T);

export interface IBaseFormItemProps {
  /**
   * 字段名
   * @defaultValue `-`
   */
  name: string;
  /**
   * 标签名
   * @defaultValue `-`
   */
  label: string;
  /**
   * 子节点的值的属性，如 Switch、Checkbox 的是 checked
   * @defaultValue `-`
   */
  valuePropName?: string;
  /**
   * 是否显示（相当于display:none）
   * @defaultValue `-`
   */
  show?: TFunction<boolean>;
  /**
   * 是否显示（会新增或删除节点）
   * @defaultValue `-`
   */
  ifShow?: TFunction<boolean>;
  /**
   * 是否必填
   * @defaultValue `-`
   */
  required?: TFunction<boolean>;
  /**
   * 是否禁用（当和 Form 同时设置时，以 Item 为准）
   * @defaultValue `-`
   */
  disabled?: TFunction<boolean>;
  /**
   * 组件属性
   * @defaultValue `-`
   */
  componentProps?: TFunction<Recordable<any>>;
  /**
   * 校验规则
   * @defaultValue `-`
   */
  rules?: Rule[];
  /**
   * 表单项组件的布局方式（当和 Form 同时设置时，以 Item 为准）
   * @defaultValue `-`
   */
  wrapperCol?: ColProps;
  /**
   * 表单项label标签布局方式（当和 Form 同时设置时，以 Item 为准）
   * @defaultValue `-`
   */
  labelCol?: ColProps;
  /**
   * 表单项的栅格配置（当和 Form 同时设置时，以 Item 为准）
   * @defaultValue `-`
   */
  colProps?: ColProps;
  /**
   * 是否强制换一行显示该表单项（强制换行后续会跟随换行表单项）
   * @defaultValue `-`
   */
  forceRow?: boolean;
  /**
   * 默认值
   * @defaultValue `-`
   */
  initialValue?: any;
}

/**
 * @description 自定义渲染函数的props
 */
export interface IFRenderProps {
  /**
   * 当前项name
   */
  name: string;
  /**
   * 当前项状态
   */
  disabled: boolean;
  /**
   * 组件属性
   */
  componentProps: Recordable<any>;
  /**
   * 表单值
   */
  model: any;
  /**
   * 表单方法实例
   */
  methods: IFormActionType;
}

/**
 * @description render props（自定义渲染函数，若根节点为antd组件，就会和form组件进行双向绑定，model也是响应式的；若根节点为非antd组件，就不会和form组件进行双向绑定，需根据实际业务手动处理表单项的值）
 */
export interface IRenderFormItemProps extends IBaseFormItemProps {
  /**
   * 自定义渲染函数
   * @defaultValue `-`
   */
  render: (props: IFRenderProps) => React.ReactNode;
}

/**
 * @description component props
 */
export interface IComponentFormItemProps<
  T extends TXphExtendComponentPropsMap = {}
> extends IBaseFormItemProps {
  /**
   * 映射组件
   * @defaultValue `-`
   */
  component: keyof TComponentPropsMap<T>;
}

type Without<T, K> = { [P in Exclude<keyof T, K>]?: never };

type XOR<T, U> = T | U extends object
  ? (Without<T, keyof U> & U) | (Without<U, keyof T> & T)
  : T | U;

export type TFormItemProps<T extends TXphExtendComponentPropsMap = {}> = XOR<
  IRenderFormItemProps,
  IComponentFormItemProps<T>
>;

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
