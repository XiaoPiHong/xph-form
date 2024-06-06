import { ButtonProps, MenuProps } from "antd";

export interface IBaseActionProps {
  /** 唯一标识 */
  key?: string;
}

export type TComponentType = {
  Button: IButtonProps;
  Dropdown: IDropdownProps;
};

interface IButtonProps extends ButtonProps {}
interface IDropdownProps extends Omit<ButtonProps, "onClick"> {
  dropDownItems: {
    key: string;
    label: string;
    /** 注意：父级如果disabled为true，子级无法展开（所以相当于是变向的父级禁用，子级也禁用了） */
    disabled?: boolean;
    icon?: React.ReactNode;
  }[];
  onClick: MenuProps["onClick"];
}

/** 组件类型 */
export interface IComponentActionProps<T extends keyof TComponentType>
  extends IBaseActionProps {
  /** 组件 */
  component: T;
  /** 组件属性 */
  componentProps?: TComponentType[T];
}

/** 自定义内容 */
export interface IRenderActionProps extends IBaseActionProps {
  /** 自定义内容 */
  render: React.ReactElement;
}

/**
 *
 * 这个类型接受两个泛型参数 T 和 K。它使用了 TypeScript 中的映射类型，并从 T 中移除 K 对应的属性。这样做的结果是，返回的类型会继承 T，但移除了 K 对应的属性
 */
type Without<T, K> = { [P in Exclude<keyof T, K>]?: never };

/**
 * 
 * 这个 `XOR` 类型的定义是一个 TypeScript 中的条件类型，用于实现对多个类型的互斥组合。现在，我会逐步解释这个类型的定义：

1. `T extends [infer A, infer B, ...infer Rest]`：这个条件判断首先检查泛型类型 `T` 是否是一个元组类型。如果是的话，它会将元组的第一个类型赋值给 `A`，第二个类型赋值给 `B`，并将剩余的类型赋值给 `Rest`。如果 `T` 不是元组类型，则跳到下一个条件。

2. `? A | B extends object`：在这个条件分支中，我们检查 `A` 或 `B` 是否为对象类型。如果至少有一个是对象类型，则进入这个条件分支，否则直接返回 `A | B`。

3. `| (Without<A, keyof B> & B) | (Without<B, keyof A> & A) | XOR<[A | B, ...Rest]>`：在这个部分中，我们处理了 `A` 和 `B` 的互斥性。如果 `A` 是对象类型，则返回一个交叉类型，其中包含了 `A` 中除去 `B` 中存在的属性之外的所有属性，并与 `B` 的类型相交。类似地，我们也处理了 `B` 的情况。然后，我们通过递归调用 `XOR` 类型处理剩余的类型 `Rest`，确保在同一时间只能使用其中一个类型。

4. `: T extends [infer A] ? A : never`：如果 `T` 只有一个元素，那么直接返回这个元素的类型 `A`。

5. `: never`：如果 `T` 不是一个元组，并且不止一个元素，则返回 `never` 类型，表示无法匹配任何类型。

综上所述，这个 `XOR` 类型的定义通过条件类型实现了对多个类型的互斥组合，并确保在同一时间只能使用其中一个类型。
 */
type XOR<T extends any[]> = T extends [infer A, infer B, ...infer Rest]
  ? A | B extends object
    ?
        | (Without<A, keyof B> & B)
        | (Without<B, keyof A> & A)
        | XOR<[A | B, ...Rest]>
    : A | B
  : T extends [infer A]
  ? A
  : never;

export type TActionItemProps = XOR<
  [
    IComponentActionProps<"Button">,
    IComponentActionProps<"Dropdown">,
    IRenderActionProps
  ]
>;

/** 判断是哪种类型的action */
export function isComponentActionItemProps(
  item: TActionItemProps
): item is IComponentActionProps<"Button"> {
  return "component" in item;
}

export function isRenderActionItemProps(
  item: TActionItemProps
): item is IRenderActionProps {
  return "render" in item;
}
