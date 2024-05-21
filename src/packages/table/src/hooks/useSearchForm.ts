import { useRef } from "react";
import { IXphFormActionType } from "../../../form";
import { TTableProps } from "../types";

export default function useSearchForm({ searchForm }: TTableProps) {
  const searchFormRef = useRef<IXphFormActionType>();

  return {
    searchFormRef,
    searchFormProps: searchForm,
  };
}
