import { useEffect, useRef } from "react";
import { isEqual, isFunction } from "lodash-es";

/**
 * 该钩子解决的问题：
 * 1、使用了Form.useWatch的FormItem，至少都会触发两次组件更新，导致api首次请求的情况不一致
 * 2、每次value的更新，都会导致组件的重新渲染，导致api每次都会请求（处理成当params不一致才重新请求）
 */
/**
 *
 * @param api 请求的api
 * @param apiCallback 请求之后的回调
 * @param immediate 首次是否立即执行apiCallback
 * @param params 请求的参数
 * @param isUseWatch 是否使用了Form.useWatch
 */
interface IUseComonentCacheProps {
  api?: (...args) => Promise<any>;
  immediate?: boolean;
  params: any;
  apiCallback: (...args) => void;
  isUseWatch: boolean;
}

const useApiComonentCache = (props: IUseComonentCacheProps) => {
  const { immediate = true, params, api, apiCallback, isUseWatch } = props;
  const firstRender = useRef(true);
  const lastTParams = useRef<any>(params);
  const getApiData = () => {
    if (api && isFunction(api)) {
      params ? api(params).then(apiCallback) : api().then(apiCallback);
      lastTParams.current = params;
    }
  };

  useEffect(() => {
    /** 首次请求 */
    if (firstRender.current) {
      immediate ? getApiData() : null;
      firstRender.current = false;
    }

    /** 非首次请求（只有isUseWatch情况才会有非首次请求） */
    if (!firstRender.current && isUseWatch) {
      /** 这次的parmas和上次的params进行对比，只有不一致才需要重新请求 */
      if (!isEqual(params, lastTParams.current)) {
        immediate ? getApiData() : null;
      }
    }
  }, [params]);

  return {
    getApiData,
  };
};

export default useApiComonentCache;
