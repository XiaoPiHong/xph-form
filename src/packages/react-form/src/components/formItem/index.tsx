import {
  IFormPorps,
  TFormItemProps,
  isComponentFormItemProps,
  isRenderFormItemProps,
} from "../../types";
import { componentMap } from "../../components";
import { Form } from "antd";
import style from "./index.module.css";
import React from "react";

const useFormItemBindProps = (props: TFormItemProps) => {
  const { name, label, rules, wrapperCol, labelCol } = props;
  const formItemBindProps = { name, label, rules, wrapperCol, labelCol };
  return { formItemBindProps };
};

const FormItem: React.FC<{
  formProps: IFormPorps;
  itemProps: TFormItemProps;
  model: any;
}> = ({ formProps, itemProps, model }) => {
  const { name, show, componentProps, dynamicDisabled: disabled } = itemProps;

  const { formItemBindProps } = useFormItemBindProps(itemProps);

  const isComponent = isComponentFormItemProps(itemProps);
  const isRender = isRenderFormItemProps(itemProps);

  const renderContent = () => {
    if (isComponent) {
      const Component = componentMap.get(itemProps.component)!;
      return <Component {...componentProps} disabled={disabled} />;
    }
    if (isRender) {
      return itemProps.render({ model, name, disabled });
    }
    return null;
  };
  return (
    <Form.Item
      {...formItemBindProps}
      className={show ? "" : style["form-item-hidden"]}
    >
      {renderContent()}
    </Form.Item>
  );
};

export default FormItem;
