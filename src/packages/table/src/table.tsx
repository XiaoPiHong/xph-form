import React, { forwardRef } from "react";
import { Table as ATable } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TTableProps } from "./types";

interface User {
  key: number;
  name: string;
}

const columns: ColumnsType<User> = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
  },
];

const data: User[] = [
  {
    key: 0,
    name: "Jack",
  },
];

const Table = forwardRef(<T extends unknown>(props: TTableProps<T>) => {
  return <div></div>;
});

export default Table;
