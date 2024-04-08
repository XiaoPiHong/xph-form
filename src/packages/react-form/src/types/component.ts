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
  UploadProps,
} from "antd";
import { IApiSelectProps } from "../components/ApiSelect";
import { IApiTreeSelectProps } from "../components/ApiTreeSelect";
import { IApiTransferProps } from "../components/ApiTransfer";
import { IApiAutoCompleteProps } from "../components/ApiAutoComplete";
import { IAutoUploadProps } from "../components/AutoUpload";

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
  Upload: UploadProps;
  ApiSelect: IApiSelectProps;
  ApiTreeSelect: IApiTreeSelectProps;
  ApiTransfer: IApiTransferProps;
  ApiAutoComplete: IApiAutoCompleteProps;
  AutoUpload: IAutoUploadProps;
};
