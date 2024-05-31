import { TTableProps } from "../types";
import { useState, useRef, useMemo } from "react";

export interface IPagination {
  pageSize: number;
  current: number;
  total: number;
  pageSizeOptions: number[];
}

export interface IUsePagination {
  show: boolean;
  model: IPagination;
  update: (props: Partial<IPagination>) => void;
}

export default function usePagination(props: TTableProps): {
  pagination: IUsePagination;
  lastPaginationState: React.MutableRefObject<IPagination | false>;
} {
  const { pagination: propsPagination, autoPagination } = props.table!;

  const [paginationState, setPaginationState] = useState<IPagination | false>(
    propsPagination
  );

  /** 上一次update的数据，解决state异步问题 */
  const lastPaginationState = useRef<IPagination | false>(propsPagination);

  const show = useMemo(() => {
    return (
      (paginationState &&
        (autoPagination === true || autoPagination === void 0)) ||
      false
    );
  }, [paginationState]);

  const pagination = {
    model: paginationState,
    update: (props: Partial<IPagination>) => {
      /** 兼容propsPagination为false的情况 */
      if (!propsPagination) return;
      const newModel = { ...lastPaginationState.current, ...props };
      setPaginationState(newModel);
      lastPaginationState.current = newModel;
    },
    show,
  };

  return {
    pagination,
    lastPaginationState,
  };
}
