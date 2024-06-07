export type TCellComponentType = "link";

/** cellFunc中每一项对应的组件属性映射  */
export interface ICellComponentPropsMap {
  link: {
    url: string;
  };
}

/** cellFunc中每一项得配置  */
export interface ICellProps<T extends TCellComponentType = TCellComponentType> {
  component: T;
  componentProps?: ICellComponentPropsMap[T];
}

export interface ICellFuncProps<
  T = unknown,
  U extends TCellComponentType = TCellComponentType
> {
  dslConfig: ICellProps<U>[];
  renderPrams: [value: any, record: T, index: number];
}
