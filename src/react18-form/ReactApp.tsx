import React18Form, { IFormPorps } from ".";
import React from "react";

function Home() {
  const items: IFormPorps["items"] = [
    {
      name: "test",
      label: "测试",
      component: "Input",
      show: ({ model }) => {
        return false;
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
}
export default Home;
