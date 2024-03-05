import { Form as AForm, Row } from "antd";
import { IFormPorps } from "./types";
import FormItem from "./components/formItem";
import React from "react";
import { useFormModel, useFormItem, useFormRow } from "./hooks";

const Form: React.FC<IFormPorps> = (props) => {
  const [formInstance] = AForm.useForm();
  const { rewritingModel } = useFormModel(formInstance);
  const { formItems } = useFormItem({ props, model: rewritingModel });
  const { formItemRows } = useFormRow(formItems);

  /**
   * @description 用于绑定给form的属性
   * @description 后续绑定给form的属性需在这里扩展一下
   */
  const getFormBindProps = () => {
    const { layout, wrapperCol, labelCol } = props;
    return { layout, wrapperCol, labelCol };
  };

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
};

export default Form;
