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
        labelCol: {
          span: 10,
        },
        wrapperCol: {
          span: 14,
        },
      },
      {
        name: "test2",
        label: "测试2",
        render: ({ model }) => (
          <div>{model.test === "1" ? <InputNumber /> : "失败"}</div>
        ),
      },
      {
        name: "test3",
        label: "测试3",
        component: "InputNumber",
      },
      {
        name: "test4",
        label: "测试4",
        component: "Select",
        ifShow: ({ model }) => {
          console.log("ifShow", model);
          return true;
        },
        show: ({ model }) => {
          console.log("show", model);
          return true;
        },
        componentProps: {
          options: [
            {
              label: "测试",
              value: "1",
            },
          ],
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
