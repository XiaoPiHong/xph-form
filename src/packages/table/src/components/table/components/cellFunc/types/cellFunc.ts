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

/**
 *
 * 因为渲染是从cellFuncs中的最后一项开始的，所以mainClick是排在后面的组件传递到前面的
 *
 * 目的：目的是为了将自定义组件的点击事件交给最底层的组件进行调用
 * 注意：因为多个自定义组件可能都有mainClick，所以也需要保证其他组件的正常调用（即：传递给子组件Comp的时候，需要把父组件传递过来的mainClick给手动执行一下）
 */
export interface IMainProps {
  mainClick?: () => void;
  mainStyle?: React.CSSProperties;
}
