import React from "react";
import { Select, SelectProps } from "antd";
import { useApiComonentCache } from "../../hooks";

export interface IApiSelectProps extends SelectProps {
  /** 扩展api */
  api?: (...args) => Promise<any>;
  /** 扩展api的参数 */
  params?: any;
  /** 是否立即触发（默认立即触发,否者展开选项时触发） */
  immediate?: boolean;
  /** 是否启用了Form.useWatch监听（'true' | 'false'） */
  isusewatch?: string;
}

const ApiSelect: React.FC<IApiSelectProps> = (
  apiSelectProps: IApiSelectProps
) => {
  console.log("render ApiSelect");
  const {
    api,
    params,
    immediate = true,
    isusewatch,
    onDropdownVisibleChange: onDropdownVisibleChangeProp,
  } = apiSelectProps;
  const isUseWatch = isusewatch === "true";
  const [options, setOptions] = React.useState<any[]>([]);
  const { getApiData: getApiOptions } = useApiComonentCache({
    api,
    immediate,
    params,
    apiCallback: setOptions,
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
  const getSelectProps = () => {
    const { api, params, immediate, isusewatch, ...rest } = apiSelectProps;
    return rest;
  };

  return (
    <Select
      {...getSelectProps()}
      options={options}
      onDropdownVisibleChange={onDropdownVisibleChange}
    ></Select>
  );
};

export default ApiSelect;
