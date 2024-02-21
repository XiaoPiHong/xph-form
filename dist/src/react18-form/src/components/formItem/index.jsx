"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const index_module_css_1 = __importDefault(require("./index.module.css"));
function FormItem({ formProps, itemProps, }) {
    const { name, label, show } = itemProps;
    console.log(formProps);
    return (<antd_1.Col className={!show ? index_module_css_1.default["form-item-hidden"] : ""}>
      <antd_1.Form.Item name={name} label={label}></antd_1.Form.Item>
    </antd_1.Col>);
}
exports.default = FormItem;
