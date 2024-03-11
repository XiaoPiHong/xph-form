import { Recordable, TFormItemProps } from "../types";
import { isObject, set, get } from "lodash-es";
import { dateComponents } from "../helper";
import { isComponentFormItemProps } from "../types";

function tryConstructArray(
  field: string,
  values: Recordable<any> = {}
): any[] | undefined {
  const pattern = /^\[(.+)\]$/;
  if (pattern.test(field)) {
    const match = field.match(pattern);
    if (match && match[1]) {
      const keys = match[1].split(",");
      if (!keys.length) {
        return undefined;
      }

      const result = [];
      keys.forEach((k, index) => {
        set(result, index, values[k.trim()]);
      });

      return result.filter(Boolean).length ? result : undefined;
    }
  }
}

function tryConstructObject(
  field: string,
  values: Recordable<any> = {}
): Recordable<any> | undefined {
  const pattern = /^\{(.+)\}$/;
  if (pattern.test(field)) {
    const match = field.match(pattern);
    if (match && match[1]) {
      const keys = match[1].split(",");
      if (!keys.length) {
        return;
      }
      const result = {};
      keys.forEach((k) => {
        set(result, k.trim(), values[k.trim()]);
      });

      return Object.values(result).filter(Boolean).length ? result : undefined;
    }
  }
}

/**
 * @desription deconstruct array-link key. This method will mutate the target.
 */
function tryDeconstructArray(key: string, value: any, target: Recordable<any>) {
  const pattern = /^\[(.+)\]$/;
  if (pattern.test(key)) {
    const match = key.match(pattern);
    if (match && match[1]) {
      const keys = match[1].split(",");
      value = Array.isArray(value) ? value : [value];
      keys.forEach((k, index) => {
        set(target, k.trim(), value[index]);
      });
      return true;
    }
  }
}

/**
 * @desription deconstruct object-link key. This method will mutate the target.
 */
function tryDeconstructObject(
  key: string,
  value: any,
  target: Recordable<any>
) {
  const pattern = /^\{(.+)\}$/;
  if (pattern.test(key)) {
    const match = key.match(pattern);
    if (match && match[1]) {
      const keys = match[1].split(",");
      value = isObject(value) ? value : {};
      keys.forEach((k) => {
        set(target, k.trim(), value[k.trim()]);
      });
      return true;
    }
  }
}

const useFormValues = (formItems: TFormItemProps[]) => {
  const names = formItems.map((item) => item.name).filter(Boolean);

  // key 支持 a.b.c 的嵌套写法
  const delimiter = ".";
  const nestKeyArray = names.filter(
    (item) => String(item).indexOf(delimiter) >= 0
  );

  /** 处理渲染时的值  */
  const handleFormatRenderValues = (values: Recordable<any>) => {
    const renderValues: Recordable<any> = {};

    names.forEach((name) => {
      const curFormItem = formItems.find((formItem) => formItem.name === name);
      let value = get(values, name);
      const hasKey = Reflect.has(values, name);

      const constructValue =
        tryConstructArray(name, values) || tryConstructObject(name, values);
    });
  };

  /** 处理返回的值 */
  const handleFormatReturnValues = (values: Recordable<any>) => {
    if (!isObject(values)) {
      return {};
    }
  };

  return {
    handleFormatRenderValues,
    handleFormatReturnValues,
  };
};
export default useFormValues;
