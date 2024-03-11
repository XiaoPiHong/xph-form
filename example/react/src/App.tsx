import React from "react";
import {
  ReactForm,
  useReactForm,
  IReactFormProps,
  IReactFormActionType,
} from "xph-form";
import { InputNumber } from "antd";
import dayjs from "dayjs";

const ReactApp: React.FC = () => {
  const props: IReactFormProps = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    items: [
      {
        name: "Input",
        label: "Input",
        component: "Input",
        required: true,
        colProps: { span: 8 },
        initialValue: "Input",
      },
      {
        name: "render",
        label: "render",
        render: ({ model, disabled, name, methods, componentProps }) => (
          <div>
            <InputNumber
              disabled={disabled}
              value={model[name]}
              onChange={(e) => methods.setFieldsValue({ [name]: e })}
              {...componentProps}
            />
          </div>
        ),
        componentProps: {
          placeholder: "render",
        },
        colProps: { span: 8 },
        initialValue: 2,
        rules: [
          {
            required: true,
            message: "render必填",
          },
        ],
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
        colProps: { span: 8 },
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
            placeholder: "Select",
            options: [
              { label: "测试", value: "1" },
              { label: "测试2", value: "2" },
            ],
            onChange: (e) => {
              console.log(e);
            },
          };
        },
        initialValue: "1",
        colProps: { span: 8 },
      },
      {
        name: "Transfer",
        label: "Transfer",
        component: "Transfer",
        valuePropName: "targetKeys",
        initialValue: ["1"],
        componentProps: ({ model }) => {
          return {
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
        colProps: { span: 8 },
        rules: [
          {
            required: true,
            type: "array",
            message: "Transfer必填",
          },
        ],
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
        initialValue: "leaf3",
        colProps: { span: 8 },
        rules: [
          {
            required: true,
            message: "TreeSelect必填",
          },
        ],
      },
      {
        name: "Switch",
        label: "Switch",
        component: "Switch",
        componentProps: {},
        initialValue: true,
        valuePropName: "checked",
        colProps: { span: 8 },
      },
      {
        name: "Radio",
        label: "Radio",
        component: "Radio",
        componentProps: {},
        valuePropName: "checked",
        colProps: { span: 8 },
      },
      {
        name: "RadioGroup",
        label: "RadioGroup",
        component: "RadioGroup",
        componentProps: {
          options: [
            { label: "A", value: "a" },
            { label: "B", value: "b" },
            { label: "C", value: "c" },
            { label: "D", value: "d" },
          ],
        },
        initialValue: "a",
        colProps: { span: 8 },
      },
      {
        name: "Checkbox",
        label: "Checkbox",
        component: "Checkbox",
        componentProps: {},
        valuePropName: "checked",
        colProps: { span: 8 },
        initialValue: true,
      },
      {
        name: "CheckboxGroup",
        label: "CheckboxGroup",
        component: "CheckboxGroup",
        componentProps: {
          options: [
            { label: "A", value: "a" },
            { label: "B", value: "b" },
            { label: "C", value: "c" },
            { label: "D", value: "d" },
          ],
        },
        initialValue: ["a"],
        colProps: { span: 8 },
      },
      {
        name: "Cascader",
        label: "Cascader",
        component: "Cascader",
        componentProps: {
          options: [
            {
              value: "zhejiang",
              label: "Zhejiang",
              children: [
                {
                  value: "hangzhou",
                  label: "Hangzhou",
                  children: [
                    {
                      value: "xihu",
                      label: "West Lake",
                    },
                  ],
                },
              ],
            },
          ],
        },
        initialValue: ["zhejiang", "hangzhou", "xihu"],
        colProps: { span: 8 },
      },
      {
        name: "TimePicker",
        label: "TimePicker",
        component: "TimePicker",
        componentProps: {
          format: "HH:mm",
        },
        initialValue: dayjs("12:08", "HH:mm"),
        colProps: { span: 8 },
        rules: [
          {
            validator: async (rule, value) => {
              if (!value) {
                return Promise.reject("TimePicker必填");
              }
              return Promise.resolve();
            },
          },
        ],
      },
      {
        name: "DatePicker",
        label: "DatePicker",
        component: "DatePicker",
        componentProps: {
          format: "YYYY-MM-DD",
        },
        colProps: { span: 8 },
        initialValue: dayjs("2021-08-08", "YYYY-MM-DD"),
      },
      {
        name: "MonthPicker",
        label: "MonthPicker",
        component: "MonthPicker",
        componentProps: {},
        colProps: { span: 8 },
        initialValue: dayjs("2021-08", "YYYY-MM"),
      },
      {
        name: "WeekPicker",
        label: "WeekPicker",
        component: "WeekPicker",
        componentProps: {},
        colProps: { span: 8 },
        initialValue: dayjs("2021-08-01", "YYYY-MM-DD"), // 2021-08-01是21年第32周
      },
      {
        name: "RangePicker",
        label: "RangePicker",
        component: "RangePicker",
        componentProps: {
          format: "YYYY-MM-DD HH:mm:ss",
        },
        colProps: { span: 8 },
        initialValue: [
          dayjs("2021-08-01 00:00:00", "YYYY-MM-DD HH:mm:ss"),
          dayjs("2021-08-08 23:59:59", "YYYY-MM-DD HH:mm:ss"),
        ],
      },
      {
        name: "InputPassword",
        label: "InputPassword",
        component: "InputPassword",
        componentProps: {},
        colProps: { span: 8 },
        initialValue: "123456",
      },
      {
        name: "InputTextArea",
        label: "InputTextArea",
        component: "InputTextArea",
        componentProps: {},
        colProps: { span: 8 },
        initialValue: "123456",
      },
      {
        name: "AutoComplete",
        label: "AutoComplete",
        component: "AutoComplete",
        componentProps: {
          options: [
            { value: "Burns Bay Road" },
            { value: "Downing Street" },
            { value: "Wall Street" },
          ],
        },
        initialValue: "Burns Bay Road",
        colProps: { span: 8 },
      },
      {
        name: "Button",
        label: "Button",
        component: "Button",
        componentProps: {
          children: "Button",
          onClick: async () => {
            // console.log(reactFormRef.current?.getFieldsValue(true));
            // console.log(
            //   await reactFormRef.current?.setFieldsValue({ Input: "123" })
            // );
            // console.log(await reactFormRef.current?.getFieldsValue(["Input"]));
            // console.log(await reactFormRef.current?.resetFields());
            // console.log(await reactFormRef.current?.validator());

            console.log(getFieldsValue());
            console.log(await setFieldsValue({ Input: "123" }));
            console.log(await getFieldsValue(["Input"]));
            console.log(await resetFields());
            console.log(await validator());
          },
        },
        colProps: { span: 8 },
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
  const reactFormRef = React.useRef<IReactFormActionType>();

  /**
   * ==========================================
   * 二、
   *
   * 第二种调用form组件api的方式，通过封装的useReactForm方法
   *=============================================
   *  */
  const [register, { setFieldsValue, getFieldsValue, resetFields, validator }] =
    useReactForm();
  return (
    <section>
      <ReactForm register={register} ref={reactFormRef} {...props}></ReactForm>
    </section>
  );
};

export default ReactApp;
