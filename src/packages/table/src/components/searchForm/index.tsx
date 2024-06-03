import React, { forwardRef, Ref, useCallback, useState } from "react";
import { TSearchFormProps, TTableActionType } from "../../types";
import CacheForm from "./components/CacheForm";
import { Button, Spin } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";

const SearchForm = forwardRef(
  (
    props: TSearchFormProps & {
      tableRef: Ref<TTableActionType>;
    },
    ref
  ) => {
    const { renderActions, tableRef } = props;

    const [loading, setLoading] = useState(false);

    /** 这里可以排除一些扩展的属性 */
    const getBindProps = useCallback(() => {
      const { renderActions, ...rest } = props;
      return rest;
    }, []);

    const onClickSearch = () => {
      setLoading(true);
      const { reloadData } = tableRef.current;
      reloadData().finally(() => {
        setLoading(false);
      });
    };

    const onClickReset = () => {
      const { resetAllData } = tableRef.current;
      setLoading(true);
      resetAllData().finally(() => {
        setLoading(false);
      });
    };

    /** 代理一下renderActions */
    const proxyRenderActions = () => {
      return (
        <div style={{ width: "100%", display: "flex" }}>
          <div style={{ flex: 1, width: 0 }}>{renderActions?.()}</div>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={onClickSearch}
            >
              搜索
            </Button>
            <Button icon={<ReloadOutlined />} onClick={onClickReset}>
              重置
            </Button>
          </div>
        </div>
      );
    };

    /** useCallback缓存函数，加载时不刷新整个表单（此时无论该文件的任何数据修改，都不会引发CacheForm内部任何变化） */
    const getBindCacheFormProps = useCallback(() => {
      return {
        xphRef: ref,
        xphFormProps: {
          ...getBindProps(),
          renderActions: proxyRenderActions,
        },
      };
    }, []);

    return (
      <Spin tip="Loading..." spinning={loading}>
        <CacheForm getBindProps={getBindCacheFormProps} />
      </Spin>
    );
  }
);

export default SearchForm;
