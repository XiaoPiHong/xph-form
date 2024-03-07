/** 这个是react-form表单项目启动入口文件 */
import React, { useState } from "react";
import ReactForm from "./form";
import { IFormProps, IFormActionType } from "./types";
import ReactDOM from "react-dom/client";
import { InputNumber } from "antd";
import { useForm } from "./hooks";

const ReactApp: React.FC = () => {
  const props: IFormProps = {
    items: [
      {
        name: "Input",
        label: "Input",
        component: "Input",
        required: true,
        colProps: { span: 6 },
        initialValue: "Input",
      },
      {
        name: "render",
        label: "render",
        render: ({ model, disabled, name, methods }) => (
          <div>
            <InputNumber
              disabled={disabled}
              value={model[name]}
              onChange={(e) => methods.setFieldsValue({ [name]: e })}
            />
          </div>
        ),
        colProps: { span: 6 },
        initialValue: 2,
      },
      {
        name: "InputNumber",
        label: "InputNumber",
        component: "InputNumber",
        componentProps: ({ model }) => {
          return {
            onBlur: (e) => {
              console.log(e);
            },
            onChange: (e) => {
              console.log(e);
            },
          };
        },
        initialValue: 2,
        colProps: { span: 6 },
      },
      {
        name: "Select",
        label: "Select",
        component: "Select",
        ifShow: ({ model }) => {
          return true;
        },
        show: ({ model }) => {
          return true;
        },
        componentProps: ({ model }) => {
          return {
            options: [
              { label: "测试", value: "1" },
              { label: "测试2", value: "2" },
            ],
            onChange: (e) => {
              console.log(e);
            },
          };
        },
        colProps: { span: 6 },
      },
      {
        name: "Transfer",
        label: "Transfer",
        component: "Transfer",
        componentProps: ({ model }) => {
          //=================================写法1
          const [targetKeys, setTargetKeys] = useState<string[]>([]);
          return {
            targetKeys,
            onChange: (targetKeys) => {
              setTargetKeys([...targetKeys]);
            },

            //=================================写法2
            // targetKeys: model["Transfer"],
            // onChange: (targetKeys) => {
            //   setFieldsValue({ Transfer: targetKeys });
            // },

            dataSource: [
              {
                key: "1",
                title: "标题1",
              },
              {
                key: "2",
                title: "标题2",
              },
            ],
            render: (item) => item.title,
          };
        },
      },
      {
        name: "TreeSelect",
        label: "TreeSelect",
        component: "TreeSelect",
        componentProps: ({ model }) => {
          return {
            treeData: [
              {
                value: "parent 1",
                title: "parent 1",
                children: [
                  {
                    value: "parent 1-0",
                    title: "parent 1-0",
                    children: [
                      {
                        value: "leaf1",
                        title: "leaf1",
                      },
                      {
                        value: "leaf2",
                        title: "leaf2",
                      },
                    ],
                  },
                  {
                    value: "parent 1-1",
                    title: "parent 1-1",
                    children: [
                      {
                        value: "leaf3",
                        title: <b style={{ color: "#08c" }}>leaf3</b>,
                      },
                    ],
                  },
                ],
              },
            ],
          };
        },
        colProps: { span: 6 },
      },
      {
        name: "Switch",
        label: "Switch",
        component: "Switch",
        componentProps: {},
        initialValue: true,
        colProps: { span: 6 },
      },
      {
        name: "Radio",
        label: "Radio",
        component: "Radio",
        componentProps: {},
        colProps: { span: 6 },
      },
      {
        name: "Checkbox",
        label: "Checkbox",
        component: "Checkbox",
        componentProps: {},
        valuePropName: "checked",
        colProps: { span: 6 },
      },
      {
        name: "Cascader",
        label: "Cascader",
        component: "Cascader",
        componentProps: {},
        colProps: { span: 6 },
      },
      {
        name: "TimePicker",
        label: "TimePicker",
        component: "TimePicker",
        componentProps: {},
        colProps: { span: 6 },
      },
      {
        name: "DatePicker",
        label: "DatePicker",
        component: "DatePicker",
        componentProps: {},
        colProps: { span: 6 },
      },
      {
        name: "Button",
        label: "Button",
        component: "Button",
        componentProps: {
          children: "Button",
          onClick: async () => {
            // console.log(reactFormRef.current?.setFieldsValue({ Input: "123" }));
            console.log(await reactFormRef.current?.validator());
            console.log(await setFieldsValue({ Input: "123" }));
            console.log(await getFieldsValue(true));
            console.log(await getFieldsValue(["Input"]));
          },
        },
        colProps: { span: 6 },
      },
    ],
  };

  /**
   * ==========================================
   * 一、
   *
   * 第一种调用form组件api的方式，通过useRef
   *=============================================
   *  */
  const reactFormRef = React.useRef<IFormActionType>();

  /**
   * ==========================================
   * 二、
   *
   * 第二种调用form组件api的方式，通过封装的useForm方法
   *=============================================
   *  */
  const [register, { setFieldsValue, getFieldsValue }] = useForm();
  return (
    <section>
      <ReactForm register={register} ref={reactFormRef} {...props}></ReactForm>
    </section>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  /**
   * @description 严格模式 用于检测不合理的代码 会导致ReactApp组件渲染两次
   */
  <React.StrictMode>
    <ReactApp />
  </React.StrictMode>
);
