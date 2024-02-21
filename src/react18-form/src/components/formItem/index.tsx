import {
  IFormPorps,
  TFormItemProps,
  IComponentFormItemProps,
  IRenderFormItemProps,
  componentMap,
} from "@/react18-form";
import { Col, Form } from "antd";
import style from "./index.module.css";
import React from "react";

function isComponentFormItemProps(
  item: TFormItemProps
): item is IComponentFormItemProps {
  return "component" in item;
}

function isRenderFormItemProps(
  item: TFormItemProps
): item is IRenderFormItemProps {
  return "render" in item;
}

function FormItem({
  formProps,
  itemProps,
  model,
}: {
  formProps: IFormPorps;
  itemProps: TFormItemProps;
  model: any;
}) {
  const { name, label, show, componentProps } = itemProps;
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
      <Form.Item name={name} label={label}>
        {renderContent()}
      </Form.Item>
    </Col>
  );
}

export default FormItem;
