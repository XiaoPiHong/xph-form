import React from "react";
import { Form, Input } from "antd";

const Test: React.FC = () => {
  console.log("render Form");
  const [formInstance] = Form.useForm();
  const values = Form.useWatch((values) => values, formInstance);
  console.log("values", values);
  return (
    <Form>
      <Form.Item
        label="姓名"
        name="name"
        rules={[{ required: true, message: "请输入姓名" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
export default Test;
