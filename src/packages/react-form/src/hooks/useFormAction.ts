import { FormInstance } from "antd";
import { NamePath } from "antd/lib/form/interface";
import { Recordable } from "../types";

const useFormAction = (instance: FormInstance) => {
  const getFieldsValue = <T>(...values: T[]): Recordable<any> => {
    return (instance.getFieldsValue as (...args) => {})(...values);
  };

  const setFieldsValue = async (values: Recordable<any>): Promise<void> => {
    return instance.setFieldsValue(values);
  };

  const resetFields = async () => {
    return instance.resetFields();
  };

  const validator = async (nameList?: NamePath[]) => {
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
