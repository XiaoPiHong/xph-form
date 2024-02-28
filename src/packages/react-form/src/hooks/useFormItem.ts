import { IFormPorps, TFormItemProps, isComponentFormItemProps } from "../types";
import { isBoolean, isFunction, isNull, cloneDeep } from "lodash-es";
import { setComponentRuleType, createPlaceholderMessage } from "../helper";
import { RuleObject } from "antd/es/form";

function useFormItemShow(item: TFormItemProps, model: any) {
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
}

function useFormItemRules(item: TFormItemProps, model: any, show: boolean) {
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
    if (!show) {
      rule.required = false;
    }
    if (isComponent) {
      const { component, componentProps = {} } = item;
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
}

export default function ({ props, model }: { props: IFormPorps; model: any }) {
  const { items } = props;
  const formItems = items
    .map((item) => {
      const { isIfShow, isShow } = useFormItemShow(item, model);
      const { rules } = useFormItemRules(item, model, isShow);
      return {
        ...item,
        show: isShow,
        ifShow: isIfShow,
        rules,
      };
    })
    .filter((item) => item.ifShow); /** 过滤出要渲染的项 */
  return {
    formItems,
  };
}
