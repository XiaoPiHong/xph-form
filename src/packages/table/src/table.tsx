import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

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

const TableApp: React.FC = () => (
  <Table<User> columns={columns} dataSource={data} />
);

export default TableApp;
