import { TFormItemProps, Recordable } from "./formItem";
import { ColProps } from "antd";
import { NamePath } from "antd/lib/form/interface";
import { TXphExtendComponentPropsMap } from "../common";

export interface IRegister {
  (methods: IFormActionType): void;
}

export interface IFormProps<T extends TXphExtendComponentPropsMap = {}> {
  /**
   * 表单项配置集合
   * @defaultValue `[]`
   */
  items: TFormItemProps<T>[];
  /**
   * 表单布局方式，排除了antd的inline，因为可以使用colProps实现inline布局
   * @defaultValue `"horizontal"`
   */
  layout?: "horizontal" | "vertical";
  /**
   * 表示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效)
   * @defaultValue `false`
   */
  colon?: boolean;
  /**
   * 设置表单组件禁用，仅对 antd 组件有效
   * @defaultValue `-`
   */
  disabled?: boolean;
  /**
   * 表单项组件布局方式(wrapperCol的span与labelCol的span形成24栅格布局)
   * @defaultValue `-`
   */
  wrapperCol?: ColProps;
  /**
   * label 标签的文本换行方式
   * @defaultValue `true`
   */
  labelWrap?: boolean;
  /**
   * label 标签的文本对齐方式
   * @defaultValue `-`
   */
  labelAlign?: "left" | "right";
  /**
   * 表单项label标签布局方式(wrapperCol的span与labelCol的span形成24栅格布局)
   * @defaultValue `-`
   */
  labelCol?: ColProps;
  /**
   * 表单项的栅格配置
   * @defaultValue `-`
   */
  colProps?: ColProps;
  /**
   * 提交失败自动滚动到第一个错误字段
   * @defaultValue `-`
   */
  scrollToFirstError?: boolean;
  /**
   * 设置字段组件的尺寸（仅限 antd 组件）
   * @defaultValue `-`
   */
  size?: "large" | "middle" | "small";
  /**
   * 是否可折叠，默认超过5个折叠
   * @defaultValue `-`
   */
  collapsible?: boolean;
  /**
   * 超过多少进行折叠，collapsible为true才生效
   * @defaultValue `5`
   */
  collapseNum?: number;
  /**
   * 渲染操作组，用于渲染表单项的操作，这是一个预留项，是否需要操作组由业务自己决定（会跟折叠同行显示）
   * @defaultValue `-`
   */
  renderActions?: () => React.ReactElement;
  /**
   * 时间返回统一处理函数
   * @defaultValue `(date: any, format: string) => { return date?.format?.(format \|\| "YYYY-MM-DD HH:mm:ss") ?? date }`
   */
  transformDateFunc?: (date: any, format: string) => string;
  /**
   * 用于将表单内时间区域的应设成 2 个字段
   * @defaultValue `-`
   * @example
   * 场景：如果表单内有时间区间组件，获取到的值是一个数组，但是往往我们传递到后台需要是 2 个字段
   * fieldMapToTime: [
   *    // data为时间组件在表单内的字段，startTime，endTime为转化后的开始时间与结束时间
   *    // 'YYYY-MM-DD'为时间格式，参考moment
   *    ['datetime', ['startTime', 'endTime'], 'YYYY-MM-DD'],
   *    // 支持多个字段
   *    ['datetime1', ['startTime1', 'endTime1'], 'YYYY-MM-DD HH:mm:ss'],
   * ]
   *
   * // fieldMapToTime没写的时候表单获取到的值
   * {
   *   datetime: [Date(),Date()]
   * }
   *
   * //  ['datetime', ['startTime', 'endTime'], 'YYYY-MM-DD'],等同于 dayjs(Date()).format('YYYY-MM-DD'). 之后
   * {
   *     startTime: '2020-08-12',
   *     endTime: '2020-08-15',
   * }
   *
   * // ['datetime', ['startTime', 'endTime'], 'timestamp'],等同于 dayjs(Date()).unix(). 之后
   * {
   *     startTime: 1597190400,
   *     endTime: 1597449600,
   * }
   *
   * // ['datetime', ['startTime', 'endTime'], 'timestampStartDay'],等同于 dayjs(Date()).startOf('day').unix(). 之后
   * {
   *     startTime: 1597190400,
   *     endTime: 1597449600,
   * }
   */

  fieldMapToTime?: [string, [string, string], (string | [string, string])?][];
  /**
   * 注册事件（useForm使用，form组件会在挂载后调用）
   * @defaultValue `-`
   */
  register?: IRegister;
}

export interface IFormActionType {
  /**
   * 获取表单值
   */
  getFieldsValue: (...values) => Recordable<any>;
  /**
   * 设置表单值
   */
  setFieldsValue: (values: Recordable<any>) => void;
  /**
   * 重置表单值
   */
  resetFields: () => Promise<void>;
  /**
   * 表单校验
   */
  validator: (nameList?: NamePath[]) => Promise<any>;
  /**
   * 滚动到指定字段
   */
  scrollToField: (name: NamePath, options?: ScrollOptions) => Promise<void>;
}
