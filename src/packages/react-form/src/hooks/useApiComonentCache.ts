import { useEffect, useState } from "react";
import { isEqual, isFunction } from "lodash-es";

/** 由于formItem中使用了Form.useWatch，所以每当model改变时都会触发重新渲染，导致例子ApiSelect组件中的api会每次都请求，所以该钩子需要缓存部分属性，用于必要时进行判断处理业务 */
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
  const [renderCount, setRenderCount] = useState<boolean>(0);
  const [componentCache, setComponentCache] = useState<any>(void 0);

  const getApiData = () => {
    if (api && isFunction(api)) {
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

  // 首次缓存
  useEffect(() => {
    const flag = watchSource === void 0;
    if (immediate && flag) getApiData();
    setRenderCount(1);
  }, []);

  // 非首次缓存
  useEffect(() => {
    if (renderCount !== 0) {
      setCache();
    }
  }, [watchSource]);

  // 首次不触发
  useEffect(() => {
    if (renderCount !== 0) {
      getApiData();
    }
  }, [componentCache]);

  return {
    getApiData,
  };
};

export default useApiComonentCache;
