import { TActionItemProps } from "./actionItem";

export interface IActionsProps {
  /** 类型 */
  type?: "link" | "default";
  /** 操作项 */
  items?: TActionItemProps[];
  /** 禁用 */
  disabled?: boolean;
  /** 自定义渲染函数（render的优先级高于items） */
  render?: () => React.ReactElement;
}
