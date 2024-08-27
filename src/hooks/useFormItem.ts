import { useRef, useState, RefObject, useEffect } from "react";
import {
  IFormProps,
  TFormItemProps,
  isComponentFormItemProps,
  Recordable,
} from "../types";
import { isBoolean, isFunction, isNull, isEqual, isNil } from "lodash-es";
import { setComponentRuleType, createPlaceholderMessage } from "../helper";
import { RuleObject } from "antd/es/form";
import { ColProps } from "antd";

export const useFormItemShow = (
  item: TFormItemProps,
  model: any,
  collapseRef: RefObject<any>
) => {
  /**
   * useRef存储上一次的结果，如果开启了折叠状态，表单项由于联动数量发生了变化，需自动展开整个表单项
   */
  const lastIsShow = useRef<boolean | null>(null);
  const lastIsIfShow = useRef<boolean | null>(null);

  const { handleCollapseChangeFalse } = collapseRef.current || {};

  const { show, ifShow } = item;
  let isShow = true;
  let isIfShow = true;
  if (isBoolean(show)) {
    isShow = show;
  }
  if (isBoolean(ifShow)) {
    isIfShow = ifShow;
  }
  if (isFunction(show)) {
    isShow = show({ model });
    const lastIsShowTemp = isNil(lastIsShow.current)
      ? isShow
      : lastIsShow.current;
    useEffect(() => {
      if (!isEqual(isShow, lastIsShowTemp)) {
        handleCollapseChangeFalse && handleCollapseChangeFalse();
      }
    }, [model]);
  }
  if (isFunction(ifShow)) {
    isIfShow = ifShow({ model });
    const lastIsIfShowTemp = isNil(lastIsIfShow.current)
      ? isIfShow
      : lastIsIfShow.current;
    useEffect(() => {
      if (!isEqual(isIfShow, lastIsIfShowTemp)) {
        handleCollapseChangeFalse && handleCollapseChangeFalse();
      }
    }, [model]);
  }

  lastIsShow.current = isShow;
  lastIsIfShow.current = isIfShow;
  return { isShow, isIfShow };
};

export const useFormItemCollapse = (formProps: IFormProps, index: number) => {
  const { collapsible, collapseNum } = formProps;
  const [itemCollapse, setItemCollapse] = useState(
    collapsible && index >= (collapseNum as number) ? true : false
  );
  return {
    itemCollapse,
    setItemCollapse,
  };
};

export const useFormItemRules = ({
  item,
  model,
  isShow,
  componentProps,
}: {
  item: TFormItemProps;
  model: any;
  isShow: boolean;
  componentProps: Recordable<any>;
}) => {
  const { rules: defRules = [], label, required } = item;

  let rules = defRules as RuleObject[];

  const isComponent = isComponentFormItemProps(item);

  const defaultMsg = isComponent
    ? createPlaceholderMessage(item.component) + label
    : "";

  function validator(rule: any, value: any) {
    const msg = rule.message || defaultMsg;
    if (value === undefined || isNull(value)) {
      // 空值
      return Promise.reject(msg);
    } else if (Array.isArray(value) && value.length === 0) {
      // 数组类型
      return Promise.reject(msg);
    } else if (typeof value === "string" && value.trim() === "") {
      // 空字符串
      return Promise.reject(msg);
    } else if (
      typeof value === "object" &&
      Reflect.has(value, "checked") &&
      Reflect.has(value, "halfChecked") &&
      Array.isArray(value.checked) &&
      Array.isArray(value.halfChecked) &&
      value.checked.length === 0 &&
      value.halfChecked.length === 0
    ) {
      // 非关联选择的tree组件
      return Promise.reject(msg);
    }
    return Promise.resolve();
  }

  const getRequired = isFunction(required) ? required({ model }) : required;

  /*
   * 1、若设置了required属性，又没有其他的rules，就创建一个验证规则；
   * 2、若设置了required属性，又存在其他的rules，则只rules中不存在required属性时，才添加验证required的规则
   *     也就是说rules中的required，优先级大于required
   */
  if (getRequired) {
    if (!rules || rules.length === 0) {
      rules = [{ required: getRequired, validator }];
    } else {
      const requiredIndex: number = rules.findIndex((rule) =>
        Reflect.has(rule, "required")
      );

      if (requiredIndex === -1) {
        rules.push({ required: getRequired, validator });
      }
    }
  }

  const requiredRuleIndex: number = rules.findIndex(
    (rule) => Reflect.has(rule, "required") && !Reflect.has(rule, "validator")
  );

  if (requiredRuleIndex !== -1) {
    const rule = rules[requiredRuleIndex];
    if (!isShow) {
      rule.required = false;
    }
    if (isComponent) {
      const { component } = item;
      if (!Reflect.has(rule, "type")) {
        rule.type = component === "InputNumber" ? "number" : "string";
      }

      rule.message = rule.message || defaultMsg;

      if (component.includes("Input") || component.includes("Textarea")) {
        rule.whitespace = true;
      }
      const valueFormat = componentProps.valueFormat;
      setComponentRuleType(rule, component, valueFormat);
    }
  }

  // Maximum input length rule check
  const characterInx = rules.findIndex((val) => val.max);
  if (characterInx !== -1 && !rules[characterInx].validator) {
    rules[characterInx].message =
      rules[characterInx].message || `字符数应小于${rules[characterInx].max}位`;
  }
  return {
    rules,
  };
};

export const useFormItemDisabled = (
  formProps: IFormProps,
  item: TFormItemProps,
  model: any
) => {
  /** item中的优先级比form中的高 */
  const { disabled: formDisabled } = formProps;

  let _disabled = false;
  const { disabled } = item;
  if (isFunction(disabled)) {
    _disabled = disabled({ model });
  }
  if (isBoolean(disabled)) {
    _disabled = disabled;
  }

  return {
    disabled: Reflect.has(item, "disabled") ? _disabled : formDisabled,
  };
};

export const useFormItemComponentProps = (item: TFormItemProps, model: any) => {
  const props: Recordable<any> = {};
  const { componentProps = {} } = item;
  if (isFunction(componentProps)) {
    Object.assign(props, componentProps({ model }));
  }
  Object.assign(props, componentProps);
  return {
    componentProps: props,
  };
};

export const useFormItemColProps = (
  itemProps: TFormItemProps,
  formProps: IFormProps
) => {
  const { colProps: itemColProps = {} } = itemProps;
  /** 默认占一行 */
  const { colProps: formColProps = { span: 24 } } = formProps;
  const colProps: ColProps = { ...formColProps, ...itemColProps };
  return { colProps };
};

const useFormItem = ({ formProps }: { formProps: IFormProps }) => {
  const { items } = formProps;
  const formItems: TFormItemProps[] = items.map((item) => {
    return { ...item };
  });
  return { formItems };
};

export default useFormItem;
