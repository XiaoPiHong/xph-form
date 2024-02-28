import { Form as AForm, Row } from "antd";
import { IFormPorps } from "./types";
import { useFormItem } from "./hooks";
import FormItem from "./components/formItem";
import React, { useMemo } from "react";

const Form: React.FC<IFormPorps> = (props) => {
  const [formInstance] = AForm.useForm();
  /** 响应式数据源 */
  const realModel = AForm.useWatch((values) => values, formInstance);

  /** 重写model */
  const rewritingModel = useMemo(() => {
    return realModel || {};
  }, [realModel]);

  const { formItems } = useFormItem({ props, model: rewritingModel });
  return (
    <AForm form={formInstance}>
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
