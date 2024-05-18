import { FormInstance } from "antd";
import { NamePath } from "antd/lib/form/interface";
import { Recordable } from "../types";

const useFormAction = (
  instance: FormInstance,
  formatRenderValues,
  formatReturnValues
) => {
  const getFieldsValue = (...values): Recordable<any> => {
    /** 返回的时候处理值 */
    return formatReturnValues(
      (instance.getFieldsValue as (...args) => {})(...values)
    );
  };

  const setFieldsValue = (values: Recordable<any>) => {
    // 处理一下提供给setFieldsValue的值（因为时间类型传递给setFieldsValue需要dayjs类型）
    const { renderValues, validKeys } = formatRenderValues(values);
    instance.setFieldsValue(renderValues);
    // 设置完之后验证一下赋值的字段
    instance.validateFields(validKeys);
  };

  const resetFields = async () => {
    return instance.resetFields();
  };

  const validator = async (nameList?: NamePath[]) => {
    /** 返回的时候处理值 */
    return instance.validateFields(nameList).then((res) => {
      return formatReturnValues(res);
    });
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
