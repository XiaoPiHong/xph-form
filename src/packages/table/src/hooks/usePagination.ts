import { TTableProps } from "../types";
import { useState, useRef } from "react";
import { isObject } from "lodash-es";
import { TablePaginationConfig } from "antd/lib/table/interface";

export interface IPagination {
  pageSize: number;
  current: number;
  total: number;
  pageSizeOptions: number[];
}

export interface IUsePagination {
  model: IPagination;
  update: (props: Partial<IPagination>) => void;
}

export default function usePagination(props: TTableProps): {
  pagination: IUsePagination;
  lastPaginationState: React.MutableRefObject<IPagination | false>;
  getNewPagination: (disabled: boolean) => TablePaginationConfig | false;
} {
  const { pagination: propsPagination } = props.table!;

  const [paginationState, setPaginationState] = useState<IPagination | false>(
    propsPagination
  );

  /** 上一次update的数据，解决state异步问题 */
  const lastPaginationState = useRef<IPagination | false>(propsPagination);

  const pagination = {
    model: paginationState,
    update: (props: Partial<IPagination>) => {
      /** 兼容propsPagination为false的情况 */
      if (!propsPagination) return;
      const newModel = { ...lastPaginationState.current, ...props };
      setPaginationState(newModel);
      lastPaginationState.current = newModel;
    },
  };

  const getNewPagination = (
    disabled: boolean
  ): TablePaginationConfig | false => {
    if (isObject(pagination.model)) {
      return {
        ...pagination.model,
        disabled,
      };
    }
    return pagination.model;
  };

  return {
    pagination,
    lastPaginationState,
    getNewPagination,
  };
}
