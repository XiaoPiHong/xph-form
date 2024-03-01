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

const FormItem: React.FC<{
  formProps: IFormPorps;
  itemProps: TFormItemProps;
  model: any;
}> = ({ formProps, itemProps, model }) => {
  const { name, label, show, componentProps, rules, wrapperCol } = itemProps;
  const isComponent = isComponentFormItemProps(itemProps);
  const isRender = isRenderFormItemProps(itemProps);

  const renderContent = () => {
    if (isComponent) {
      const Component = componentMap.get(itemProps.component)!;
      return <Component {...componentProps} />;
    }
    if (isRender) {
      return itemProps.render({ model, name });
    }
    return null;
  };
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      className={show ? "" : style["form-item-hidden"]}
    >
      {renderContent()}
    </Form.Item>
  );
};

export default FormItem;
