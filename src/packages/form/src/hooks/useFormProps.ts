import { IFormProps } from "../types";
import { merge } from "lodash-es";
import { useExtendForm } from "../hooks";

const useFormPorps = (formProps: IFormProps) => {
  const { extendFormProps } = useExtendForm();

  const baseFormProps: Partial<IFormProps> = {
    collapseNum: 5,
    colon: false,
    items: [],
    labelWrap: true,
    transformDateFunc: (date: any, format: string) => {
      return date?.format?.(format || "YYYY-MM-DD HH:mm:ss") ?? date;
    },
    fieldMapToTime: [],
  };
  const newFormProps: IFormProps = {
    ...merge(merge(baseFormProps, extendFormProps), formProps),
  };
  return {
    formProps: newFormProps,
  };
};

export default useFormPorps;
