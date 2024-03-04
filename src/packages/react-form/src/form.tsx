import { Form as AForm, Row } from "antd";
import { IFormPorps } from "./types";
import FormItem from "./components/formItem";
import React from "react";
import {
  useFormModel,
  useFormBindProps,
  useFormItem,
  useFormRow,
} from "./hooks";

const Form: React.FC<IFormPorps> = (props) => {
  const [formInstance] = AForm.useForm();
  const { rewritingModel } = useFormModel(formInstance);
  const { formItems } = useFormItem({ props, model: rewritingModel });
  const { formBindProps } = useFormBindProps(props);
  const { formItemRows } = useFormRow(formItems);
  return (
    <AForm form={formInstance} {...formBindProps}>
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
