import React from "react";
import { Select, SelectProps } from "antd";
import { Recordable } from "../../types";
import { isFunction } from "lodash-es";

export interface IApiSelectProps extends SelectProps {
  /** 扩展api */
  api?: (...args) => Promise<any>;
  /** 扩展api的参数 */
  params?: any;
}

const ApiSelect: React.FC<IApiSelectProps> = (
  apiSelectProps: IApiSelectProps
) => {
  const { api, params } = apiSelectProps;
  const [options, setOptions] = React.useState<Recordable<any>[]>([]);

  React.useEffect(() => {
    if (api && isFunction(api)) {
      params ? api(params).then(setOptions) : api().then(setOptions);
    }
  }, [api, params]);

  /** 把扩展的属性排除掉 */
  const getSelectProps = () => {
    const { api, params, ...rest } = apiSelectProps;
    return rest;
  };

  return <Select {...getSelectProps()} options={options}></Select>;
};

export default ApiSelect;
