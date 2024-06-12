import { ColumnType, ColumnGroupType } from "antd/es/table";
import { TDataSourceItem } from "./table";
import {
  ICellProps,
  TCellComponentType,
} from "../components/table/components/cellFunc/types";

/** 扩展一下antd column的属性，不一定要扩展，只是预留 */
type TBaseColumnType<T> = {} & ColumnType<T>;

export interface IComponentColumnProps<T, U extends TCellComponentType>
  extends Omit<TBaseColumnType<T>, "render"> {
  /** 单元格渲染属性（原理也是使用render渲染不同的内容） */
  cellFunc:
    | ((props: { text: any; record: T; index: number }) => ICellProps<U>[]) // =============================此处类型校验还有缺陷，如果cellFunc写成函数形式，ICellProps的componentProps校验映射会存在问题（如：componentProps中没有的属性也会校验通过，也就是无法深入校验componentProps）
    | ICellProps<U>[];
}

export interface IRenderColumnProps<T>
  extends Omit<TBaseColumnType<T>, "render"> {
  render?: ColumnType<T>["render"];
}

export interface IGroupColumnProps<T>
  extends Omit<ColumnGroupType<T>, "children"> {
  children: Array<TColumnProps<T>>;
}

type Without<T, K> = { [P in Exclude<keyof T, K>]?: never };

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

export type TColumnProps<
  RecordType = TDataSourceItem,
  ComponentType extends TCellComponentType = TCellComponentType
> = XOR<
  [
    IComponentColumnProps<RecordType, ComponentType>,
    IRenderColumnProps<RecordType>,
    IGroupColumnProps<RecordType>
  ]
>;

export function isComponentColumnProps<T, U extends TCellComponentType>(
  column: TColumnProps<T, U>
): column is IComponentColumnProps<T, U> {
  return "cellFunc" in column;
}

export function isChildrenColumnProps<T>(
  column: TColumnProps<T>
): column is IGroupColumnProps<T> {
  return "children" in column;
}
