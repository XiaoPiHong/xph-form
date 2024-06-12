import React, { createContext, useContext } from "react";
import { IXphActionsProps } from "../componnets";
import { IXphFormProps } from "@xph-form/form";
import { TXphTableProps } from "@xph-form/table";

export interface IExtendProps {
  /** 表单的属性 */
  form?: IXphFormProps;
  /** 表格的属性 */
  table?: TXphTableProps;
  /** 操作组的属性 */
  actions?: IXphActionsProps;
}

export interface IExtendComp {
  /** 扩展的表单项 */
  form?: { [key: string]: React.FC<any> };
  /** 扩展单元格内容 */
  tableCellFunc?: { [key: string]: React.FC<any> };
  /** 扩展actions项 */
  actions?: { [key: string]: React.FC<any> };
}

export interface IExtendComponentProps {
  children: React.ReactNode;
  value: {
    /** 扩展的属性 */
    extendProps?: IExtendProps;
    /** 扩展的组件 */
    extendComp?: IExtendComp;
  };
}

export const ExtendCompPropsContext = createContext<
  IExtendComponentProps["value"]
>({});

export const ExtendCompPropsProvider = (props: IExtendComponentProps) => {
  const { extendProps, extendComp } = props.value;

  return (
    <ExtendCompPropsContext.Provider
      value={{
        extendProps,
        extendComp,
      }}
    >
      {props.children}
    </ExtendCompPropsContext.Provider>
  );
};

/** 提供给使用方来扩展xph的组件/给组件提供默认属性 */
export const useExtendCompProps = (): IExtendComponentProps["value"] =>
  useContext(ExtendCompPropsContext);
