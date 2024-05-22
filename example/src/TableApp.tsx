import React from "react";
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
    columns: [],
    crudForm: {
      items: [],
    },
  };
  return <XphTable<DataType> {...props} />;
};

export default ReactApp;
