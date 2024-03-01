import { Form as AForm, FormInstance } from "antd";
import { IFormPorps } from "./types";
import { useFormItem } from "./hooks";
import FormItem from "./components/formItem";
import React, { useMemo } from "react";

const useFormModel = (instance: FormInstance<any>) => {
  /** 响应式数据源 */
  const realModel = AForm.useWatch((values) => values, instance);

  /** 重写model */
  const rewritingModel = useMemo(() => {
    return realModel || {};
  }, [realModel]);

  return {
    realModel,
    rewritingModel,
  };
};

const useFormBindProps = (props: IFormPorps) => {
  const { layout, wrapperCol, labelCol } = props;
  const formBindProps = { layout, wrapperCol, labelCol };

  return {
    formBindProps,
  };
};

const Form: React.FC<IFormPorps> = (props) => {
  const [formInstance] = AForm.useForm();
  const { rewritingModel } = useFormModel(formInstance);
  const { formItems } = useFormItem({ props, model: rewritingModel });
  const { formBindProps } = useFormBindProps(props);

  return (
    <AForm form={formInstance} {...formBindProps}>
      {formItems.map((item, index) => (
        <FormItem
          key={index}
          model={rewritingModel}
          itemProps={item}
          formProps={props}
        />
      ))}
    </AForm>
  );
};

export default Form;
