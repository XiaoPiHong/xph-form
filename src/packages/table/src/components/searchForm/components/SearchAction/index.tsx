import React, { useState, Ref } from "react";
import { Button } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { TTableActionType } from "../../../../types";
import { IXphFormActionType } from "@xph-form/form";

const SearchAction = ({
  searchFormRef,
  tableRef,
}: {
  searchFormRef: Ref<IXphFormActionType>;
  tableRef: Ref<TTableActionType>;
}) => {
  const [loading, setLoading] = useState(false);

  const onClickReload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <Button type="primary" icon={<SearchOutlined />} loading={loading}>
        搜索
      </Button>
      <Button icon={<ReloadOutlined />} onClick={onClickReload}>
        重置
      </Button>
    </div>
  );
};
export default SearchAction;
