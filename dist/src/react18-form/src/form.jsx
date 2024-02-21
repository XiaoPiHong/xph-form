"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const hooks_1 = require("./hooks");
const formItem_1 = __importDefault(require("./components/formItem"));
function Form(props) {
    const [formInstance] = antd_1.Form.useForm();
    /** 响应式数据源 */
    const model = antd_1.Form.useWatch((values) => values, formInstance);
    const { formItems } = (0, hooks_1.useFormItem)({ props, model });
    return (<antd_1.Form form={formInstance}>
      <antd_1.Row>
        {formItems.map((item, index) => (<formItem_1.default key={index} itemProps={item} formProps={props}/>))}
      </antd_1.Row>
    </antd_1.Form>);
}
exports.default = Form;
