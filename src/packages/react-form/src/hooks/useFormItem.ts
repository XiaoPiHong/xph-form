import {
  IFormProps,
  TFormItemProps,
  isComponentFormItemProps,
  Recordable,
} from "../types";
import { isBoolean, isFunction, isNull, cloneDeep } from "lodash-es";
import { setComponentRuleType, createPlaceholderMessage } from "../helper";
import { RuleObject } from "antd/es/form";
import { ColProps } from "antd";

export const useFormItemShow = (item: TFormItemProps, model: any) => {
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
  }
  if (isFunction(ifShow)) {
    isIfShow = ifShow({ model });
  }
  return { isShow, isIfShow };
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

  let rules = cloneDeep(defRules) as RuleObject[];

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
  let props: Recordable<any> = {};
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

const useFormItem = ({ props, model }: { props: IFormProps; model: any }) => {
  const { items } = props;
  const formItems: TFormItemProps[] = items
    .map((item) => {
      const { isIfShow, isShow } = useFormItemShow(item, model);
      const { colProps } = useFormItemColProps(item, props);
      const { componentProps } = useFormItemComponentProps(item, model);
      const { rules } = useFormItemRules({
        item,
        model,
        isShow,
        componentProps,
      });
      const { disabled } = useFormItemDisabled(props, item, model);
      return {
        ...item,
        show: isShow,
        ifShow: isIfShow,
        rules,
        disabled,
        componentProps,
        colProps,
      };
    })
    .filter((item) => item.ifShow); /** 过滤出要渲染的项 */
  return {
    formItems,
  };
};

export default useFormItem;
