import { TFormItemProps } from "./formItem";
import { ColProps } from "antd";

export interface IFormPorps {
  items: TFormItemProps[] /** 表单项配置集合 */;
  /**
   * @description 表单布局方式（默认horizontal）
   * @description 排除了antd的inline，因为可以使用colProps实现inline布局
   */
  layout?: "horizontal" | "vertical";
  /** 表单项组件布局方式(wrapperCol的span与labelCol的span形成24栅格布局) */
  wrapperCol?: ColProps;
  /** 表单项label标签布局方式(wrapperCol的span与labelCol的span形成24栅格布局) */
  labelCol?: ColProps;
  /** 表单项的栅格配置 */
  colProps?: ColProps;
}
