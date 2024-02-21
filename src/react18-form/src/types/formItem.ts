import { TComponentPropsMap, TComponentType } from "./component";
import { Rule } from "antd/es/form";

export interface IBaseFormItemProps {
  name: string /** 字段名 */;
  label: string /** 标签名 */;
  valuePropName?: string /** 子节点的值的属性，如 Switch、Checkbox 的是 checked */;
  show?: boolean | Function /** 是否显示（相当于display:none） */;
  ifShow?: boolean | Function /** 是否显示（会新增或删除节点） */;
  required?: boolean | Function /** 是否必填 */;
  rules?: Rule[] /** 校验规则 */;
}

/**
 * 字符串类型对象
 */
export type Recordable<T> = Record<string, T>;

/** render props */
export interface IRenderFormItemProps extends IBaseFormItemProps {
  render: (args: Recordable<string>) => React.ReactNode /** 自定义渲染组件 */;
  componentProps?: Recordable<any>;
}
/** component props */
export interface IComponentFormItemProps extends IBaseFormItemProps {
  component: TComponentType /** 映射组件 */;
  componentProps?: TComponentPropsMap[keyof TComponentPropsMap];
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
