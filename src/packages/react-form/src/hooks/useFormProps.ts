import { IFormProps } from "../types";

const useFormPorps = (formProps: IFormProps) => {
  const baseFormProps: Partial<IFormProps> = {
    colon: false,
    labelWrap: true,
    transformDateFunc: (date: any, format: string) => {
      return date?.format?.(format || "YYYY-MM-DD HH:mm:ss") ?? date;
    },
    fieldMapToTime: [],
  };
  const newFormProps: IFormProps = {
    ...baseFormProps,
    ...formProps,
  };
  return {
    formProps: newFormProps,
  };
};

export default useFormPorps;
