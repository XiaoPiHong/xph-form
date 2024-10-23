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
  useFormItemCollapse,
  useExtendForm,
} from "../../hooks";
import { componentMap } from "..";
import { Form, Col } from "antd";
import style from "./index.module.css";
import { forwardRef, useImperativeHandle, Fragment, RefObject } from "react";

const FormItem = forwardRef(
  (
    {
      itemIndex,
      itemProps,
      methods,
      formProps,
      collapseRef,
    }: {
      itemIndex: number;
      itemProps: TFormItemProps;
      methods: IFormActionType;
      formProps: IFormProps;
      collapseRef: RefObject<any>;
    },
    ref
  ) => {
    console.log("render FormItem", itemProps.name);
    const { rewritingModel, isusewatch } = useFormModel(formProps, itemProps);
    const { isIfShow, isShow } = useFormItemShow(
      itemProps,
      rewritingModel,
      collapseRef
    );
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
    const { itemCollapse, setItemCollapse } = useFormItemCollapse(
      formProps,
      itemIndex
    );
    const {
      name,
      label,
      wrapperCol,
      labelCol,
      valuePropName,
      initialValue,
      forceRow,
    } = itemProps;

    /** 有些配置项是函数，需要等FormItem渲染完后获取，提供给父组件使用 */
    useImperativeHandle(ref, () => ({
      itemIndex,
      componentProps,
      itemCollapse,
      setItemCollapse,
    }));

    /**
     * @description 用于绑定给formItem的属性
     * 后续绑定给formItem的属性需在这里扩展一下
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

    /** 扩展一下用户自定义的表单项 */
    const { setExtendFormComp } = useExtendForm();
    setExtendFormComp(componentMap);

    const isComponent = isComponentFormItemProps(itemProps);
    const isRender = isRenderFormItemProps(itemProps);

    const renderContent = () => {
      if (isComponent) {
        const Component = componentMap.get(itemProps.component)!;
        return (
          <Component
            {...componentProps}
            disabled={disabled}
            /** 这个值是用来判断当前项是否开启了useWatch监听 */
            isusewatch={isusewatch.toString()}
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
        } as IFRenderProps);
      }
      return null;
    };

    return (
      <Fragment>
        {forceRow ? <div className={style["form-item-force"]}></div> : null}

        {isIfShow ? (
          <Col
            {...colProps}
            className={
              isShow && !itemCollapse ? void 0 : style["form-item-hidden"]
            }
          >
            <Form.Item {...getFormItemBindProps()}>{renderContent()}</Form.Item>
          </Col>
        ) : null}
      </Fragment>
    );
  }
);

export default FormItem;
