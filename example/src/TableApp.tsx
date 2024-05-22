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
      columns: [],
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

  return <XphTable<DataType> ref={xphTableRef} {...props} />;
};

export default ReactApp;
