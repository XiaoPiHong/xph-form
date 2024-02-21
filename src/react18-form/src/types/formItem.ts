import { TComponentPropsMap } from "./component";

export interface IBaseFormItemProps {
  name: string /** 字段名 */;
  label: string /** 标签名 */;
  show?: boolean | Function /** 是否显示（相当于display:none） */;
  ifShow?: boolean | Function /** 是否显示（会新增或删除节点） */;
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
  component: keyof TComponentPropsMap /** 映射组件 */;
  componentProps: TComponentPropsMap[keyof TComponentPropsMap];
}

export type TFormItemProps = IRenderFormItemProps | IComponentFormItemProps;
