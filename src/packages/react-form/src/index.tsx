/** 这个是react-form表单项目启动入口文件 */
import React from "react";
import ReactForm from "./form";
import { IFormPorps } from "./types";
import ReactDOM from "react-dom/client";
import { InputNumber } from "antd";

const ReactApp: React.FC = () => {
  const props: IFormPorps = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
    items: [
      {
        name: "Input",
        label: "Input",
        component: "Input",
        colProps: { span: 6 },
      },
      {
        name: "render",
        label: "render",
        render: ({ model }) => (
          <div>{model.test === "1" ? <InputNumber /> : "失败"}</div>
        ),
        colProps: { span: 6 },
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
        name: "Button",
        label: "Button",
        component: "Button",
        componentProps: { children: "Button" },
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
    ],
  };
  return (
    <section>
      <ReactForm {...props}></ReactForm>
    </section>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReactApp />
  </React.StrictMode>
);
