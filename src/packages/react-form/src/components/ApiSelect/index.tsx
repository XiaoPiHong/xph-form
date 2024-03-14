import React from "react";
import { Select, SelectProps } from "antd";
import { Recordable } from "../../types";
import { isFunction } from "lodash-es";

export interface IApiSelectProps extends SelectProps {
  /** 扩展api */
  api?: (...args) => Promise<any>;
  /** 扩展api的参数 */
  params?: any;
  /** 是否立即触发（默认立即触发,否者展开选项时触发） */
  immediate?: boolean;
}

const ApiSelect: React.FC<IApiSelectProps> = (
  apiSelectProps: IApiSelectProps
) => {
  const {
    api,
    params,
    immediate = true,
    onDropdownVisibleChange: onDropdownVisibleChangeProp,
  } = apiSelectProps;
  const [options, setOptions] = React.useState<Recordable<any>[]>([]);
  const getApiOptions = () => {
    if (api && isFunction(api)) {
      params ? api(params).then(setOptions) : api().then(setOptions);
    }
  };
  const onDropdownVisibleChange = (visible) => {
    if (visible) {
      !immediate && getApiOptions();
    }
    onDropdownVisibleChangeProp && onDropdownVisibleChangeProp(visible);
  };
  React.useEffect(() => {
    immediate ? getApiOptions() : null;
    () => {
      setOptions([]);
    };
  }, [api, params]);

  /** 把扩展的属性排除掉 */
  const getSelectProps = () => {
    const { api, params, immediate, ...rest } = apiSelectProps;
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
