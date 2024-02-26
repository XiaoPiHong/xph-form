import React18Form, { IFormPorps } from "./react18-form";
import React from "react";
import ReactDOM from "react-dom/client";

const ReactApp: React.FC = () => {
  const items: IFormPorps["items"] = [
    {
      name: "test",
      label: "测试",
      component: "Input",
      show: ({ model }) => {
        return false;
      },
      ifShow: ({ model }) => {
        console.log(model);
        return true;
      },
      componentProps: {
        a: 1,
      },
    },
  ];
  return (
    <section>
      <React18Form items={items}></React18Form>
    </section>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReactApp />
  </React.StrictMode>
);
