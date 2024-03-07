import {
  SelectProps,
  InputProps,
  InputNumberProps,
  TreeSelectProps,
  TransferProps,
  SwitchProps,
  ButtonProps,
  RadioProps,
  CheckboxProps,
  CascaderProps,
  TimePickerProps,
  DatePickerProps,
  AutoCompleteProps,
} from "antd";

export type TComponentPropsMap = {
  Select: SelectProps;
  Input: InputProps;
  InputNumber: InputNumberProps;
  TreeSelect: TreeSelectProps;
  Transfer: TransferProps;
  Switch: SwitchProps;
  Button: ButtonProps;
  Radio: RadioProps;
  RadioGroup: RadioProps;
  Checkbox: CheckboxProps;
  CheckboxGroup: CheckboxProps;
  Cascader: CascaderProps;
  TimePicker: TimePickerProps;
  DatePicker: DatePickerProps;
  MonthPicker: DatePickerProps;
  WeekPicker: DatePickerProps;
  RangePicker: DatePickerProps;
  InputPassword: InputProps;
  InputTextArea: InputProps;
  AutoComplete: AutoCompleteProps;
};
