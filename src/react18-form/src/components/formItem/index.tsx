import {
  IFormPorps,
  TFormItemProps,
  isComponentFormItemProps,
  isRenderFormItemProps,
} from "../../types";
import { componentMap } from "../../components";
import { Col, Form } from "antd";
import style from "./index.module.less";
import React from "react";

const FormItem: React.FC<{
  formProps: IFormPorps;
  itemProps: TFormItemProps;
  model: any;
}> = ({ formProps, itemProps, model }) => {
  const { name, label, show, componentProps, rules } = itemProps;
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
    <Col className={show ? "" : style["form-item-hidden"]}>
      <Form.Item name={name} label={label} rules={rules}>
        {renderContent()}
      </Form.Item>
    </Col>
  );
};

export default FormItem;
