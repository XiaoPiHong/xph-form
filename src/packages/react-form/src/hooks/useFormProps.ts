import { IFormProps } from "../types";

const useFormPorps = (formProps: IFormProps) => {
  const baseFormProps: Partial<IFormProps> = {
    transformDateFunc: (date: any) => {
      return date?.format?.("YYYY-MM-DD HH:mm:ss") ?? date;
    },
    fieldMapToTime: [],
  };

  return {
    formProps: {
      ...baseFormProps,
      ...formProps,
    },
  };
};

export default useFormPorps;
