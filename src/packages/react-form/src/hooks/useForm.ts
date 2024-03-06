import { Form, FormInstance } from "antd";
import { useMemo, useEffect } from "react";
import { IFormActionType, IRegister } from "../types";

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
const useForm = (): [IRegister, IFormActionType] => {
  let methods: IFormActionType | null = null;

  async function getMethods(): Promise<IFormActionType> {
    return new Promise((resolve, reject) => {
      if (methods) {
        resolve(methods);
      } else {
        reject();
      }
    });
  }

  function register(mets: IFormActionType) {
    methods = mets;
  }

  const myMethods: IFormActionType = {
    setFieldsValue: async (...args) => {
      const methods = await getMethods();
      return methods.setFieldsValue(...args);
    },
    getFieldsValue: async (...args) => {
      const methods = await getMethods();
      return methods.getFieldsValue(...args);
    },
    resetFields: async (...args) => {
      const methods = await getMethods();
      return methods.resetFields(...args);
    },
    validator: async (...args) => {
      const methods = await getMethods();
      return methods.validator(...args);
    },
    scrollToField: async (...args) => {
      const methods = await getMethods();
      return methods.scrollToField(...args);
    },
  };

  useEffect(() => {
    console.log("ParentComponent is mounted");
    return () => {
      console.log("ParentComponent is unmounted");
    };
  }, []);

  return [register, myMethods];
};

export default useForm;
