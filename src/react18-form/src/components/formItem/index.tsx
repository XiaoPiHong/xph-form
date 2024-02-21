import { IFormPorps, TFormItemProps, componentMap } from "@/react18-form";
import { Col, Form } from "antd";
import {
  isComponentFormItemProps,
  isRenderFormItemProps,
} from "@/react18-form";
import style from "./index.module.css";
import React from "react";

function FormItem({
  formProps,
  itemProps,
  model,
}: {
  formProps: IFormPorps;
  itemProps: TFormItemProps;
  model: any;
}) {
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
}

export default FormItem;
