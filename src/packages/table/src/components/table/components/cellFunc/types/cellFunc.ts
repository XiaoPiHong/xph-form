export type TCellComponentType = "link";

/** cellFunc中每一项对应的组件componentProps属性映射  */
export interface ICellComponentPropsMap {
  link: {
    /** 超链接，点击超链接跳转 */
    url?: string;
    /** 点击事件（优先级最高） */
    onClick?: () => void;
  };
}

/** cellFunc中每一项的配置  */
export interface ICellProps<T extends TCellComponentType = TCellComponentType> {
  component: T;
  componentProps?: ICellComponentPropsMap[T];
}

/** CellFunc组件的props */
export interface ICellFuncProps<
  T = unknown,
  U extends TCellComponentType = TCellComponentType
> {
  dslConfig: ICellProps<U>[];
  renderPrams: { text: any; record: T; index: number };
}

/** cellFunc中每一项对应的组件的props */
export interface ICurCellFuncProps<
  T extends TCellComponentType = TCellComponentType
> {
  curComponentProps?: ICellComponentPropsMap[T];
  cellFuncProps: ICellFuncProps<unknown, T>;
}
