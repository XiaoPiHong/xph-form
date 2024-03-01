/** 这个是react-form表单项目启动入口文件 */
import React from "react";
import ReactForm from "./form";
import { IFormPorps } from "./types";
import ReactDOM from "react-dom/client";
import { InputNumber } from "antd";

const ReactApp: React.FC = () => {
  const props: IFormPorps = {
    items: [
      {
        name: "test",
        label: "测试",
        component: "Input",
        ifShow: true,
        show: true,
        componentProps: {
          allowClear: true,
        },
      },
      {
        name: "test2",
        label: "测试2",
        render: ({ model }) => (
          <div>{model.test === "1" ? <InputNumber /> : "失败"}</div>
        ),
        ifShow: true,
        show: true,
        componentProps: {
          allowClear: true,
        },
      },
      {
        name: "test3",
        label: "测试3",
        component: "InputNumber",
        ifShow: ({ model }) => {
          return true;
        },
        show: ({ model }) => {
          return true;
        },
        componentProps: {},
      },
      {
        name: "test4",
        label: "测试3",
        component: "Select",
        ifShow: ({ model }) => {
          console.log("ifShow", model);
          return false;
        },
        show: ({ model }) => {
          console.log("show", model);
          return false;
        },
        componentProps: {
          allowClear: true,
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
