import { TFormItemProps, Recordable } from "./formItem";
import { ColProps } from "antd";
import { NamePath } from "antd/lib/form/interface";

export interface IRegister {
  (methods: IFormActionType): void;
}

export interface IFormProps {
  items: TFormItemProps[] /** 表单项配置集合 */;
  /**
   * @description 表单布局方式（默认horizontal）
   * @description 排除了antd的inline，因为可以使用colProps实现inline布局
   */
  layout?: "horizontal" | "vertical";
  /** 表示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效) */
  colon?: boolean;
  /** 设置表单组件禁用，仅对 antd 组件有效 */
  disabled?: boolean;
  /** 表单项组件布局方式(wrapperCol的span与labelCol的span形成24栅格布局) */
  wrapperCol?: ColProps;
  /** label 标签的文本换行方式 */
  labelWrap?: boolean;
  /** label 标签的文本对齐方式 */
  labelAlign?: "left" | "right";
  /** 表单项label标签布局方式(wrapperCol的span与labelCol的span形成24栅格布局) */
  labelCol?: ColProps;
  /** 表单项的栅格配置 */
  colProps?: ColProps;
  /** 提交失败自动滚动到第一个错误字段 */
  scrollToFirstError?: boolean;
  /** 设置字段组件的尺寸（仅限 antd 组件） */
  size?: "large" | "middle" | "small";
  /** 注册事件（useForm使用，form组件会在挂载后调用） */
  register?: IRegister;
}

export interface IFormActionType {
  getFieldsValue: (...values) => Recordable<any>;
  setFieldsValue: (values: Recordable<any>) => Promise<void>;
  resetFields: () => Promise<void>;
  validator: (nameList?: NamePath[]) => Promise<any>;
  scrollToField: (name: NamePath, options?: ScrollOptions) => Promise<void>;
}
