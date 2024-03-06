import { Form, FormInstance } from "antd";
import { useMemo, useEffect } from "react";
import { IFormActionType } from "../types";

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

/**
 * form组件会先于parent组件挂载，挂载完后调用register方法，将methods注册到useForm中
 */
const useForm = () => {
  let methods: IFormActionType | null = null;

  function register(mets: IFormActionType | null) {
    methods = mets;
  }

  useEffect(() => {
    console.log("ParentComponent is mounted");
  }, []);

  return [register, methods];
};

export default useForm;
