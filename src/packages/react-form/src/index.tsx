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
        name: "test",
        label: "测试",
        component: "Input",
        colProps: {
          span: 6,
        },
      },
      {
        name: "test2",
        label: "测试2",
        render: ({ model }) => (
          <div>{model.test === "1" ? <InputNumber /> : "失败"}</div>
        ),
        colProps: {
          span: 6,
        },
      },
      {
        name: "test3",
        label: "测试3",
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
        colProps: {
          span: 6,
        },
      },
      {
        name: "test4",
        label: "测试4",
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
              {
                label: "测试",
                value: "1",
              },
              {
                label: "测试2",
                value: "2",
              },
            ],
            onChange: (e) => {
              console.log(e);
            },
          };
        },
        colProps: {
          span: 6,
        },
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
