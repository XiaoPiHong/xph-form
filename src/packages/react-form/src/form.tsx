import { Form as AForm, Row } from "antd";
import { IFormPorps } from "./types";
import { useFormItem } from "./hooks";
import FormItem from "./components/formItem";
import React from "react";
import { useFormModel, useFormBindProps } from "./hooks";

const Form: React.FC<IFormPorps> = (props) => {
  const [formInstance] = AForm.useForm();
  const { rewritingModel } = useFormModel(formInstance);
  const { formItems } = useFormItem({ props, model: rewritingModel });
  const { formBindProps } = useFormBindProps(props);

  return (
    <AForm form={formInstance} {...formBindProps}>
      <Row>
        {formItems.map((item, index) => (
          <FormItem
            key={index}
            model={rewritingModel}
            itemProps={item}
            formProps={props}
          />
        ))}
      </Row>
    </AForm>
  );
};

export default Form;
