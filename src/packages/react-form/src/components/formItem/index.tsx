import {
  IFormPorps,
  TFormItemProps,
  isComponentFormItemProps,
  isRenderFormItemProps,
} from "../../types";
import { componentMap } from "../../components";
import { Form, Col } from "antd";
import style from "./index.module.css";
import React from "react";
import { useFormItemBindProps } from "../../hooks";

const FormItem: React.FC<{
  formProps: IFormPorps;
  itemProps: TFormItemProps;
  model: any;
}> = ({ formProps, itemProps, model }) => {
  const {
    name,
    show,
    componentProps,
    dynamicDisabled: disabled,
    colProps,
  } = itemProps;
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
    <Col {...colProps} className={show ? "" : style["form-item-hidden"]}>
      <Form.Item {...formItemBindProps}>{renderContent()}</Form.Item>
    </Col>
  );
};

export default FormItem;
