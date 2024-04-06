import React, { useMemo, useEffect } from "react";
import { Form, Input } from "antd";

const FormItem = React.memo(() => {
  console.log("render FormItem");
  const values = Form.useWatch((values) => values);
  const model: any = useMemo(() => {
    return values || {};
  }, [values]);

  useEffect(() => {
    console.log("FormItem mounted");
    return () => {
      console.log("FormItem unmounted");
    };
  }, []);

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
});

const Test: React.FC = () => {
  console.log("render Form");
  const [formInstance] = Form.useForm();

  return (
    <Form form={formInstance}>
      <FormItem></FormItem>
    </Form>
  );
};

export default Test;
