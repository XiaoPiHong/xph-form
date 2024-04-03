import React from "react";
import { AutoComplete, AutoCompleteProps } from "antd";
import { Recordable } from "../../types";
import { useApiComonentCache } from "../../hooks";

export interface IApiAutoCompleteProps extends AutoCompleteProps {
  /** 扩展api */
  api?: (...args) => Promise<any>;
  /** 扩展api的参数 */
  params?: any;
  /** 是否立即触发（默认立即触发,否者展开选项时触发） */
  immediate?: boolean;
}

const ApiAutoComplete: React.FC<IApiAutoCompleteProps> = (
  apiAutoCompleteProps: IApiAutoCompleteProps
) => {
  console.log("render ApiAutoComplete");
  const {
    api,
    params,
    immediate = true,
    onDropdownVisibleChange: onDropdownVisibleChangeProp,
  } = apiAutoCompleteProps;
  const [options, setOptions] = React.useState<Recordable<any>[]>([]);
  const { getApiData: getApiOptions } = useApiComonentCache({
    api,
    immediate,
    watchSource: params,
    apiCallback: setOptions,
  });

  const onDropdownVisibleChange = (visible) => {
    if (visible) {
      /** 目前每次展开都会请求 */
      !immediate && getApiOptions();
    }
    onDropdownVisibleChangeProp && onDropdownVisibleChangeProp(visible);
  };

  /** 把扩展的属性排除掉 */
  const getAutoCompleteProps = () => {
    const { api, params, immediate, ...rest } = apiAutoCompleteProps;
    return rest;
  };

  return (
    <AutoComplete
      {...getAutoCompleteProps()}
      options={options}
      onDropdownVisibleChange={onDropdownVisibleChange}
    ></AutoComplete>
  );
};

export default ApiAutoComplete;
