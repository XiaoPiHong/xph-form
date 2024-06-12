import React, { createContext, useContext } from "react";
import { IXphActionsProps } from "@xph-form/common";
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

export interface IExtendComponentProps {
  children: React.ReactNode;
  value: {
    extendProps?: IExtendProps;
  };
}

export const ExtendCompPropsContext = createContext<
  IExtendComponentProps["value"]
>({});

export const ExtendCompPropsProvider = (props: IExtendComponentProps) => {
  const { extendProps } = props.value;

  return (
    <ExtendCompPropsContext.Provider
      value={{
        extendProps,
      }}
    >
      {props.children}
    </ExtendCompPropsContext.Provider>
  );
};

/** 提供给使用方来扩展xph的组件/给组件提供默认属性 */
export const useExtendCompProps = (): IExtendComponentProps["value"] =>
  useContext(ExtendCompPropsContext);
