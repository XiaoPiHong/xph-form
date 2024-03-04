import { Form, FormInstance } from "antd";
import { useMemo } from "react";
import { IFormPorps } from "../types";

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

export const useFormBindProps = (props: IFormPorps) => {
  const { layout, wrapperCol, labelCol } = props;
  const formBindProps = { layout, wrapperCol, labelCol };
  return { formBindProps };
};

const useForm = () => {};

export default useForm;
