export type TCellComponentType = "link";

export interface ICellComponentPropsMap {
  link: {
    url: string;
  };
}

export interface ICellProps<T extends TCellComponentType = TCellComponentType> {
  component: T;
  componentProps?: ICellComponentPropsMap[T];
}
