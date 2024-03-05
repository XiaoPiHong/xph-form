import { Form, FormInstance } from "antd";
import { useMemo } from "react";

export const useFormModel = (instance: FormInstance<any>) => {
  /** 响应式数据源 */
  const realModel = Form.useWatch((values) => values, instance);

  /** 重写model */
  const rewritingModel = useMemo(() => {
    return realModel || {};
  }, [realModel]);

  return {
    realModel,
    rewritingModel,
  };
};

const useForm = () => {};

export default useForm;
