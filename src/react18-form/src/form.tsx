import { Form as AForm, Row } from "antd";
import { IFormPorps } from "./types";
import { useFormItem } from "./hooks";
import FormItem from "./components/formItem";
import React from "react";

const Form: React.FC<IFormPorps> = (props) => {
  const [formInstance] = AForm.useForm();
  /** 响应式数据源 */
  const model = AForm.useWatch((values) => values, formInstance);

  const { formItems } = useFormItem({ props, model });
  return (
    <AForm form={formInstance}>
      <Row>
        {formItems.map((item, index) => (
          <FormItem
            key={index}
            model={model}
            itemProps={item}
            formProps={props}
          />
        ))}
      </Row>
    </AForm>
  );
};

export default Form;
