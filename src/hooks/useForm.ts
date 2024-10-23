import { Form } from "antd";
import { useMemo, useEffect, useRef } from "react";
import { isNeedWatchModel } from "../helper";
import {
  IFormProps,
  IFormActionType,
  IRegister,
  TFormItemProps,
} from "../types";

/**
 * 注意：
 * useWatch会监听整个表单值得变化，导致重新渲染formItem，所以要根据实际情况来判断到底是否需要监听表单得值，
 * 何时需要监听：只有使用model的formItem属性才需要监听，即当show、ifShow、required、disabled、componentProps、render有其中之一为函数时才需要监听
 * 所以当没有使用model的表单项尽量使用值写法，使用函数写法对表单性能开销很大
 */
export const useFormModel = (
  formProps: IFormProps,
  itemProps: TFormItemProps
) => {
  const defineFunction = (obj: any) => {
    Object.keys(obj).forEach((key) => {
      Object.defineProperty(obj, key, {
        value: obj[key], // 保留原始值
        writable: false, // 设置为不可写
        enumerable: true, // 可枚举
        configurable: false, // 可配置
      });
    });
    return obj;
  };

  const baseValues: any = {};
  formProps.items.forEach((item) => {
    baseValues[item.name] = item.initialValue;
  });
  /** 响应式数据源，只要使用了useWatch监听所有项时，都会触发重新渲染，因为其返回的是一个state，且首次是undefined
   *
   * 所以使用了Form.useWatch的FormItem，至少都会触发两次组件更新
   */
  const flag = isNeedWatchModel(itemProps);
  const realModel = flag
    ? Form.useWatch((values) => defineFunction(values))
    : null;

  /** 重写model */
  const rewritingModel = useMemo(() => {
    return realModel || defineFunction(baseValues);
  }, [realModel]);
  // console.log("使用了useFormModel", JSON.stringify(rewritingModel));
  return {
    rewritingModel,
    isusewatch: flag,
  };
};

/**
 *
 * @description 用于注册form的方法
 * form组件会先于parent组件挂载，挂载完后调用register方法，将methods注册到useForm中给parent使用
 *
 */
const useForm = (): [IRegister, IFormActionType] => {
  // console.log("ParentComponent render=========================================");
  const methods = useRef<IFormActionType | null>(null);

  function register(mets: IFormActionType) {
    methods.current = mets;
  }

  /** 重新声明一个obj存储是防止parent在初始化的时候使用useForm解构报错问题 */
  /** 如果在初始化完成前使用了api会抛出错误提示 */
  const _methods: IFormActionType = {
    getFieldsValue: (...args) => {
      if (!methods.current) {
        throw new Error("表单还没初始化完成");
      }
      return methods.current.getFieldsValue(...args);
    },
    setFieldsValue: (...args) => {
      if (!methods.current) {
        throw new Error("表单还没初始化完成");
      }
      return methods.current.setFieldsValue(...args);
    },
    resetFields: (...args) => {
      if (!methods.current) {
        throw new Error("表单还没初始化完成");
      }
      return methods.current.resetFields(...args);
    },
    validator: (...args) => {
      if (!methods.current) {
        throw new Error("表单还没初始化完成");
      }
      return methods.current.validator(...args);
    },
    scrollToField: (...args) => {
      if (!methods.current) {
        throw new Error("表单还没初始化完成");
      }
      return methods.current.scrollToField(...args);
    },
  };

  useEffect(() => {
    console.log(
      "ParentComponent is mounted====================================="
    );
    return () => {
      console.log(
        "ParentComponent is unmounted===================================="
      );
      methods.current = null;
    };
  }, []);

  return [register, _methods];
};

export default useForm;
