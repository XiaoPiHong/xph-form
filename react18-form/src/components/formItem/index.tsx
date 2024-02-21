import { IFormPorps, TFormItemProps } from "@r/src/types";
import { Col, Form } from "antd";
import style from "./index.module.less";

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
