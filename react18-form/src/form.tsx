import { Form as AForm, Row } from "antd";
import { IFormPorps } from "./types";
import { useFormItem } from "./hooks";

function Form(props: IFormPorps) {
  const [formInstance] = AForm.useForm();
  /** 响应式数据源 */
  const model = AForm.useWatch((values) => values, formInstance);

  const { formItems } = useFormItem({ props, model });
  return (
    <AForm form={formInstance}>
      <Row></Row>
    </AForm>
  );
}

export default Form;
