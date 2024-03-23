import { useEffect, useState } from "react";
import { isEqual, isFunction } from "lodash-es";

/** 由于formItem中使用了Form.useWatch，所以每当model改变时都会触发重新渲染，导致例如ApiSelect组件中的api会每次都请求，所以该钩子需要缓存部分属性，用于必要时进行判断处理业务 */
/**
 *
 * @param api 请求的api
 * @param apiCallback 请求之后的回调
 * @param immediate 首次是否立即执行apiCallback
 * @param watchSource 需要监听的属性
 */
interface IUseComonentCacheProps {
  api?: (...args) => Promise<any>;
  immediate: boolean;
  watchSource: any;
  apiCallback: (...args) => void;
}

const useApiComonentCache = (props: IUseComonentCacheProps) => {
  const { immediate, watchSource, api, apiCallback } = props;
  /** 只会首次渲染时赋值componentCache，后续渲染时不再赋值，除非使用setComponentCache */
  const [componentCache, setComponentCache] = useState<any>(watchSource);

  const getApiData = () => {
    if (api && isFunction(api) && immediate) {
      watchSource
        ? api(watchSource).then(apiCallback)
        : api().then(apiCallback);
    }
  };

  const setCache = () => {
    if (!isEqual(componentCache, watchSource)) {
      setComponentCache(watchSource);
    }
  };

  useEffect(() => {
    setCache();
  }, [watchSource]);

  useEffect(() => {
    getApiData();
  }, [componentCache]);

  return {
    getApiData,
  };
};

export default useApiComonentCache;
