import { Form as AForm, Row } from "antd";
import { IFormProps, IFormActionType } from "./types";
import FormItem from "./components/formItem";
import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { useFormModel, useFormItem, useFormRow } from "./hooks";

const Form = forwardRef((props: IFormProps, ref) => {
  console.log("Form render");
  const [formInstance] = AForm.useForm();
  const { rewritingModel } = useFormModel(formInstance);
  const { formItems } = useFormItem({ props, model: rewritingModel });
  const { formItemRows } = useFormRow(formItems);

  /**
   * @description 用于绑定给form的属性
   * @description 后续绑定给form的属性需在这里扩展一下
   */
  const getFormBindProps = () => {
    const {
      layout,
      wrapperCol,
      labelCol,
      colon = false,
      disabled,
      labelWrap = true,
      labelAlign,
      scrollToFirstError,
      size,
    } = props;
    return {
      layout,
      wrapperCol,
      labelCol,
      colon,
      disabled,
      labelWrap,
      labelAlign,
      scrollToFirstError,
      size,
    };
  };

  const methods: IFormActionType = {
    setFieldsValue: formInstance.setFieldsValue,
    getFieldsValue: formInstance.getFieldsValue,
    resetFields: formInstance.resetFields,
    validator: formInstance.validateFields,
    scrollToField: formInstance.scrollToField,
  };

  // 使用 useImperativeHandle 暴露指定的属性或方法
  useImperativeHandle(ref, () => ({
    ...methods,
  }));

  useEffect(() => {
    console.log("Form is mounted");
    props.register && props.register(methods);
    return () => {
      console.log("Form is unmounted");
    };
  }, []);

  return (
    <AForm form={formInstance} {...getFormBindProps()}>
      {formItemRows.map((row, rowIndex) => {
        return (
          <Row key={rowIndex}>
            {row.map((item, itemIndex) => (
              <FormItem
                key={itemIndex}
                model={rewritingModel}
                itemProps={item}
                formProps={props}
              />
            ))}
          </Row>
        );
      })}
    </AForm>
  );
});

export default Form;
