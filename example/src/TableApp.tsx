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
      rowSelection: "radio",
      columns: [
        {
          title: "姓名",
          dataIndex: "name",
          key: "name",
        },
      ],
      apiPagination: false,
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
                name: "胡彦祖",
                age: 42,
                address: "西湖区湖底公园1号",
              },
            ]);
          }, 2000);
        });
      },
    },
    searchForm: {
      items: [
        {
          name: "Input",
          label: "Input",
          component: "Input",
          required: true,
          colProps: { span: 6 },
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
          colProps: { span: 6 },
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
      onRowSelectionChange={(selectedRows) => {
        console.log(selectedRows);
      }}
    />
  );
};

export default ReactApp;
