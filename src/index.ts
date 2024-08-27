import XphForm from "./form";
import type {
  IFormProps as IXphFormProps,
  IFormActionType as IXphFormActionType,
  TFormItemProps as TXphFormItemProps,
} from "./types";
import { useForm as useXphForm } from "./hooks";
import type {
  TXphExtendComponentPropsMap,
  IXphExtendProps,
  IXphExtendComponentProps,
} from "./common";
import { XphExtendCompPropsProvider, useXphExtendCompProps } from "./common";

export {
  XphForm,
  IXphFormProps,
  TXphFormItemProps,
  IXphFormActionType,
  useXphForm,
  TXphExtendComponentPropsMap,
  IXphExtendProps,
  IXphExtendComponentProps,
  XphExtendCompPropsProvider,
  useXphExtendCompProps,
};
