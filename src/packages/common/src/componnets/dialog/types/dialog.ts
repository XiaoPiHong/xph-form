export interface IDialogProps {
  visible?: boolean;
  title?: string;
  content?: string;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
}
