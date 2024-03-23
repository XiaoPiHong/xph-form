import { Form, FormInstance } from "antd";
import { useMemo, useEffect, useState } from "react";
import { IFormActionType, IRegister } from "../types";

export const useFormModel = (...args: FormInstance<any>[]) => {
  const params = [(values) => values, ...args];
  /** 响应式数据源 */
  const realModel = (Form.useWatch as Function)(...params);

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
 * @description form组件会先于parent组件挂载，挂载完后调用register方法，将methods注册到useForm中给parent使用
 *
 */
const useForm = (): [IRegister, IFormActionType] => {
  // console.log("ParentComponent render=========================================");
  let methods: IFormActionType | null = null;

  function register(mets: IFormActionType) {
    methods = mets;
  }

  /** 重新声明一个obj存储是防止parent在初始化的时候使用useForm解构报错问题 */
  /** 如果在初始化完成前使用了api会抛出错误提示 */
  const _methods: IFormActionType = {
    getFieldsValue: (...args) => {
      if (!methods) {
        throw new Error("表单还没初始化完成");
      }
      return methods.getFieldsValue(...args);
    },
    setFieldsValue: (...args) => {
      if (!methods) {
        throw new Error("表单还没初始化完成");
      }
      return methods.setFieldsValue(...args);
    },
    resetFields: (...args) => {
      if (!methods) {
        throw new Error("表单还没初始化完成");
      }
      return methods.resetFields(...args);
    },
    validator: (...args) => {
      if (!methods) {
        throw new Error("表单还没初始化完成");
      }
      return methods.validator(...args);
    },
    scrollToField: (...args) => {
      if (!methods) {
        throw new Error("表单还没初始化完成");
      }
      return methods.scrollToField(...args);
    },
  };

  useEffect(() => {
    // console.log("ParentComponent is mounted=====================================");
    return () => {
      // console.log("ParentComponent is unmounted====================================");
      methods = null;
    };
  }, []);

  return [register, _methods];
};

export default useForm;
