/** 这个是react-form表单项目启动入口文件 */
import React from "react";
import ReactForm from "./form";
import { IFormProps, IFormActionType } from "./types";
import ReactDOM from "react-dom/client";
import { InputNumber } from "antd";
import { useForm } from "./hooks";

const ReactApp: React.FC = () => {
  const props: IFormProps = {
    items: [
      {
        name: "Input",
        label: "Input",
        component: "Input",
        required: true,
        colProps: { span: 6 },
        initialValue: "Input",
      },
      {
        name: "render",
        label: "render",
        render: ({ model, disabled, name, methods: { setFieldsValue } }) => (
          <div>
            <InputNumber
              disabled={disabled}
              value={model[name]}
              onChange={(e) => setFieldsValue({ [name]: e })}
            />
          </div>
        ),
        colProps: { span: 6 },
        initialValue: 2,
      },
      {
        name: "InputNumber",
        label: "InputNumber",
        component: "InputNumber",
        componentProps: ({ model }) => {
          return {
            onBlur: (e) => {
              console.log(e);
            },
            onChange: (e) => {
              console.log(e);
            },
          };
        },
        initialValue: 2,
        colProps: { span: 6 },
      },
      {
        name: "Select",
        label: "Select",
        component: "Select",
        ifShow: ({ model }) => {
          return true;
        },
        show: ({ model }) => {
          return true;
        },
        componentProps: ({ model }) => {
          return {
            options: [
              { label: "测试", value: "1" },
              { label: "测试2", value: "2" },
            ],
            onChange: (e) => {
              console.log(e);
            },
          };
        },
        colProps: { span: 6 },
      },
      {
        name: "Transfer",
        label: "Transfer",
        component: "Transfer",
        componentProps: ({ model }) => {
          return {};
        },
        colProps: { span: 6 },
      },
      {
        name: "TreeSelect",
        label: "TreeSelect",
        component: "TreeSelect",
        componentProps: ({ model }) => {
          return {};
        },
        colProps: { span: 6 },
      },
      {
        name: "Switch",
        label: "Switch",
        component: "Switch",
        componentProps: {},
        colProps: { span: 6 },
      },
      {
        name: "Radio",
        label: "Radio",
        component: "Radio",
        componentProps: {},
        colProps: { span: 6 },
      },
      {
        name: "Checkbox",
        label: "Checkbox",
        component: "Checkbox",
        componentProps: {},
        valuePropName: "checked",
        colProps: { span: 6 },
      },
      {
        name: "Cascader",
        label: "Cascader",
        component: "Cascader",
        componentProps: {},
        colProps: { span: 6 },
      },
      {
        name: "TimePicker",
        label: "TimePicker",
        component: "TimePicker",
        componentProps: {},
        colProps: { span: 6 },
      },
      {
        name: "DatePicker",
        label: "DatePicker",
        component: "DatePicker",
        componentProps: {},
        colProps: { span: 6 },
      },
      {
        name: "Button",
        label: "Button",
        component: "Button",
        componentProps: {
          children: "Button",
          onClick: async () => {
            // console.log(reactFormRef.current?.setFieldsValue({ Input: "123" }));
            console.log(await reactFormRef.current?.validator());
            console.log(await setFieldsValue({ Input: "123" }));
            console.log(await getFieldsValue(true));
            console.log(await getFieldsValue(["Input"]));
          },
        },
        colProps: { span: 6 },
      },
    ],
  };

  /**
   * ==========================================
   * 一、
   *
   * 第一种调用form组件api的方式，通过useRef
   *=============================================
   *  */
  const reactFormRef = React.useRef<IFormActionType>();

  /**
   * ==========================================
   * 二、
   *
   * 第二种调用form组件api的方式，通过封装的useForm方法
   *=============================================
   *  */
  const [register, { setFieldsValue, getFieldsValue }] = useForm();
  return (
    <section>
      <ReactForm register={register} ref={reactFormRef} {...props}></ReactForm>
    </section>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  /**
   * @description 严格模式 用于检测不合理的代码 会导致ReactApp组件渲染两次
   */
  <React.StrictMode>
    <ReactApp />
  </React.StrictMode>
);
