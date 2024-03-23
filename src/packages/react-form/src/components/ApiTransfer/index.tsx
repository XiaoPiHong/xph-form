import React from "react";
import { Transfer, TransferProps } from "antd";
import { Recordable } from "../../types";
import { useApiComonentCache } from "../../hooks";

export interface IApiTransferProps extends TransferProps {
  /** 扩展api */
  api?: (...args) => Promise<any>;
  /** 扩展api的参数 */
  params?: any;
}

const ApiTransfer: React.FC<IApiTransferProps> = (
  apiSelectProps: IApiTransferProps
) => {
  console.log("render ApiTransfer");
  const { api, params } = apiSelectProps;
  const [dataSource, setDataSource] = React.useState<Recordable<any>[]>([]);
  const { getApiData: getApiDataSource } = useApiComonentCache({
    api,
    watchSource: params,
    apiCallback: setDataSource,
  });

  /** 把扩展的属性排除掉 */
  const getSelectProps = () => {
    const { api, params, ...rest } = apiSelectProps;
    return rest;
  };

  return <Transfer {...getSelectProps()} dataSource={dataSource}></Transfer>;
};

export default ApiTransfer;
