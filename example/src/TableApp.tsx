import React, { useRef } from "react";
import XphTable from "@xph-form/table/src/table";
import { TTableProps as TXphTableProps } from "@xph-form/table/src/types";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const ReactApp: React.FC = () => {
  const props: TXphTableProps<DataType> = {
    table: {
      rowSelection: {
        type: "checkbox",
      },
      fullHeight: true,
      columns: [
        {
          title: "姓名",
          dataIndex: "name",
          key: "name",
        },
      ],
      autoPagination: true,
      api: async (params) => {
        console.log(params);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {
                key: "1",
                name: "胡彦斌",
                age: 32,
                address: "西湖区湖底公园1号",
              },
              {
                key: "2",
                name: "李雷",
                age: 28,
                address: "东城区东华门大街2号",
              },
              {
                key: "3",
                name: "韩梅梅",
                age: 30,
                address: "南山区南山路3号",
              },
              {
                key: "4",
                name: "王小明",
                age: 25,
                address: "北城区北门大街4号",
              },
              {
                key: "5",
                name: "赵丽颖",
                age: 29,
                address: "中城区中山路5号",
              },
              {
                key: "6",
                name: "陈晓",
                age: 31,
                address: "西湖区湖底公园6号",
              },
              {
                key: "7",
                name: "刘亦菲",
                age: 27,
                address: "东城区东华门大街7号",
              },
              {
                key: "8",
                name: "张三",
                age: 33,
                address: "南山区南山路8号",
              },
              {
                key: "9",
                name: "李四",
                age: 26,
                address: "北城区北门大街9号",
              },
              {
                key: "10",
                name: "王五",
                age: 35,
                address: "中城区中山路10号",
              },
              {
                key: "11",
                name: "赵六",
                age: 34,
                address: "西湖区湖底公园11号",
              },
              {
                key: "12",
                name: "孙七",
                age: 28,
                address: "东城区东华门大街12号",
              },
              {
                key: "13",
                name: "周八",
                age: 29,
                address: "南山区南山路13号",
              },
              {
                key: "14",
                name: "吴九",
                age: 31,
                address: "北城区北门大街14号",
              },
              {
                key: "15",
                name: "郑十",
                age: 27,
                address: "中城区中山路15号",
              },
              {
                key: "16",
                name: "何十一",
                age: 30,
                address: "西湖区湖底公园16号",
              },
              {
                key: "17",
                name: "冯十二",
                age: 33,
                address: "东城区东华门大街17号",
              },
              {
                key: "18",
                name: "褚十三",
                age: 32,
                address: "南山区南山路18号",
              },
              {
                key: "19",
                name: "卫十四",
                age: 29,
                address: "北城区北门大街19号",
              },
              {
                key: "20",
                name: "蒋十五",
                age: 28,
                address: "中城区中山路20号",
              },
              {
                key: "21",
                name: "沈十六",
                age: 31,
                address: "西湖区湖底公园21号",
              },
              {
                key: "22",
                name: "韩十七",
                age: 34,
                address: "东城区东华门大街22号",
              },
              {
                key: "23",
                name: "杨十八",
                age: 27,
                address: "南山区南山路23号",
              },
              {
                key: "24",
                name: "朱十九",
                age: 30,
                address: "北城区北门大街24号",
              },
              {
                key: "25",
                name: "秦二十",
                age: 33,
                address: "中城区中山路25号",
              },
              {
                key: "26",
                name: "尤二一",
                age: 32,
                address: "西湖区湖底公园26号",
              },
              {
                key: "27",
                name: "许二二",
                age: 29,
                address: "东城区东华门大街27号",
              },
              {
                key: "28",
                name: "何二三",
                age: 28,
                address: "南山区南山路28号",
              },
              {
                key: "29",
                name: "吕二四",
                age: 31,
                address: "北城区北门大街29号",
              },
              {
                key: "30",
                name: "施二五",
                age: 34,
                address: "中城区中山路30号",
              },
            ]);
          }, 2000);
        });
      },
      toolbar: {
        items: [
          {
            key: "add",
            component: "Button",
            componentProps: {
              children: "我是按钮",
              onClick: (e) => {
                console.log(e);
              },
            },
          },
          {
            key: "more",
            component: "Dropdown",
            componentProps: {
              children: "我是下拉",
              dropDownItems: [
                {
                  key: "1",
                  label: "我是下拉1",
                },
                {
                  key: "2",
                  label: "我是下拉2",
                },
              ],
              onClick: (e) => {
                console.log(e);
              },
            },
          },
          {
            key: "render",
            render: <div>我是render</div>,
          },
        ],
      },
    },
    searchForm: {
      colProps: { span: 6 },
      collapsible: true,
      items: [
        {
          name: "Input",
          label: "Input",
          component: "Input",
          required: true,
          initialValue: "Input",
          componentProps: {
            onChange: (e) => {
              console.log(e);
            },
          },
          ifShow: ({ model }) => {
            return model.Input2 === "Input1";
          },
        },
        {
          name: "Input2",
          label: "Input",
          component: "Input",
          required: true,
          initialValue: "Input",
          componentProps: {
            onChange: (e) => {
              console.log(e);
            },
          },
        },
        {
          name: "Input3",
          label: "Input",
          component: "Input",
          required: true,
          initialValue: "Input",
          componentProps: {
            onChange: (e) => {
              console.log(e);
            },
          },
        },
        {
          name: "Input4",
          label: "Input",
          component: "Input",
          required: true,
          initialValue: "Input",
          componentProps: {
            onChange: (e) => {
              console.log(e);
            },
          },
        },
        {
          name: "Input5",
          label: "Input",
          component: "Input",
          required: true,
          initialValue: "Input",
          componentProps: {
            onChange: (e) => {
              console.log(e);
            },
          },
        },
        {
          name: "Input6",
          label: "Input",
          component: "Input",
          required: true,
          initialValue: "Input",
          componentProps: {
            onChange: (e) => {
              console.log(e);
            },
          },
        },
      ],
    },
    crudForm: {
      items: [
        {
          name: "Input",
          label: "Input",
          component: "Input",
          required: true,
          initialValue: "Input",
          componentProps: {
            onChange: (e) => {
              console.log(e);
            },
          },
        },
      ],
    },
  };

  const xphTableRef = useRef();

  return (
    <XphTable<DataType>
      ref={xphTableRef}
      {...props}
      onRowSelectionChange={(selectRowKeys, selectedRows) => {
        console.log(selectRowKeys, selectedRows);
      }}
    />
  );
};

export default ReactApp;
