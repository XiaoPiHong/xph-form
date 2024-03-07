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
 *
 * @description 用于注册form的方法
 * @description form组件会先于parent组件挂载，挂载完后调用register方法，将methods注册到useForm中
 *
 */
const useForm = (): [IRegister, IFormActionType] => {
  console.log("ParentComponent render");
  let methods: IFormActionType | null = null;

  async function getMethods(): Promise<IFormActionType> {
    return new Promise((resolve, reject) => {
      if (methods) {
        console.log("resolve");
        resolve(methods);
      } else {
        console.log("reject");
        reject();
      }
    });
  }

  function register(mets: IFormActionType) {
    methods = mets;
  }

  const _methods: IFormActionType = {
    setFieldsValue: async (...args) => {
      const methods = await getMethods();
      return methods.setFieldsValue(...args);
    },
    getFieldsValue: async (...args) => {
      const methods = await getMethods();
      return methods.getFieldsValue(args[0]);
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
      methods = null;
    };
  }, []);

  return [register, _methods];
};

export default useForm;
