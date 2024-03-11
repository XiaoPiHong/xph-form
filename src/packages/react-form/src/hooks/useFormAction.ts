import { FormInstance } from "antd";
import { NamePath } from "antd/lib/form/interface";
import { Recordable } from "../types";

const useFormAction = (
  instance: FormInstance,
  formatRenderValues,
  formatReturnValues
) => {
  const getFieldsValue = (...values): Recordable<any> => {
    /** 返回的时候处理time */
    return (instance.getFieldsValue as (...args) => {})(...values);
  };

  const setFieldsValue = async (values: Recordable<any>) => {
    /** 成功设置的时候处理time */
    return instance.setFieldsValue(values);
  };

  const resetFields = async () => {
    return instance.resetFields();
  };

  const validator = async (nameList?: NamePath[]) => {
    /** 成功返回的时候处理time */
    return instance.validateFields(nameList);
  };

  const scrollToField = async (name: NamePath, options?: ScrollOptions) => {
    return instance.scrollToField(name, options);
  };

  return {
    getFieldsValue,
    setFieldsValue,
    resetFields,
    validator,
    scrollToField,
  };
};

export default useFormAction;
