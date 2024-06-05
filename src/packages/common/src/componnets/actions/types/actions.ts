import { TActionItemProps } from "./actionItem";

export interface IActionsProps {
  /** 操作项 */
  items?: TActionItemProps[];
  /** 禁用 */
  disabled?: boolean;
}
