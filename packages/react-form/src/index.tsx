/** 这个是react-form表单项目启动入口文件 */
import React from "react";
import ReactForm from "./form";
import { IFormPorps } from "./types";
import ReactDOM from "react-dom/client";

const ReactApp: React.FC = () => {
  const items: IFormPorps["items"] = [
    {
      name: "test",
      label: "测试",
      component: "Input",
      ifShow: ({ model }) => {
        console.log("ifShow", model);
        return false;
      },
      show: ({ model }) => {
        console.log("show", model);
        return false;
      },
      componentProps: {
        a: 1,
      },
    },
  ];
  return (
    <section>
      <ReactForm items={items}></ReactForm>
    </section>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReactApp />
  </React.StrictMode>
);
