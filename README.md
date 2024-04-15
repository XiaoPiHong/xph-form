# xph-form

This is a configurable form component that supports React.

## Using npm or yarn

```bash
npm install xph-form --save
```

```bash
yarn add xph-form
```

If you are in a bad network environment, you can try other registries and tools like cnpm.

## Example

```javascript
import React from "react";
import {
  ReactForm,
  useReactForm,
  IReactFormProps,
  IReactFormActionType,
} from "xph-form";
import { InputNumber, Button } from "antd";
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
        componentProps: {
          onChange: (e) => {
            // console.log(e);
          },
        },
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
        show: ({ model }) => {
          return model.Input !== "Input";
        },
        ifShow: ({ model }) => {
          return model.Input;
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
        componentProps: {
          onBlur: (e) => {
            console.log(e);
          },
          onChange: (e) => {
            console.log(e);
          },
        },
        initialValue: 2,
        colProps: { span: 8 },
      },
      {
        name: "Select",
        label: "Select",
        component: "Select",
        componentProps: {
          allowClear: true,
          placeholder: "Select",
          options: [
            { label: "测试", value: "1" },
            { label: "测试2", value: "2" },
          ],
          onChange: (e) => {
            console.log(e);
          },
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
        componentProps: {
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
        componentProps: {
          placeholder: "请选择TreeSelect",
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
        initialValue: true,
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
        name: "RadioButtonGroup",
        label: "RadioButtonGroup",
        component: "RadioGroup",
        componentProps: {
          optionType: "button",
          buttonStyle: "solid",
          options: [
            { label: "A", value: "a", disabled: true },
            { label: "B", value: "b", disabled: false },
            { label: "C", value: "c", disabled: false },
            { label: "D", value: "d", disabled: true },
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
          placeholder: "请选择Cascader",
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
          valueFormat: "HH:mm",
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
          valueFormat: "YYYY-MM-DD",
        },
        colProps: { span: 8 },
        initialValue: dayjs("2021-08-08", "YYYY-MM-DD"),
      },
      {
        name: "MonthPicker",
        label: "MonthPicker",
        component: "MonthPicker",
        componentProps: {
          valueFormat: "YYYY-MM",
        },
        colProps: { span: 8 },
        initialValue: dayjs("2021-08", "YYYY-MM"),
      },
      {
        name: "WeekPicker",
        label: "WeekPicker",
        component: "WeekPicker",
        componentProps: {
          valueFormat: "YYYY-MM-DD HH:mm:ss",
        },
        colProps: { span: 8 },
        initialValue: dayjs("2021-08-01", "YYYY-MM-DD"), // 2021-08-01是21年第32周
      },
      {
        name: "RangePicker",
        label: "RangePicker",
        component: "RangePicker",
        componentProps: {
          format: "YYYY-MM-DD",
          valueFormat: "YYYY-MM-DD",
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
        name: "ApiSelect",
        label: "ApiSelect",
        component: "ApiSelect",
        componentProps: ({ model }) => {
          return {
            placeholder: "ApiSelect",
            allowClear: true,
            immediate: true,
            params: { a: model.Select },
            api: async (params) => {
              console.log(params, "GET ApiSelect===========================");
              return [
                { label: "测试", value: "1" },
                { label: "测试2", value: "2" },
              ];
            },
          };
        },
        initialValue: "1",
        colProps: { span: 8 },
      },
      {
        name: "ApiTreeSelect",
        label: "ApiTreeSelect",
        component: "ApiTreeSelect",
        componentProps: ({ model }) => {
          return {
            placeholder: "请选择ApiTreeSelect",
            params: { a: model.Select },
            immediate: true,
            api: async (params) => {
              console.log(
                params,
                "GET ApiTreeSelect==========================="
              );
              return [
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
              ];
            },
          };
        },
        initialValue: "leaf3",
        colProps: { span: 8 },
        rules: [
          {
            required: true,
            message: "ApiTreeSelect必填",
          },
        ],
      },
      {
        name: "ApiTransfer",
        label: "ApiTransfer",
        component: "ApiTransfer",
        valuePropName: "targetKeys",
        initialValue: ["1"],
        componentProps: ({ model }) => {
          return {
            params: { a: model.Select },
            api: async (params) => {
              // console.log(params, "GET ApiTransfer===========================");
              return [
                {
                  key: "1",
                  title: "标题1",
                },
                {
                  key: "2",
                  title: "标题2",
                },
              ];
            },
            render: (item) => item.title,
          };
        },
        colProps: { span: 8 },
        rules: [
          {
            required: true,
            type: "array",
            message: "ApiTransfer必填",
          },
        ],
      },
      {
        name: "ApiAutoComplete",
        label: "ApiAutoComplete",
        component: "ApiAutoComplete",
        componentProps: ({ model }) => {
          return {
            params: { a: model.Select },
            immediate: true,
            api: async (params) => {
              console.log(
                params,
                "GET ApiAutoComplete==========================="
              );
              return [
                { value: "Burns Bay Road" },
                { value: "Downing Street" },
                { value: "Wall Street" },
              ];
            },
          };
        },
        initialValue: "Burns Bay Road",
        colProps: { span: 8 },
      },
      {
        name: "Upload",
        label: "Upload",
        component: "Upload",
        componentProps: {
          children: "上传",
          showUploadList: {},
          listType: "picture-card",
          beforeUpload(file) {
            return false;
          },
          onChange(info) {
            const { file, fileList } = info;
            const { status } = file;
            switch (status) {
              case "removed": {
                setFieldsValue({
                  Upload: fileList,
                });
                break;
              }
              default: {
                // 上传（此处由于没有上传服务器，默认是假上传，默认都是成功）
                setFieldsValue({
                  Upload: [
                    {
                      uid: "-1",
                      name: "image.png",
                      status: "done",
                      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                    },
                  ],
                });
              }
            }
          },
        },
        colProps: { span: 8 },
        valuePropName: "fileList",
        initialValue: [],
        rules: [
          {
            validator: async (rule, value) => {
              console.log("validate=================", value);
              if (value && value.length === 0) {
                return Promise.reject("请上传文件");
              }
              return Promise.resolve();
            },
          },
        ],
      },
      {
        name: "AutoUpload",
        label: "AutoUpload",
        component: "AutoUpload",
        componentProps: {
          /**
           * @description 上传服务器接口，需要返回：
           * type IFileList = Array<{
           *   uid: string;
           *   url: string;
           *   status: string;
           *   name: string;
           * }>
           */
          // api: async (params) => {
          //   /** 此处只是模拟上传服务器的操作 */
          //   return [
          //     {
          //       uid: `${+new Date()}${Math.random()}`,
          //       name: "image.png",
          //       status: "done",
          //       url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          //     },
          //   ];
          // },
          maxSize: 1, // 文件最大限制
          maxCount: 2, // 文件最大数量
          /**
           * @description 表单获取到的类型
           * @type "String"（默认，配合api使用） | "String[]"（配合api使用） | "File[]" | "FileList"（配合api使用）
           * @description
           * String时如果上传多文件，则返回字符串,拼接   initialValue：字符串
           * String[]时如果上传多文件，则返回数组        initialValue：数组
           * File[]时如果上传多文件，则返回数组          initialValue：数组
           * FileList时如果上传多文件，则返回数组        initialValue：数组
           */
          returnType: "File[]",
          onChange(val) {
            console.log("AutoUpload onChange========================", val);
          },
        },
        colProps: { span: 8 },
        valuePropName: "fileList",
        initialValue: [],
        rules: [
          {
            validator: async (rule, value) => {
              console.log("validate=================", value);
              if (!value.length) {
                return Promise.reject("请上传文件");
              }
              return Promise.resolve();
            },
          },
        ],
      },
      {
        name: "Button",
        label: "Button",
        component: "Button",
        componentProps: {
          children: "Button",
          onClick: async () => {
            // console.log(reactFormRef.current?.getFieldsValue(true));
            // console.log(reactFormRef.current?.setFieldsValue({ Input: "123" }));
            // console.log(reactFormRef.current?.getFieldsValue(["Input"]));
            // console.log(await reactFormRef.current?.resetFields());
            // console.log(await reactFormRef.current?.validator());
            console.log(getFieldsValue(true));
            console.log(
              setFieldsValue({
                Input: "Input test",
                render: 23,
                InputNumber: 21,
                ApiSelect: "2",
                Select: null,
                Transfer: [],
                ApiTransfer: [],
                ApiTreeSelect: null,
                TreeSelect: null,
                Switch: false,
                Radio: false,
                RadioGroup: "b",
                RadioButtonGroup: "b",
                Checkbox: false,
                CheckboxGroup: ["a"],
                Cascader: [],
                TimePicker: "2021-08-01 03:59:59",
                DatePicker: "2021-08-01",
                MonthPicker: "2021-09",
                WeekPicker: "2021-09-02 00:00:00",
                RangePicker: ["2021-08-02", "2021-08-07"],
                InputPassword: "12345678",
                InputTextArea: "123456789",
                AutoComplete: "Burns Bay Road Test",
                ApiAutoComplete: "Burns Bay Road Test",
                Upload: [],
                AutoUpload: [],
              })
            );
            // console.log(getFieldsValue(["RangePicker"]));
            // console.log(await resetFields());
            // console.log(await validator());
          },
        },
        colProps: { span: 8 },
      },
      {
        name: "ResetButton",
        label: "ResetButton",
        component: "Button",
        componentProps: {
          children: "ResetButton",
          onClick: async () => {
            console.log(await resetFields());
          },
        },
        colProps: { span: 8 },
      },
      {
        name: "ValidateButton",
        label: "ValidateButton",
        component: "Button",
        componentProps: {
          children: "ValidateButton",
          onClick: async () => {
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
   * */
  const [register, { setFieldsValue, getFieldsValue, resetFields, validator }] =
    useReactForm();
  return (
    <section>
      <ReactForm register={register} ref={reactFormRef} {...props}></ReactForm>
    </section>
  );
};

export default ReactApp;
```

## Keywords

- react
- ant-design
- component
- form
- configurable-form
