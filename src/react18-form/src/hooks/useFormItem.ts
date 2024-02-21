import { IFormPorps, TFormItemProps } from "../types";
import { isBoolean, isFunction } from "lodash-es";

function useFormItemShow(item: TFormItemProps, model: any) {
  const { show, ifShow } = item;
  let isShow = true;
  let isIfShow = true;
  if (isBoolean(show)) {
    isShow = show;
  }
  if (isBoolean(ifShow)) {
    isIfShow = ifShow;
  }
  if (isFunction(show)) {
    isShow = show(model);
  }
  if (isFunction(ifShow)) {
    isIfShow = ifShow(model);
  }
  return { isShow, isIfShow };
}

export default function ({ props, model }: { props: IFormPorps; model: any }) {
  const { items } = props;
  const formItems = items
    .map((item) => {
      const { isIfShow, isShow } = useFormItemShow(item, model);
      return {
        ...item,
        show: isShow,
        ifShow: isIfShow,
      };
    })
    .filter((item) => item.ifShow); /** 过滤出要渲染的项 */
  return {
    formItems,
  };
}
