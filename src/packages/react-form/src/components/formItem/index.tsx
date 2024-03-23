import {
  IFormProps,
  TFormItemProps,
  isComponentFormItemProps,
  isRenderFormItemProps,
  IFormActionType,
  IFRenderProps,
} from "../../types";
import {
  useFormModel,
  useFormItemShow,
  useFormItemColProps,
  useFormItemComponentProps,
  useFormItemRules,
  useFormItemDisabled,
} from "../../hooks";
import { componentMap } from "..";
import { Form, Col } from "antd";
import style from "./index.module.css";
import React from "react";

const FormItem: React.FC<{
  formProps: IFormProps;
  itemProps: TFormItemProps;
  methods: IFormActionType;
  firstrendered: Boolean;
}> = ({ formProps, itemProps, methods, firstrendered }) => {
  console.log("render FormItem");
  const { rewritingModel } = useFormModel();
  const { isIfShow, isShow } = useFormItemShow(itemProps, rewritingModel);
  const { colProps } = useFormItemColProps(itemProps, formProps);
  const { componentProps } = useFormItemComponentProps(
    itemProps,
    rewritingModel
  );
  const { rules } = useFormItemRules({
    item: itemProps,
    model: rewritingModel,
    isShow,
    componentProps,
  });
  const { disabled } = useFormItemDisabled(
    formProps,
    itemProps,
    rewritingModel
  );
  const { name, label, wrapperCol, labelCol, valuePropName, initialValue } =
    itemProps;

  /**
   * @description 用于绑定给formItem的属性
   * @description 后续绑定给formItem的属性需在这里扩展一下
   */
  const getFormItemBindProps = () => {
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
      return (
        <Component
          {...componentProps}
          disabled={disabled}
          firstrendered={firstrendered}
        />
      );
    }
    if (isRender) {
      return itemProps.render({
        model: rewritingModel,
        name,
        disabled,
        methods,
        componentProps,
        firstrendered,
      } as IFRenderProps);
    }
    return null;
  };
  return isIfShow ? (
    <Col {...colProps} className={isShow ? "" : style["form-item-hidden"]}>
      <Form.Item {...getFormItemBindProps()}>{renderContent()}</Form.Item>
    </Col>
  ) : null;
};

export default FormItem;
