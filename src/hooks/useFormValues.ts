import { RefObject } from "react";
import { IFormProps, Recordable, TFormItemProps } from "../types";
import { isObject, isArray, isFunction, isString, set } from "lodash-es";
import dayjs from "dayjs";
import { dateComponents } from "../helper";
import { isComponentFormItemProps, isRenderFormItemProps } from "../types";

/**
 * @description 构建值数组
 * @param field `[key1, key2, key3]`
 * @param values = { key1: 'value1', key2: 'value2', key3: 'value3' }
 * @returns ['value1', 'value2', 'value3']
 */
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

/**
 * @description 构建值对象
 * @param field '{key1, key2, key3}'
 * @param values = { key1: 'value1', key2: 'value2', key3: 'value3' }
 * @returns = { key1: 'value1', key2: 'value2', key3: 'value3' }
 *
 */
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

/**
 * @description: Processing time interval parameters
 */
function handleRangeTimeValue(values: Recordable<any>, formProps: IFormProps) {
  const fieldMapToTime = formProps.fieldMapToTime;

  if (!fieldMapToTime || !Array.isArray(fieldMapToTime)) {
    return values;
  }

  for (const [
    field,
    [startTimeKey, endTimeKey],
    format = "YYYY-MM-DD",
  ] of fieldMapToTime) {
    if (!field || !startTimeKey || !endTimeKey) {
      continue;
    }
    // If the value to be converted is empty, remove the field
    if (!values[field]) {
      Reflect.deleteProperty(values, field);
      continue;
    }

    const [startTime, endTime]: string[] = values[field];

    const [startTimeFormat, endTimeFormat] = Array.isArray(format)
      ? format
      : [format, format];

    values[startTimeKey] = dayjs(startTime).format(startTimeFormat);
    values[endTimeKey] = dayjs(endTime).format(endTimeFormat);
    Reflect.deleteProperty(values, field);
  }

  return values;
}

const useFormValues = (
  formItems: TFormItemProps[],
  formProps: IFormProps,
  formItemRefs: RefObject<Map<string, RefObject<any>>>
) => {
  const allItems = formItems.filter((item) => item.name);

  /** 处理渲染时的值  */
  const handleFormatRenderValues = (values: Recordable<any>) => {
    const renderValues: Recordable<any> = {};
    const validKeys: string[] = [];

    allItems.forEach((item) => {
      const hasKey = Reflect.has(values, item.name);

      // 当前name是`{}` || `[]`嵌套写法时，获取其值
      const constructValue =
        tryConstructArray(item.name, values) ||
        tryConstructObject(item.name, values);

      // values中有值 || （当前name是`{}` || `[]`嵌套写法时且有值时）
      if (hasKey || !!constructValue) {
        const fieldValue = constructValue || values[item.name];
        if (isComponentFormItemProps(item)) {
          /** 时间类型组件需处理一下 */
          if (dateComponents.includes(item.component)) {
            if (isArray(fieldValue)) {
              const arr: any[] = [];
              for (const ele of fieldValue) {
                arr.push(ele ? dayjs(ele) : null);
              }
              renderValues[item.name] = arr;
            } else {
              renderValues[item.name] = fieldValue ? dayjs(fieldValue) : null;
            }
            validKeys.push(item.name);
          } else {
            renderValues[item.name] = fieldValue;
            validKeys.push(item.name);
          }
        }
        if (isRenderFormItemProps(item)) {
          renderValues[item.name] = fieldValue;
          validKeys.push(item.name);
        }
      }
      // else {
      //   try {
      //     // a.b.c 的嵌套写法
      //     const hasDelimiter = item.name.includes(`.`);
      //     if (hasDelimiter) {
      //       const value = item.name
      //         .split(".")
      //         .reduce((out, key) => out[key], values);
      //       if (typeof value !== "undefined") {
      //         renderValues[item.name] = value;
      //         validKeys.push(item.name);
      //       }
      //     }
      //   } catch (e) {
      //     // key not exist
      //   }
      // }
    });
    return {
      renderValues,
      validKeys,
    };
  };

  /** 处理返回的值 */
  const handleFormatReturnValues = (values: Recordable<any>) => {
    if (!isObject(values)) {
      return {};
    }
    const res: Recordable<any> = {};
    for (const item of Object.entries(values)) {
      let [, value] = item;
      const [key] = item;
      if (!key || isFunction(value)) {
        continue;
      }

      // transformDateFunc是全局时间处理函数，formItem的componentProps中的valueFormat优先级最高
      const { transformDateFunc } = formProps;
      const componentProps =
        formItemRefs.current?.get(key)?.current?.componentProps;
      const valueFormat = componentProps?.valueFormat;

      // 数组也会进来这里
      if (isObject(value)) {
        const objValue: Recordable<any> = value;
        // day类型
        if (objValue.format) {
          value = transformDateFunc?.(objValue, valueFormat);
        }
      }

      if (isArray(value) && value[0]?.format && value[1]?.format) {
        value = value.map((valueItem) =>
          transformDateFunc?.(valueItem, valueFormat)
        );
      }
      // Remove spaces
      if (isString(value)) {
        // remove params from URL
        if (value === "") {
          value = undefined;
        } else {
          value = value.trim();
        }
      }
      // if (
      //   !tryDeconstructArray(key, value, res) &&
      //   !tryDeconstructObject(key, value, res)
      // ) {
      //   // 没有解构成功的，按原样赋值
      //   res[key] = value;
      // }
      res[key] = value;
    }
    return handleRangeTimeValue(res, formProps);
  };

  return {
    handleFormatRenderValues,
    handleFormatReturnValues,
  };
};
export default useFormValues;
