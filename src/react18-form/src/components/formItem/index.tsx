import { IFormPorps, TFormItemProps } from "@/react18-form/index";
import { Col, Form } from "antd";
import style from "./index.module.css";

function FormItem({
  formProps,
  itemProps,
}: {
  formProps: IFormPorps;
  itemProps: TFormItemProps;
}) {
  const { name, label, show } = itemProps;
  console.log(formProps);
  return (
    <Col className={!show ? style["form-item-hidden"] : ""}>
      <Form.Item name={name} label={label}></Form.Item>
    </Col>
  );
}

export default FormItem;
