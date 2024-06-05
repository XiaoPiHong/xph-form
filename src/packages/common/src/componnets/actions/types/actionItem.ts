export interface IBaseActionProps {}

/** 按钮类型 */
export interface IButtonActionProps extends IBaseActionProps {
  component: "Button";
}

/** 下拉类型 */
export interface IDropDownActionProps extends IBaseActionProps {
  component: "DropDown";
}

/** 自定义渲染类型 */
export interface IRenderActionProps extends IBaseActionProps {
  render: () => React.ReactElement;
}

type Without<T, K> = { [P in Exclude<keyof T, K>]?: never };

type XOR<T, U> = T | U extends object
  ? (Without<T, keyof U> & U) | (Without<U, keyof T> & T)
  : T | U;

// 递归处理多种类型的 XOR 关系
type XORMany<T extends any[]> = T extends [infer First, ...infer Rest]
  ? Rest extends any[]
    ? XOR<First, XORMany<Rest>>
    : never
  : never;

export type TActionItemProps = XORMany<
  [IButtonActionProps, IDropDownActionProps, IRenderActionProps]
>;
