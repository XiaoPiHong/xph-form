import React from "react";
import { Transfer, TransferProps } from "antd";
import { Recordable } from "../../types";
import { useApiComonentCache } from "../../hooks";

export interface IApiTransferProps extends TransferProps {
  /** 扩展api */
  api?: (...args) => Promise<any>;
  /** 扩展api的参数 */
  params?: any;
  /** 是否启用了Form.useWatch监听（'true' | 'false'） */
  isusewatch?: string;
}

const ApiTransfer: React.FC<IApiTransferProps> = (
  apiTransferProps: IApiTransferProps
) => {
  console.log("render ApiTransfer");
  const { api, params, isusewatch } = apiTransferProps;
  const isUseWatch = isusewatch === "true";
  const [dataSource, setDataSource] = React.useState<Recordable<any>[]>([]);
  const { getApiData: getApiDataSource } = useApiComonentCache({
    api,
    params,
    apiCallback: setDataSource,
    isUseWatch,
  });

  /** 把扩展的属性排除掉 */
  const getTransferProps = () => {
    const { api, params, isusewatch, ...rest } = apiTransferProps;
    return rest;
  };

  return <Transfer {...getTransferProps()} dataSource={dataSource}></Transfer>;
};

export default ApiTransfer;
