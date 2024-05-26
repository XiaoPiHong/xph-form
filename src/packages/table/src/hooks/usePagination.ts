import { TTableProps } from "../types";
import { useState, useRef } from "react";

export interface IPagination {
  pageSize: number;
  current: number;
  total: number;
  pageSizeOptions: number[];
}

export interface IReturnPagination {
  model: IPagination;
  update: (props: Partial<IPagination>) => void;
}

export default function usePagination(props: TTableProps): {
  pagination: IReturnPagination;
  lastPaginationState: React.MutableRefObject<IPagination | boolean>;
} {
  const { pagination: propsPagination } = props.table!;

  const [paginationState, setPaginationState] = useState<IPagination | boolean>(
    propsPagination
  );

  /** 上一次update的数据，解决state异步问题 */
  const lastPaginationState = useRef<IPagination | boolean>(propsPagination);

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

  return {
    pagination,
    lastPaginationState,
  };
}
