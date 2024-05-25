import { TTableProps } from "../types";
import { useState } from "react";

export interface IPagination {
  pageSize: number;
  current: number;
  total?: number;
  pageSizeOptions?: number[];
}

export interface IReturnPagination {
  model: IPagination;
  update: (props: Partial<IPagination>) => void;
}

export default function usePagination(props: TTableProps): {
  pagination: IReturnPagination;
} {
  const { pagination: propsPagination } = props.table!;

  const [paginationState, setPaginationState] =
    useState<IPagination>(propsPagination);

  const pagination = {
    model: paginationState,
    update: (props: Partial<IPagination>) => {
      const newModel = { ...props, ...paginationState };
      setPaginationState(newModel);
    },
  };

  return {
    pagination,
  };
}
