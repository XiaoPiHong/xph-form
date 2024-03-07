import {
  IFormProps,
  TFormItemProps,
  isComponentFormItemProps,
  isRenderFormItemProps,
  IFormActionType,
  IFRenderProps,
} from "../../types";
import { componentMap } from "../../components";
import { Form, Col } from "antd";
import style from "./index.module.css";
import React from "react";

const FormItem: React.FC<{
  formProps: IFormProps;
  itemProps: TFormItemProps;
  model: any;
  methods: IFormActionType;
}> = ({ itemProps, model, methods }) => {
  const { name, show, componentProps, disabled, colProps } = itemProps;

  /**
   * @description 用于绑定给formItemd的属性
   * @description 后续绑定给formItem的属性需在这里扩展一下
   */
  const getFormItemBindProps = () => {
    const {
      name,
      label,
      rules,
      wrapperCol,
      labelCol,
      valuePropName,
      initialValue,
    } = itemProps;
    return {
      name,
      label,
      rules,
      wrapperCol,
      labelCol,
      valuePropName,
      initialValue,
    };
  };

  const isComponent = isComponentFormItemProps(itemProps);
  const isRender = isRenderFormItemProps(itemProps);

  const renderContent = () => {
    if (isComponent) {
      const Component = componentMap.get(itemProps.component)!;
      return <Component {...componentProps} disabled={disabled} />;
    }
    if (isRender) {
      return itemProps.render({
        model,
        name,
        disabled,
        methods,
      } as IFRenderProps);
    }
    return null;
  };
  return (
    <Col {...colProps} className={show ? "" : style["form-item-hidden"]}>
      <Form.Item {...getFormItemBindProps()}>{renderContent()}</Form.Item>
    </Col>
  );
};

export default FormItem;
