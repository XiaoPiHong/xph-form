import { TActionItemProps } from "./actionItem";
import { ButtonProps } from "antd/lib/button";

export interface IActionsProps {
  /** 类型 */
  type?: ButtonProps["type"];
  /** 操作项 */
  items?: TActionItemProps[];
  /** 禁用（items中的componentProps的disabled优先级最高） */
  disabled?: boolean;
  /** 自定义内容（items的优先级高于render） */
  render?: React.ReactElement;
}
