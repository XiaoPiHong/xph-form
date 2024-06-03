import { Form as AForm, Row } from "antd";
import { IFormProps, IFormActionType, TRefForm } from "./types";
import FormItem from "./components/FormItem";
import Collapse from "./components/Collapse";
import ActionGroup from "./components/ActionGroup";
import style from "./form.module.css";
import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  Ref,
} from "react";
import {
  useFormProps,
  useFormItem,
  useFormAction,
  useFormValues,
  useFormCollapse,
} from "./hooks";

const Form: TRefForm = forwardRef((props: IFormProps, ref) => {
  console.log("render Form");
  // console.log("Form render=============================");
  const [formInstance] = AForm.useForm();
  const { formProps } = useFormProps(props);
  const { formItems } = useFormItem({ formProps });
  const formItemRefs = useRef<Map<string, Ref>>(new Map());
  const {
    collapsible,
    collapseNum,
    collapseRef,
    onClickCollapseToFalse,
    onClickCollapseToTrue,
  } = useFormCollapse(formProps, formItemRefs);
  const { handleFormatRenderValues, handleFormatReturnValues } = useFormValues(
    formItems,
    formProps,
    formItemRefs
  );
  const {
    setFieldsValue,
    getFieldsValue,
    resetFields,
    validator,
    scrollToField,
  } = useFormAction(
    formInstance,
    handleFormatRenderValues,
    handleFormatReturnValues
  );

  /**
   * @description 用于绑定给form的属性
   * @description 后续绑定给form的属性需在这里扩展一下
   */
  const getFormBindProps = () => {
    const {
      layout,
      wrapperCol,
      labelCol,
      colon,
      disabled,
      labelWrap,
      labelAlign,
      scrollToFirstError,
      size,
    } = formProps;
    return {
      layout,
      wrapperCol,
      labelCol,
      colon,
      disabled,
      labelWrap,
      labelAlign,
      scrollToFirstError,
      size,
    };
  };
  const methods: IFormActionType = {
    setFieldsValue,
    getFieldsValue,
    resetFields,
    validator,
    scrollToField,
  };

  // 使用 useImperativeHandle 暴露指定的属性或方法
  useImperativeHandle(ref, () => ({
    ...methods,
  }));

  useEffect(() => {
    console.log("Form is mounted=======================");
    formProps.register && formProps.register(methods);
    return () => {
      console.log("Form is unmounted=========================");
      formItemRefs.current.clear();
    };
  }, []);

  return (
    <AForm form={formInstance} {...getFormBindProps()}>
      <Row>
        {formItems.map((itemProps, itemPropsIndex) => {
          // 在Map中为每个项目创建一个新的ref
          if (!formItemRefs.current.has(itemProps.name)) {
            formItemRefs.current.set(itemProps.name, React.createRef());
          }
          return (
            <FormItem
              ref={formItemRefs.current.get(itemProps.name)}
              key={itemPropsIndex}
              itemIndex={itemPropsIndex}
              itemProps={itemProps}
              formProps={formProps}
              methods={methods}
              collapseRef={collapseRef}
            />
          );
        })}
      </Row>
      {/** 操作行 */}
      <div className={style["xph-form-action"]}>
        {/**操作组 */}
        <ActionGroup formProps={formProps} />
        {/* 折叠面板 */}
        {collapsible ? (
          <Collapse
            ref={collapseRef}
            collapsible={formItems.length > collapseNum}
            onClickExpand={onClickCollapseToFalse}
            onClickFold={onClickCollapseToTrue}
          />
        ) : null}
      </div>
    </AForm>
  );
});

export default Form;
