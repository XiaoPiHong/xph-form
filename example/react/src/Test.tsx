import React, { useMemo } from "react";
import { Form, Input } from "antd";

const FormItem = ({ instance }) => {
  const values = Form.useWatch((values) => values, instance);
  const model: any = useMemo(() => {
    return values || {};
  }, [values]);
  return (
    <div>
      <Form.Item
        label="姓名"
        name="name"
        rules={[{ required: true, message: "请输入姓名" }]}
      >
        <Input />
      </Form.Item>
      {model.name}
    </div>
  );
};

const Test: React.FC = () => {
  console.log("render Form");
  const [formInstance] = Form.useForm();

  return (
    <Form form={formInstance}>
      <FormItem instance={formInstance}></FormItem>
    </Form>
  );
};
export default Test;
