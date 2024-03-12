import { IFormProps } from "../types";

const useFormPorps = (formProps: IFormProps) => {
  const baseFormProps: Partial<IFormProps> = {
    transformDateFunc: (date: any) => {
      return date?.format?.("YYYY-MM-DD HH:mm:ss") ?? date;
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
