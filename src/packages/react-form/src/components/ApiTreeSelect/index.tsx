import React from "react";
import { TreeSelect, TreeSelectProps } from "antd";
import { Recordable } from "../../types";
import { useApiComonentCache } from "../../hooks";

export interface IApiTreeSelectProps extends TreeSelectProps {
  /** 扩展api */
  api?: (...args) => Promise<any>;
  /** 扩展api的参数 */
  params?: any;
  /** 是否立即触发（默认立即触发,否者展开选项时触发） */
  immediate?: boolean;
  /** 是否启用了Form.useWatch监听（'true' | 'false'） */
  isusewatch?: string;
}

const ApiTreeSelect: React.FC<IApiTreeSelectProps> = (
  apiTreeSelectProps: IApiTreeSelectProps
) => {
  console.log("render ApiTreeSelect");
  const {
    api,
    params,
    immediate = true,
    isusewatch,
    onDropdownVisibleChange: onDropdownVisibleChangeProp,
  } = apiTreeSelectProps;
  const isUseWatch = isusewatch === "true";
  const [treeData, setTreeData] = React.useState<Recordable<any>[]>([]);
  const { getApiData: getApiOptions } = useApiComonentCache({
    api,
    immediate,
    params,
    apiCallback: setTreeData,
    isUseWatch,
  });

  const onDropdownVisibleChange = (visible) => {
    if (visible) {
      /** 目前每次展开都会请求 */
      !immediate && getApiOptions();
    }
    onDropdownVisibleChangeProp && onDropdownVisibleChangeProp(visible);
  };

  /** 把扩展的属性排除掉 */
  const getTreeSelectProps = () => {
    const { api, params, immediate, isusewatch, ...rest } = apiTreeSelectProps;
    return rest;
  };

  return (
    <TreeSelect
      {...getTreeSelectProps()}
      treeData={treeData}
      onDropdownVisibleChange={onDropdownVisibleChange}
    ></TreeSelect>
  );
};

export default ApiTreeSelect;
