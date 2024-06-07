import { ColumnType, ColumnGroupType } from "antd/es/table";
import { TDataSourceItem } from "./table";

/** 扩展一下antd column的属性，不一定要扩展，只是预留 */
type TBaseColumnType<T> = {} & ColumnType<T>;

export interface IComponentColumnProps<T>
  extends Omit<TBaseColumnType<T>, "render"> {
  cellFunc: (() => any[]) | any[];
}

export interface IRenderColumnProps<T>
  extends Omit<TBaseColumnType<T>, "render"> {
  render: ColumnType<T>["render"];
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

export type TColumnProps<RecordType = TDataSourceItem> = XOR<
  [
    IComponentColumnProps<RecordType>,
    IRenderColumnProps<RecordType>,
    IGroupColumnProps<RecordType>
  ]
>;
